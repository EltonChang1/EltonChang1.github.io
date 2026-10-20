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
paragraph("Built the Rust/Axum control layer for an AI data analyst with permission-first context, a parsed SQL subset, and statistics and chart workers outside the LLM; typed claims link to evidence for review, invalidation, and replay.", bullet=True)
paragraph("Designed a /v1 REST API (OpenAPI, bearer auth, idempotent SQLite transactions), server-rendered review tools, and a non-root Docker image with hardened Docker Compose; GitHub Actions gates tests and benchmarks.", bullet=True)
gap(5)
row("Founder / Technical Lead", "Aug 2025 - Present")
title("Ashe System", "Pittsburgh, PA / San Francisco, CA", url="https://ashesystem.com", font="ResumeTimes-Italic")
paragraph("Developed a full-stack aircraft-on-ground (AOG) risk platform: a Python/pandas scoring pipeline, FastAPI REST APIs, and a Next.js/React/TypeScript dashboard that turns operator CSV exports into explainable risk scores.", bullet=True)
paragraph("Improved validated Precision@20 for XGBoost AOG risk ranking from 35% to 62%; tuned hyperparameters and early-warning thresholds with Optuna, increasing median warning lead time from 6.5 to 10.2 days.", bullet=True)
gap(5)
row("Infrastructure Engineer Intern", "Jul 2023 - Sep 2023")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Reduced configuration drift across 15+ non-production hosts by provisioning test environments with Terraform.", bullet=True, max_lines=1)
paragraph("Cut anomaly detection time by 40% with telemetry, alerting, and dashboards for backup and replication pipelines.", bullet=True, max_lines=1)
gap(5)
row("Software Engineer Intern", "Jul 2022 - Sep 2022")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Built a cloud-hosted internal file management system with Java, SQL, and scheduled Python jobs that automate file ingestion, metadata indexing, and data lifecycle tracking.", bullet=True)
paragraph("Improved onboarding and adoption by 35% by documenting its architecture and workflows for developers and users.", bullet=True, max_lines=1)
gap(7)

section("Projects")
title("MarketPulse AI", url="https://github.com/EltonChang1/MarketPulse-AI")
paragraph("Built a multi-horizon stock forecast from a weighted blend of linear-regression slope, MACD, moving-average crossovers, stochastic, and RSI, amplified by ADX and scaled by the square root of the horizon.", bullet=True)
gap(5)
title("Enterprise AI Assistant", url="https://github.com/EltonChang1/Enterprise-AI-Assistant")
paragraph("Ranked organization-scoped document chunks with an 80/20 blend of OpenAI text-embedding-3-small cosine similarity and a lexical term-vector score, falling back to lexical search when embeddings are unavailable.", bullet=True)
gap(5)
title("Zoe", url="https://github.com/EltonChang1/Zoe")
paragraph("Built a pairwise ranking engine that binary-searches an insertion rank, then shifts dense 1-indexed positions in a PostgreSQL transaction under a deferred unique constraint.", bullet=True)
gap(5)
title("Torflix", url="https://github.com/EltonChang1/Torflix")
paragraph("Built an asyncio BitTorrent engine with rarest-first piece selection, endgame block duplication, peer-wire and HTTP/UDP trackers, and HTTP range responses that play video while pieces download.", bullet=True)
gap(7)

section("Open Source Contributions")
open_source_top = Y
paragraph("Merged 11 pull requests into open-source projects, including Apache DataFusion (Rust SQL engine), SQLFluff (SparkSQL parser), Career Ops (JavaScript), HoloViz Panel (three UI-state fixes), and Apache Airflow.", bullet=True)
paragraph("Merged inference-infrastructure pull requests to vLLM TPU Inference (KV-cache connector), Dynamo (VRAM-aware pytest workers), ONNX Runtime (CUDA CMake), and vLLM Production Stack (Kubernetes probe).", bullet=True)
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
