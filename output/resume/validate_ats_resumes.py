"""Check resume PDFs for common text parsing and layout problems.

Run from any directory:
    python output/resume/validate_ats_resumes.py
    python output/resume/validate_ats_resumes.py path/to/resume.pdf

This is a local preflight check, not an ATS score or a guarantee of how a
particular employer's parser will behave. Rendered pages still need visual review.
"""

from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
import logging
from pathlib import Path
import re
import unicodedata

import pdfplumber
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_REPORT_DIR = ROOT / "output" / "resume" / "ats-audit"
SOURCE_DIR = ROOT / "output" / "resume" / "ats-sources"
# Website aliases have concise URLs; map each to its canonical intended text.
WEBSITE_SOURCE_ALIASES = {
    "react-app/public/resumes/robotics.pdf": "robotic_resume.pdf.txt",
    "react-app/public/resumes/research.pdf": "research.pdf.txt",
    "react-app/public/resumes/data-science.pdf": "Elton_Chang_Stanford_RegLab_Data_Scientist_Resume.pdf.txt",
}
DEFAULT_CONTACTS = {
    "name": "Elton Chang",
    "email": "trenan2004@gmail.com",
    "phone": "5105132561",
    "website": "eltonchang1.github.io",
}
HEADINGS = {
    "EDUCATION", "SUMMARY", "PROFESSIONAL SUMMARY", "RESEARCH INTERESTS",
    "EXPERIENCE", "PROFESSIONAL EXPERIENCE", "ENGINEERING EXPERIENCE",
    "RESEARCH EXPERIENCE", "INDEPENDENT RESEARCH", "PROJECTS",
    "SELECTED PROJECTS", "SELECTED RESEARCH AND DATA SCIENCE PROJECTS",
    "OPEN SOURCE", "OPEN SOURCE CONTRIBUTION", "OPEN SOURCE CONTRIBUTIONS",
    "SKILLS", "TECHNICAL SKILLS", "PUBLICATIONS", "AWARDS", "CERTIFICATIONS",
}


def default_paths() -> list[Path]:
    """Include every PDF resume currently kept in this repository."""
    return [
        ROOT / "Resume.pdf",
        ROOT / "Elton_Chang_Resume.pdf",
        *sorted((ROOT / "output" / "pdf").glob("*.pdf")),
        ROOT / "react-app" / "public" / "Elton_Chang_Resume.pdf",
        *(ROOT / relative for relative in WEBSITE_SOURCE_ALIASES),
    ]


def issue(code: str, message: str, **details) -> dict:
    return {"code": code, "message": message, **details}


def sections(text: str) -> list[str]:
    # Dates can legitimately be separate lines in pypdf. Only compare actual
    # section labels rather than inferring reading-order errors from those dates.
    return [
        line.strip().upper() for line in text.splitlines()
        if line.strip().upper() in HEADINGS
    ]


def tokens(text: str) -> list[str]:
    # Ignore decorative bullets, whitespace, punctuation, and line wrapping.
    # All content words and numbers remain, including skill names and metrics.
    return re.findall(r"[\w]+", unicodedata.normalize("NFKC", text).casefold())


def completeness_source(path: Path) -> Path | None:
    """Repository builders save intended text beside the audit, by PDF name.

    Root/public copies deliberately reuse the same source. Do not associate a
    PDF from another directory tree merely because its basename happens to match.
    """
    resolved = path.resolve()
    if not resolved.is_relative_to(ROOT):
        return None
    relative = resolved.relative_to(ROOT).as_posix()
    if relative in WEBSITE_SOURCE_ALIASES:
        return SOURCE_DIR / WEBSITE_SOURCE_ALIASES[relative]
    return SOURCE_DIR / f"{path.name}.txt"


def source_text_comparison(source: str, extracted: str) -> dict:
    intended_words, extracted_words = Counter(tokens(source)), Counter(tokens(extracted))
    return {
        "matches": intended_words == extracted_words,
        "intended_tokens": sum(intended_words.values()),
        "extracted_tokens": sum(extracted_words.values()),
        "missing_words_or_numbers": dict(intended_words - extracted_words),
        "unexpected_words_or_numbers": dict(extracted_words - intended_words),
    }


