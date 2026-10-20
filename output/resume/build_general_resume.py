"""Build the general resume as selectable, sequential, single-column PDF text."""

from html import escape
from pathlib import Path
import json

from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output/pdf/Elton_Chang_Resume.pdf"
PAGE_W, PAGE_H = 612, 792
LEFT, RIGHT = 36, 576
SIZE, LEADING = 11, 12


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    for name, filename in [
        ("GeneralTimes", "times.ttf"),
        ("GeneralTimes-Bold", "timesbd.ttf"),
        ("GeneralTimes-Italic", "timesi.ttf"),
        ("GeneralTimes-BoldItalic", "timesbi.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
    pdfmetrics.registerFontFamily(
        "GeneralTimes", normal="GeneralTimes", bold="GeneralTimes-Bold",
        italic="GeneralTimes-Italic", boldItalic="GeneralTimes-BoldItalic",
    )
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("Elton Chang - Resume")
    pdf.setAuthor("Elton Chang")
    pdf.setSubject("Software engineering, data analytics, and machine learning")
    style = ParagraphStyle(
        "Body", fontName="GeneralTimes", fontSize=SIZE, leading=LEADING,
        textColor="black", splitLongWords=False,
        bulletFontName="GeneralTimes", bulletFontSize=SIZE,
        bulletIndent=-15, allowWidows=0, allowOrphans=0,
    )
    y = 708
    source_text = ["Elton Chang", "(510) 513-2561 | trenan2004@gmail.com | https://eltonchang1.github.io"]

    def gap(amount=5):
        nonlocal y
        y -= amount

    def row(left, right="", font="GeneralTimes-Bold", leading=13, url=None):
        nonlocal y
        source_text.append(left + (" " + right if right else ""))
        left_width = pdfmetrics.stringWidth(left, font, SIZE)
        right_width = pdfmetrics.stringWidth(right, "GeneralTimes", SIZE)
        if left_width + right_width + (12 if right else 0) > RIGHT - LEFT - 4.5:
            raise ValueError(f"Resume row is too wide: {left} | {right}")
        pdf.setFont(font, SIZE)
        pdf.drawString(LEFT + 4.5, y, left)
        if right:
            pdf.setFont("GeneralTimes", SIZE)
            pdf.drawRightString(RIGHT, y, right)
        if url:
            pdf.linkURL(url, (LEFT + 4.5, y - 2, LEFT + 4.5 + left_width, y + SIZE), thickness=0)
        y -= leading

    def section(label):
        nonlocal y
        source_text.append(label.upper())
        pdf.setFont("GeneralTimes-Bold", SIZE)
        pdf.drawString(LEFT, y, label.upper())
        pdf.setLineWidth(0.5)
        pdf.line(LEFT, y - 3.6, RIGHT, y - 3.6)
        y -= 15

    def paragraph(text, bullet=True):
        nonlocal y
        source_text.append(text)
        x = LEFT + 25 if bullet else LEFT + 4.5
        p = Paragraph(escape(text), style, bulletText="- " if bullet else None)
        _, height = p.wrap(RIGHT - x, PAGE_H)
        p.drawOn(pdf, x, y - height + SIZE)
        y -= height

    pdf.setFont("GeneralTimes-Bold", 16)
    pdf.drawCentredString(PAGE_W / 2, 742, "Elton Chang")
    contact = "(510) 513-2561 | trenan2004@gmail.com | https://eltonchang1.github.io"
    pdf.setFont("GeneralTimes", SIZE)
    pdf.drawCentredString(PAGE_W / 2, 724, contact)
    contact_x = PAGE_W / 2 - pdfmetrics.stringWidth(contact, "GeneralTimes", SIZE) / 2
    for prefix, value, url in [
        ("(510) 513-2561 | ", "trenan2004@gmail.com", "mailto:trenan2004@gmail.com"),
        ("(510) 513-2561 | trenan2004@gmail.com | ", "https://eltonchang1.github.io", "https://eltonchang1.github.io"),
    ]:
        x = contact_x + pdfmetrics.stringWidth(prefix, "GeneralTimes", SIZE)
        pdf.linkURL(url, (x, 721, x + pdfmetrics.stringWidth(value, "GeneralTimes", SIZE), 735), thickness=0)

    section("Education")
    row("Carnegie Mellon University", "May 2026", leading=14)
    row("Master of Science in Data Analytics for Science, GPA: 3.97/4.0", "Pittsburgh, PA", font="GeneralTimes", leading=14)
    row("University of California, Santa Cruz", "Jun 2025", leading=14)
    row("Bachelor of Science in Computer Science, GPA: 3.7/4.0", "Santa Cruz, CA", font="GeneralTimes", leading=14)
    gap(7)

    section("Experience")
    row("Founder / Technical Lead", "Aug 2025 - Present")
    row("Ashe System", "Pittsburgh, PA / San Francisco, CA", font="GeneralTimes-Italic")
    paragraph("Improved validated Precision@20 from 35% to 62% using XGBoost for temporal aircraft-on-ground (AOG) risk ranking across maintenance, inventory, and supplier features.")
    paragraph("Increased median warning lead time from 6.5 to 10.2 days using Optuna to optimize model hyperparameters and early-warning decision thresholds.")
    gap()
    row("Infrastructure Engineer Intern", "Jul 2023 - Sep 2023")
    row("Wintec Industries Inc.", "Newark, CA", font="GeneralTimes-Italic")
    paragraph("Reduced configuration drift across more than 15 non-production hosts by using Terraform to provision standardized testing environments with reusable infrastructure modules.")
    paragraph("Cut anomaly detection time by 40% by engineering telemetry, alerting, and reliability dashboards across enterprise backup and replication pipelines.")
    gap()
    row("Software Engineer Intern", "Jul 2022 - Sep 2022")
    row("Wintec Industries Inc.", "Newark, CA", font="GeneralTimes-Italic")
    paragraph("Built a cloud-hosted internal file management system that automated file ingestion with scheduled Python jobs, indexed metadata, and tracked company data lifecycle states.")
    paragraph("Improved onboarding and platform adoption by 35% by creating developer and user-facing documentation for architecture, workflows, and system usage.")
    gap(7)

    section("Projects")
    row("Next Best Action (Collaboration with PNC)")
    paragraph("Ranked high-impact advisor opportunities with a PNC Next Best Action pipeline using HistGradientBoosting, LightGBM, and a LightGBM-XGBoost ensemble to predict next-month product adoption.")
    paragraph("Achieved 0.811 ROC AUC and a 95% top-three hit rate on supported recommendations.")
    gap()
    row("Torflix", url="https://github.com/EltonChang1/torflix")
    paragraph("Built a BitTorrent-backed movie library with a FastAPI service for swarm I/O, storage, and progressive streaming, plus web clients for catalog, magnet enqueue, and playback while transfers complete.")
    gap()
    row("TraceFrame", url="https://github.com/EltonChang1/traceframe")
    paragraph("Developed a local-first evidence tracker for data science workflows that records datasets, transformations, SQL outputs, metrics, charts, claims, checks, source-row samples, and lineage in a project-local .traceframe/ directory.")
    gap()
    row("Quantifying Meritocracy (Research)", url="https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity")
    paragraph("Extended the University of Catania's Talent vs. Luck model with a solidarity parameter, using statistical modeling and agent-based simulations to quantify systemic drivers of inequality.")
    gap(7)

    section("Open Source Contributions")
    paragraph("Merged 11 pull requests into Apache DataFusion, SQLFluff, Apache Airflow, Shiny for Python, Panel, statsmodels, plotnine, aeon, and Career Ops.", bullet=False)
    gap(7)
    section("Technical Skills")
    paragraph("Python, TypeScript, C, Go, SQL, R, React, LangChain, LangGraph, LlamaIndex, Docker, Kubernetes", bullet=False)
    if y < 36:
        raise ValueError(f"Content exceeds the one-page layout: final baseline budget {y:.2f}")
    pdf.save()
    source_dir = ROOT / "output/resume/ats-sources"
    source_dir.mkdir(parents=True, exist_ok=True)
    (source_dir / (OUTPUT.name + ".txt")).write_text("\n".join(source_text) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), "pages": 1, "body_font_pt": SIZE, "remaining_bottom_budget_pt": y}))


if __name__ == "__main__":
    build()
