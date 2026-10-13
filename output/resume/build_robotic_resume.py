"""Rebuild the robotics resume in the original PDF's one-page Times layout."""

from pathlib import Path
from html import escape
import json

from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output" / "pdf" / "robotic_resume.pdf"
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
SIZE, LEADING = 12, 12
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


def paragraph(text, bullet=False):
    global Y
    source_text.append(("- " if bullet else "") + text)
    x = LEFT + 25 if bullet else LEFT + 4.5
    p = Paragraph(escape(text), bullet_style if bullet else style, bulletText="- " if bullet else None)
    width, height = p.wrap(RIGHT - x, PAGE_H)
    # Align the first paragraph baseline with text rows at the current Y.
    bottom = Y - height + SIZE
    blocks.append(("paragraph", x, bottom, p, width, height))
    Y -= height


def title(text, date="", url=None):
    top = Y
    row(text, date)
    if url:
        width = pdfmetrics.stringWidth(text, "ResumeTimes-Bold", SIZE)
        links.append((url, (LEFT + 4.5, top - 2, LEFT + 4.5 + width, top + 11)))


# The original PDF uses a 16-point centered name, 12-point Times body,
# half-inch margins, thin section rules, bold roles, and italic employers.
blocks.append(("text", PAGE_W / 2, 742, "ResumeTimes-Bold", 16, "Elton Chang", "center"))
source_text.append("Elton Chang")
contact = "(510) 513-2561 | trenan2004@gmail.com | https://eltonchang1.github.io"
source_text.append(contact)
blocks.append(("text", PAGE_W / 2, 724, "ResumeTimes", SIZE, contact, "center"))
contact_x = PAGE_W / 2 - pdfmetrics.stringWidth(contact, "ResumeTimes", SIZE) / 2
email_prefix = "(510) 513-2561 | "
email = "trenan2004@gmail.com"
email_x = contact_x + pdfmetrics.stringWidth(email_prefix, "ResumeTimes", SIZE)
links.append(("mailto:" + email, (email_x, 721, email_x + pdfmetrics.stringWidth(email, "ResumeTimes", SIZE), 735)))
website = "https://eltonchang1.github.io"
website_x = contact_x + pdfmetrics.stringWidth(email_prefix + email + " | ", "ResumeTimes", SIZE)
links.append((website, (website_x, 721, website_x + pdfmetrics.stringWidth(website, "ResumeTimes", SIZE), 735)))

section("Education")
row("Carnegie Mellon University", "May 2026", leading=14)
row("Master of Science in Data Analytics for Science, GPA: 3.97/4.0", "Pittsburgh, PA", font="ResumeTimes", leading=14)
row("University of California, Santa Cruz", "Jun 2025", leading=14)
row("Bachelor of Science in Computer Science, GPA: 3.7/4.0", "Santa Cruz, CA", font="ResumeTimes", leading=14)
gap(7)

section("Research Interests")
paragraph("Spatial tactile representations, contact dynamics, and action-conditioned world models for physics simulation and robot learning.")
gap(8)

section("Independent Research")
title("Tactile Prediction and Contact Mechanics", "Oct 2026 - Present", "https://github.com/EltonChang1/tactile-contact-research")
paragraph("Built a Python/PyTorch pipeline to predict vibration spectra from brief contacts in the Cluster Haptic Texture Dataset; compared retrieval, regression, and encoders across speeds, directions, and loads.", bullet=True)
paragraph("Found retrieval outperformed the encoder in development tests; verified support-only inference and exactly reproduced 1,878 sensor windows and 22 prediction arrays.", bullet=True)
paragraph("Implemented eight force-prediction methods and controls with surface-level holdouts and paired bootstrap intervals; evaluated 450 synthetic trials across 10 groups.", bullet=True)
mechanics_link_top = Y
paragraph("Built analytical stopping and bounded release-speed calculations plus data ingestion with explicit units and force signs; physical validation remains pending.", bullet=True)
links.append(("https://github.com/EltonChang1/brief-touch-mechanics", (LEFT + 25, Y + SIZE - 2, RIGHT, mechanics_link_top + 11)))
gap(8)

section("Projects")
title("AMOS | Co-Founder", "2026 - Present", "https://github.com/EltonChang1/AMOS")
paragraph("Developed a Rust control layer for an AI analyst that enforces tool permissions, executes SQL/statistics outside the LLM, and links claims to evidence for review and replay.", bullet=True)
gap(5)
title("TraceFrame", url="https://github.com/EltonChang1/traceframe")
paragraph("Developed a Python evidence tracker for pandas, Polars, and DuckDB workflows, adding dataset checks, lineage, and HTML audit reports to make analytical results inspectable.", bullet=True)
gap(5)
title("Next Best Action (Collaboration with PNC)")
paragraph("Compared HistGradientBoosting, LightGBM, XGBoost, and ensembles for next-month product adoption; achieved 0.811 ROC AUC and a 95% top-three hit rate on supported recommendations.", bullet=True)
gap(5)
title("Quantifying Meritocracy (Research)", url="https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity")
paragraph("Extended Talent vs. Luck with a solidarity parameter to compare redistribution strategies using inequality, mobility, and wealth concentration metrics in reproducible simulations.", bullet=True)
gap(8)

section("Experience")
row("Founder / Technical Lead", "Aug 2025 - Present")
row("Ashe System", "Pittsburgh, PA / San Francisco, CA", font="ResumeTimes-Italic")
paragraph("Improved XGBoost aircraft-on-ground risk ranking (Precision@20: 35% to 62%); tuned model parameters and thresholds with Optuna, increasing median warning lead time from 6.5 to 10.2 days.", bullet=True)
gap(5)
row("Infrastructure Engineer Intern", "Jul 2023 - Sep 2023")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Standardized testing environments across 15+ non-production hosts with Terraform; built backup/replication telemetry and alerting, reducing anomaly detection time by 40%.", bullet=True)
gap(5)
row("Software Engineer Intern", "Jul 2022 - Sep 2022")
row("Wintec Industries Inc.", "Newark, CA", font="ResumeTimes-Italic")
paragraph("Automated file ingestion, metadata indexing, and lifecycle tracking in a cloud-hosted file management system using scheduled Python jobs.", bullet=True)
gap(8)

section("Technical Skills")
for label, text in [
    ("AI Engineering", "Python, Rust, SQL, PyTorch, scikit-learn, LLM tool orchestration, model evaluation"),
    ("Robotics Research", "Tactile signal processing, friction estimation, contact dynamics, NumPy/SciPy"),
]:
    source_text.append(f"{label}: {text}")
    p = Paragraph(f"<b>{escape(label)}:</b> {escape(text)}", style)
    width, height = p.wrap(RIGHT - LEFT - 4.5, PAGE_H)
    assert height == LEADING, f"Technical Skills must use exactly two lines: {label} wrapped"
    blocks.append(("paragraph", LEFT + 4.5, Y - height + SIZE, p, width, height))
    Y -= height

assert Y >= 32, f"Content overflows the original one-page layout; final baseline budget: {Y:.2f}"

def main():
    """Render the resume when invoked, keeping imports free of PDF writes."""
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("Elton Chang - Robotics Research Resume")
    pdf.setAuthor("Elton Chang")
    pdf.setSubject("Tactile world models, independent research, and research engineering")
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