def corrupt_glyphs(text: str) -> dict:
    bad = Counter(
        char for char in text
        if char == "\ufffd" or unicodedata.category(char) in {"Co", "Cs"}
        or (unicodedata.category(char) == "Cc" and char not in "\n\r\t\f")
    )
    return {
        "characters": {f"U+{ord(char):04X}": count for char, count in bad.items()},
        "unmapped_cids": re.findall(r"\(cid:\d+\)", text),
    }


def contact_checks(text: str, expected: dict) -> dict:
    compact_digits = re.sub(r"\D", "", text)
    return {
        "name": expected["name"].casefold() in text.casefold(),
        "email": expected["email"].casefold() in text.casefold(),
        "phone": re.sub(r"\D", "", expected["phone"]) in compact_digits,
        "website": expected["website"].casefold() in text.casefold(),
    }


def overlap_candidates(chars: list[dict]) -> list[dict]:
    """Find substantial glyph overlap while tolerating kerning and mixed sizes.

    A glyph's font box is larger than its visible ink. Minor box intersections
    therefore are normal. Ignore spaces/bullets and require substantial intrusion
    in both directions before recording a candidate for visual inspection.
    """
    visible = sorted(
        (char for char in chars if any(c.isalnum() for c in char["text"])),
        key=lambda char: (char["top"], char["x0"]),
    )
    pairs = []
    for index, first in enumerate(visible):
        for second in visible[index + 1:]:
            if second["top"] >= first["bottom"]:
                break
            x_overlap = min(first["x1"], second["x1"]) - max(first["x0"], second["x0"])
            y_overlap = min(first["bottom"], second["bottom"]) - max(first["top"], second["top"])
            min_width = min(first["x1"] - first["x0"], second["x1"] - second["x0"])
            min_height = min(first["bottom"] - first["top"], second["bottom"] - second["top"])
            if x_overlap > max(0.75, 0.35 * min_width) and y_overlap > max(1.5, 0.30 * min_height):
                pairs.append({
                    "text": [first["text"], second["text"]],
                    "first_bbox": [round(first[key], 2) for key in ("x0", "top", "x1", "bottom")],
                    "second_bbox": [round(second[key], 2) for key in ("x0", "top", "x1", "bottom")],
                })
                if len(pairs) >= 20:
                    return pairs
    return pairs


def embedded_fonts(page) -> dict[str, bool]:
    fonts = {}
    resources = page.get("/Resources")
    if resources is None:
        return fonts
    resources = resources.get_object()
    for _, font_ref in resources.get("/Font", {}).items():
        font = font_ref.get_object()
        name = str(font.get("/BaseFont", "Unknown"))
        children = font.get("/DescendantFonts", [])
        descriptors = [font] + [child.get_object() for child in children]
        embedded = False
        for candidate in descriptors:
            descriptor = candidate.get("/FontDescriptor")
            if descriptor is not None:
                descriptor = descriptor.get_object()
                embedded = embedded or any(key in descriptor for key in ("/FontFile", "/FontFile2", "/FontFile3"))
        fonts[name] = embedded
    return fonts


def read_pdf(path: Path) -> tuple[PdfReader, list[str]]:
    """Record repair warnings so a recoverable PDF defect is still visible."""
    messages = []

    class CaptureWarnings(logging.Handler):
        def emit(self, record):
            if record.levelno >= logging.WARNING:
                messages.append(record.getMessage())

    logger = logging.getLogger("pypdf")
    handler = CaptureWarnings()
    logger.addHandler(handler)
    try:
        reader = PdfReader(path)
    finally:
        logger.removeHandler(handler)
    return reader, messages


