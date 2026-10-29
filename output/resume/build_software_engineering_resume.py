"""Build the software engineering resume for full-stack and AI engineering roles."""

from pathlib import Path
from html import escape
import json

from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output" / "pdf" / "Elton_Chang_Software_Engineering_Resume.pdf"
SOURCE_OUTPUT = ROOT / "output" / "resume" / "ats-sources" / f"{OUTPUT.name}.txt"

for name, filename in [
    ("ResumeTimes", "times.ttf"),
    ("ResumeTimes-Bold", "timesbd.ttf"),
    ("ResumeTimes-Italic", "timesi.ttf"),
    ("ResumeTimes-BoldItalic", "timesbi.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
pdfmetrics.registerFontFamily(
    "ResumeTimes", normal="ResumeTimes", bold="ResumeTimes-Bold",
    italic="ResumeTimes-Italic", boldItalic="ResumeTimes-BoldItalic",
)

PAGE_W, PAGE_H = 612, 792
LEFT, RIGHT = 36, 576
SIZE, LEADING = 11, 12
Y = 708
blocks = []
links = []
source_text = []
style = ParagraphStyle(
    "Body", fontName="ResumeTimes", fontSize=SIZE, leading=LEADING,
    textColor="black", splitLongWords=False, allowWidows=0, allowOrphans=0,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=style, bulletIndent=-15,
    bulletFontName="ResumeTimes", bulletFontSize=SIZE,
)


def gap(amount):
    global Y
    Y -= amount


def text_line(text, x, font="ResumeTimes", size=SIZE, align="left"):
    blocks.append(("text", x, Y, font, size, text, align))


def row(left, right="", font="ResumeTimes-Bold", leading=13):
    global Y
    source_text.append(f"{left} {right}".rstrip())
    if right:
        left_width = pdfmetrics.stringWidth(left, font, SIZE)
        right_width = pdfmetrics.stringWidth(right, "ResumeTimes", SIZE)
        assert left_width + right_width + 12 <= RIGHT - (LEFT + 4.5), (left, right)
    text_line(left, LEFT + 4.5, font)
    if right:
        text_line(right, RIGHT, align="right")
    Y -= leading


def section(label):
    global Y
    source_text.append(label.upper())
    text_line(label.upper(), LEFT, "ResumeTimes-Bold")
    blocks.append(("rule", LEFT, Y - 3.6, RIGHT, 0.5))
    Y -= 15


def paragraph(text, bullet=False, max_lines=2):
    global Y
    source_text.append(("- " if bullet else "") + text)
    x = LEFT + 25 if bullet else LEFT + 4.5
    p = Paragraph(escape(text), bullet_style if bullet else style, bulletText="- " if bullet else None)
    width, height = p.wrap(RIGHT - x, PAGE_H)
    assert height <= max_lines * LEADING, f"Bullet exceeds {max_lines} lines: {text}"
    # Align the first paragraph baseline with text rows at the current Y.
    bottom = Y - height + SIZE
    blocks.append(("paragraph", x, bottom, p, width, height))
    Y -= height


def title(text, date="", url=None, font="ResumeTimes-Bold"):
    top = Y
    row(text, date, font=font)
    if url:
        width = pdfmetrics.stringWidth(text, font, SIZE)
        links.append((url, (LEFT + 4.5, top - 2, LEFT + 4.5 + width, top + SIZE - 1)))


# The general resume's 16-point centered name, 11-point Times body,
# half-inch margins, thin section rules, bold roles, and italic employers.
blocks.append(("text", PAGE_W / 2, 742, "ResumeTimes-Bold", 16, "Elton Chang", "center"))
source_text.append("Elton Chang")
contact_items = [
    ("(510) 513-2561", None),
    ("trenan2004@gmail.com", "mailto:trenan2004@gmail.com"),
    ("https://eltonchang1.github.io", "https://eltonchang1.github.io"),
    ("https://github.com/EltonChang1", "https://github.com/EltonChang1"),
]
contact = " | ".join(text for text, _ in contact_items)
source_text.append(contact)
blocks.append(("text", PAGE_W / 2, 724, "ResumeTimes", SIZE, contact, "center"))
contact_x = PAGE_W / 2 - pdfmetrics.stringWidth(contact, "ResumeTimes", SIZE) / 2
for index, (text, url) in enumerate(contact_items):
    prefix = " | ".join(item for item, _ in contact_items[:index]) + (" | " if index else "")
    x = contact_x + pdfmetrics.stringWidth(prefix, "ResumeTimes", SIZE)
    if url:
        links.append((url, (x, 721, x + pdfmetrics.stringWidth(text, "ResumeTimes", SIZE), 735)))

section("Education")
row("Carnegie Mellon University", "May 2026", leading=14)
row("Master of Science in Data Analytics for Science, GPA: 3.97/4.0", "Pittsburgh, PA", font="ResumeTimes", leading=14)
row("University of California, Santa Cruz", "Jun 2025", leading=14)
row("Bachelor of Science in Computer Science, GPA: 3.7/4.0", "Santa Cruz, CA", font="ResumeTimes", leading=14)
gap(7)

section("Experience")
row("Co-Founder", "2026 - Present")
title("AMOS", url="https://github.com/EltonChang1/AMOS", font="ResumeTimes-Italic")
paragraph("Co-developed a Rust/Axum control-layer prototype for AI data analysis with parsed SQL validation, role-based tool permissions, independent statistical execution, and evidence-linked claim replay.", bullet=True)
paragraph("Designed versioned REST/OpenAPI APIs with bearer authentication and idempotent SQLite transactions; packaged a non-root Docker image with hardened Compose and configured GitHub Actions test/benchmark gates.", bullet=True)
gap(5)
row("Infrastructure Engineer Intern", "Jul 2023 - Sep 2023")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Reduced configuration drift across 15+ non-production hosts by provisioning test environments with Terraform.", bullet=True, max_lines=1)
paragraph("Cut anomaly detection time by 40% with telemetry, alerting, and dashboards for backup and replication pipelines.", bullet=True, max_lines=1)
gap(5)
row("Software Engineer Intern", "Jul 2022 - Sep 2022")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Built a Java/SQL file management system with scheduled Python jobs for file ingestion, metadata indexing, and lifecycle tracking.", bullet=True)
paragraph("Improved onboarding and adoption by 35% with architecture and workflow documentation for developers and users.", bullet=True, max_lines=1)
gap(7)

section("Projects")
title("Assay | Sandboxed Analytics and Atomic Release Control", url="https://github.com/EltonChang1/assay")
paragraph("Built a Python/DuckDB research prototype for synthetic tasks with SQL AST allowlists, network-disabled Docker workers, resource limits, and content-addressed evidence.", bullet=True)
paragraph("Implemented revision-bound approvals and atomic SQLite source-epoch checks to block stale report releases.", bullet=True, max_lines=1)

gap(5)
title("Squid | C++ Firmware and ROS 2 Sensor Pipeline", "Sep 2026", url="https://github.com/EltonChang1/squid")
paragraph("Implemented C++17 RP2040 firmware for SPI encoder and multiplexed strain acquisition, with binary USB framing, parity checks, angle unwrapping, and host-side protocol tests.", bullet=True)
paragraph("Built Python ROS 2/MCAP recording with causal timestamp gating and jitter diagnostics; added parser resynchronization, emulated serial stalls, and fault-injection tests.", bullet=True)
gap(5)
title("Torflix | Asynchronous BitTorrent Engine and Hash-Verified Streaming", url="https://github.com/EltonChang1/Torflix")
paragraph("Implemented a Python asyncio BitTorrent engine with rarest-first/sequential piece selection, bounded request pipelines, SHA-1 verification, and hash-revalidated resume state.", bullet=True)
paragraph("Mapped torrent offsets across files under async locks; served contiguous verified byte ranges through FastAPI, with WebSocket progress and a React/TypeScript playback client.", bullet=True)
gap(5)
title("Zoe | Full-Stack Mobile Platform with Indexed Search and Federated Identity", url="https://github.com/EltonChang1/Zoe")
paragraph("Built a TypeScript/Hono API and Expo/React Native client with PostgreSQL/Prisma, GIN-indexed full-text search, Argon2id passwords, and hashed opaque sessions.", bullet=True)
paragraph("Implemented S3-compatible presigned uploads with MIME/size checks and AES-256-GCM OAuth token storage.", bullet=True, max_lines=1)
gap(7)

section("Open Source Contributions")
open_source_top = Y
paragraph("Merged contributions include vLLM TPU Inference (KV-cache connector), Apache DataFusion (Rust SQL engine), SQLFluff (SparkSQL parser), Career Ops (JavaScript), and HoloViz Panel (three UI-state fixes).", bullet=True)
paragraph("Opened inference-infrastructure pull requests to Dynamo (VRAM-aware pytest workers), ONNX Runtime (CUDA CMake), and vLLM Production Stack (Kubernetes probe).", bullet=True)
links.append(("https://eltonchang1.github.io/open-source", (LEFT + 25, Y + SIZE - 2, RIGHT, open_source_top + SIZE - 1)))
gap(7)

section("Technical Skills")
for label, text in [
    ("Languages & Web", "Python, TypeScript, JavaScript, Rust, Java, Go, C/C++, SQL, React, Next.js, Node.js, FastAPI"),
    ("AI, Data & Cloud", "LLM APIs, RAG, MCP, PyTorch, PostgreSQL, MongoDB, Docker, Kubernetes, Terraform, GCP"),
]:
    source_text.append(f"{label}: {text}")
    p = Paragraph(f"<b>{escape(label)}:</b> {escape(text)}", style)
    width, height = p.wrap(RIGHT - LEFT - 4.5, PAGE_H)
    assert height == LEADING, f"Technical Skills must use exactly two lines: {label} wrapped"
    blocks.append(("paragraph", LEFT + 4.5, Y - height + SIZE, p, width, height))
    Y -= height

assert Y >= 32, f"Content overflows the one-page layout; final baseline budget: {Y:.2f}"


def main():
    """Render the resume when invoked, keeping imports free of PDF writes."""
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("Elton Chang - Software Engineering Resume")
    pdf.setAuthor("Elton Chang")
    pdf.setSubject("Full-stack software engineering, AI engineering, and cloud infrastructure")
    for block in blocks:
        kind = block[0]
        if kind == "text":
            _, x, y, font, size, text, align = block
            pdf.setFont(font, size)
            if align == "center":
                pdf.drawCentredString(x, y, text)
            elif align == "right":
                pdf.drawRightString(x, y, text)
            else:
                pdf.drawString(x, y, text)
        elif kind == "rule":
            _, x, y, right, linewidth = block
            pdf.setLineWidth(linewidth)
            pdf.line(x, y, right, y)
        elif kind == "paragraph":
            _, x, y, p, width, height = block
            p.drawOn(pdf, x, y)
    for url, rect in links:
        pdf.linkURL(url, rect, relative=0, thickness=0)
    pdf.save()
    SOURCE_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    SOURCE_OUTPUT.write_text("\n".join(source_text) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), "pages": 1, "body_font_pt": SIZE, "remaining_bottom_budget_pt": Y, "links": len(links)}))


if __name__ == "__main__":
    main()