def audit_pdf(path: Path, report_dir: Path, minimum_font: float, expected: dict) -> dict:
    result = {"path": str(path.resolve()), "completeness_source": None, "checks": {}, "errors": [], "warnings": []}
    if not path.is_file():
        result["errors"].append(issue("missing_file", "The PDF does not exist."))
        result["passed"] = False
        return result
    result["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
    try:
        reader, repair_messages = read_pdf(path)
        if repair_messages:
            result["warnings"].append(issue("pdf_repair", "The parser repaired PDF structure; regenerate from the editable source.", details=repair_messages))
        result["checks"]["not_encrypted"] = not reader.is_encrypted
        if reader.is_encrypted:
            result["errors"].append(issue("encrypted", "The PDF is encrypted; text access may be restricted."))
            result["passed"] = False
            return result
        result["pages"] = len(reader.pages)
        pypdf_pages = [page.extract_text() or "" for page in reader.pages]
        plumber_pages, page_stats = [], []
        used_font_names = set()
        with pdfplumber.open(path) as document:
            for number, page in enumerate(document.pages, 1):
                plumber_pages.append(page.extract_text() or "")
                chars = [char for char in page.chars if char["text"].strip()]
                used_font_names.update(str(char["fontname"]).lstrip("/") for char in chars)
                outside = [
                    char for char in chars
                    if char["x0"] < -0.5 or char["top"] < -0.5
                    or char["x1"] > page.width + 0.5
                    or char["bottom"] > page.height + 0.5
                ]
                too_small = [char for char in chars if float(char["size"]) < minimum_font - 0.05]
                overlaps = overlap_candidates(chars)
                page_stats.append({
                    "page": number, "width_pt": page.width, "height_pt": page.height,
                    "text_characters": len(chars), "images": len(page.images),
                    "font_sizes_pt": sorted({round(float(char["size"]), 2) for char in chars}),
                    "text_bounds_pt": [
                        round(min(char["x0"] for char in chars), 2),
                        round(min(char["top"] for char in chars), 2),
                        round(max(char["x1"] for char in chars), 2),
                        round(max(char["bottom"] for char in chars), 2),
                    ] if chars else None,
                    "characters_outside_page": len(outside),
                    "characters_below_minimum_font": len(too_small),
                    "overlap_candidates": overlaps,
                })
                if not chars:
                    result["errors"].append(issue("empty_page", "A page has no selectable text.", page=number))
                if page.images:
                    result["errors"].append(issue("images_present", "Resume contains image objects; use text for all resume content.", page=number, count=len(page.images)))
                if outside:
                    result["errors"].append(issue("page_bounds", "Text extends outside the PDF page.", page=number, count=len(outside)))
                if too_small:
                    result["errors"].append(issue("small_font", f"Text is smaller than {minimum_font:g} points.", page=number, count=len(too_small)))
                if overlaps:
                    result["errors"].append(issue("text_overlap", "Substantial text overlap requires visual inspection.", page=number, candidates=len(overlaps)))

        result["page_layout"] = page_stats
        fonts = {}
        for page in reader.pages:
            fonts.update(embedded_fonts(page))
        # ReportLab includes a default Helvetica resource even when every visible
        # glyph uses embedded Times. Unused resources do not affect parsing.
        fonts = {name: value for name, value in fonts.items() if name.lstrip("/") in used_font_names}
        result["fonts_embedded"] = fonts
        missing_fonts = [name for name, embedded in fonts.items() if not embedded]
        if missing_fonts:
            result["warnings"].append(issue("unembedded_fonts", "Some fonts are not embedded; review text portability.", fonts=missing_fonts))

        pypdf_text = "\n\f\n".join(pypdf_pages)
        plumber_text = "\n\f\n".join(plumber_pages)
        source_path = completeness_source(path)
        source_text = None
        if source_path is not None and source_path.is_file():
            source_text = source_path.read_text(encoding="utf-8")
            result["completeness_source"] = str(source_path.resolve())
        else:
            result["warnings"].append(issue(
                "source_unavailable", "No intended-text source is available; completeness cannot be checked.",
                expected_source=str(source_path.resolve()) if source_path is not None else None,
            ))
        result["checks"]["source_text_matches"] = {}
        slug = path.resolve().relative_to(ROOT).as_posix() if path.resolve().is_relative_to(ROOT) else str(path.resolve())
        slug = re.sub(r"[^A-Za-z0-9_.-]+", "__", slug)
        extraction_paths = {}
        for library, text in (("pypdf", pypdf_text), ("pdfplumber", plumber_text)):
            output = report_dir / f"{slug}.{library}.txt"
            output.write_text(text, encoding="utf-8")
            extraction_paths[library] = str(output.resolve())
            contacts = contact_checks(text, expected)
            heading_order = sections(text)
            bad_glyphs = corrupt_glyphs(text)
            readable = len(text.strip()) >= 300 and len(tokens(text)) >= 60
            result["checks"][library] = {
                "text_characters": len(text), "readable_text": readable,
                "contacts": contacts, "section_order": heading_order,
                "corrupt_glyphs": bad_glyphs,
            }
            comparison = source_text_comparison(source_text, text) if source_text is not None else None
            result["checks"]["source_text_matches"][library] = comparison["matches"] if comparison is not None else None
            if comparison is not None:
                result["checks"][library]["source_completeness"] = comparison
                if not comparison["matches"]:
                    result["errors"].append(issue(
                        "source_text_matches", "Extracted text differs from the builder's intended words or numbers.",
                        library=library, **comparison,
                    ))
            if not readable:
                result["errors"].append(issue("unreadable_text", "Not enough readable text was extracted.", library=library))
            missing_contacts = [label for label, found in contacts.items() if not found]
            if missing_contacts:
                result["errors"].append(issue("missing_contact", "Expected contact details are missing from extracted text.", library=library, missing=missing_contacts))
            if bad_glyphs["characters"] or bad_glyphs["unmapped_cids"]:
                result["errors"].append(issue("corrupt_glyphs", "Unmapped or corrupt characters appear in extracted text.", library=library, **bad_glyphs))
            for category, found in {
                "education": "EDUCATION" in heading_order,
                "experience": any("EXPERIENCE" in heading or heading == "INDEPENDENT RESEARCH" for heading in heading_order),
                "skills": any("SKILLS" in heading for heading in heading_order),
            }.items():
                if not found:
                    result["errors"].append(issue("missing_heading", f"No recognizable {category} section heading was extracted.", library=library))

        result["extracted_text"] = extraction_paths
        same_sections = sections(pypdf_text) == sections(plumber_text)
        same_words = Counter(tokens(pypdf_text)) == Counter(tokens(plumber_text))
        result["checks"]["section_order_matches_between_libraries"] = same_sections
        result["checks"]["content_words_match_between_libraries"] = same_words
        if not same_sections:
            result["errors"].append(issue("section_order", "The extraction libraries returned different section orders."))
        if not same_words:
            result["errors"].append(issue("content_mismatch", "The extraction libraries returned different words or numbers; inspect saved text."))
        # Titles/date rows can differ in line wrapping without an actual
        # reading-order problem; heading order is the stable preflight.
        result["checks"]["no_images"] = all(page["images"] == 0 for page in page_stats)
        result["checks"]["text_within_page"] = all(page["characters_outside_page"] == 0 for page in page_stats)
        result["checks"]["minimum_font_pt"] = minimum_font
        result["checks"]["minimum_font_met"] = all(page["characters_below_minimum_font"] == 0 for page in page_stats)
        result["checks"]["no_substantial_text_overlap"] = all(not page["overlap_candidates"] for page in page_stats)
    except Exception as exc:
        result["errors"].append(issue("pdf_read_error", "The PDF could not be fully inspected.", detail=f"{type(exc).__name__}: {exc}"))
    result["passed"] = not result["errors"]
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="*", type=Path, help="PDF paths; defaults to all active repository resumes.")
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    parser.add_argument("--minimum-font-size", type=float, default=10.0)
    parser.add_argument("--expected-name", default=DEFAULT_CONTACTS["name"])
    parser.add_argument("--expected-email", default=DEFAULT_CONTACTS["email"])
    parser.add_argument("--expected-phone", default=DEFAULT_CONTACTS["phone"])
    parser.add_argument("--expected-website", default=DEFAULT_CONTACTS["website"])
    args = parser.parse_args()
    if args.minimum_font_size <= 0:
        parser.error("--minimum-font-size must be positive")
    paths = args.paths or default_paths()
    report_dir = args.report_dir.resolve()
    report_dir.mkdir(parents=True, exist_ok=True)
    contacts = {label: getattr(args, f"expected_{label}") for label in DEFAULT_CONTACTS}
    results = [audit_pdf(path, report_dir, args.minimum_font_size, contacts) for path in paths]
    report = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "purpose": "ATS parsing and layout preflight; not an ATS score or acceptance guarantee.",
        "visual_review_required": True,
        "expected_contacts": contacts,
        "minimum_font_size_pt": args.minimum_font_size,
        "passed": all(result["passed"] for result in results),
        "files_checked": len(results),
        "completeness_sources": {result["path"]: result["completeness_source"] for result in results},
        "results": results,
    }
    report_path = report_dir / "report.json"
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    for result in results:
        status = "PASS" if result["passed"] else "FAIL"
        print(f"{status} {result['path']} ({len(result['errors'])} errors; {len(result['warnings'])} warnings)")
        for problem in result["errors"] + result["warnings"]:
            print(f"  {problem['code']}: {problem['message']}")
    print(f"Report: {report_path}")
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
