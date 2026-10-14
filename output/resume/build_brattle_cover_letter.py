"""Build the Brattle Data and AI Engineer cover letter as selectable PDF text.

The letter is a one-page application document. It is not copied to the website
and is excluded from the résumé validator's required section headings.
"""

from html import escape
import json
from pathlib import Path
import re
import unicodedata

from pypdf import PdfReader
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output/pdf/Elton_Chang_Brattle_Data_AI_Engineer_Cover_Letter.pdf"
SOURCE_OUTPUT = ROOT / "output/resume/ats-sources" / f"{OUTPUT.name}.txt"
PAGE_W, PAGE_H = 612, 792
LEFT, RIGHT = 54, 558
BOTTOM = 50
SIZE, LEADING = 11, 14

PARAGRAPHS = [
    "I am applying for the Data and AI Engineer role in your Boston office. I completed an M.S. in Data Analytics for Science at Carnegie Mellon University in May 2026, with a 3.97 GPA, and a B.S. in Computer Science at the University of California, Santa Cruz. I am looking for an early-career role that stays close to imperfect data, asks for results a colleague can check, and builds technical judgment through real project work.",
    "At Ashe System, I am founder and technical lead. I built a Python pipeline that scores aircraft-on-ground risk from operators' maintenance, inventory, and supplier exports. Those files were created for day-to-day operations, so the work started with inspection, cleaning, and a clear statement of what a score could support. Each recommendation keeps the evidence behind it, and the product is decision support for human review. Using XGBoost for temporal risk ranking, I improved validated Precision@20 from 35% to 62%. Tuning parameters and decision thresholds with Optuna increased median warning lead time from 6.5 to 10.2 days.",
    "I have been applying the same standard to AI-assisted analysis. I co-founded AMOS and co-developed a Rust prototype that enforces data-access permissions and runs SQL and statistical calculations outside the language model. Schema and metric checks, evidence-linked claims, human review, and replay keep a result traceable after it is produced. I also built TraceFrame, local-first Python tooling for pandas, Polars, and DuckDB workflows. It records datasets, transformations, SQL outputs, quality checks, claims, and source-row lineage, and it exports an audit report. I use it so notebook and script results can be reviewed while the underlying data stays on the machine where the analysis ran.",
    "In a Carnegie Mellon collaboration with PNC, I compared histogram gradient boosting, LightGBM, XGBoost, and an ensemble for ranking next-month product adoption. The pipeline reached 0.811 ROC AUC, and a supported recommendation appeared in the top three 95% of the time. We used those metrics because an advisor needs a short list that a person can review. As a software engineer intern at Wintec Industries, I built scheduled Python jobs for file ingestion, metadata indexing, and lifecycle tracking, and I wrote architecture and workflow documentation that improved onboarding and platform adoption by 35%.",
    "Python and SQL are the tools I use for this work, along with Git, notebooks, and tests. I use AI-assisted development to learn and to move faster, and I verify generated output before I treat it as correct. I would like to bring that approach to the Data and AI Engineering team in Boston: preparing difficult source material, helping prototype methods that can become shared tools, and explaining assumptions, limitations, and tradeoffs to consultants and economists.",
    "Thank you for considering my application. I would welcome a conversation.",
]


def font_files():
    windows = Path("C:/Windows/Fonts")
    liberation = Path("/usr/share/fonts/truetype/liberation")
    if (windows / "times.ttf").is_file():
        return {
            "LetterSerif": windows / "times.ttf",
            "LetterSerif-Bold": windows / "timesbd.ttf",
            "LetterSerif-Italic": windows / "timesi.ttf",
            "LetterSerif-BoldItalic": windows / "timesbi.ttf",
        }
    if (liberation / "LiberationSerif-Regular.ttf").is_file():
        return {
            "LetterSerif": liberation / "LiberationSerif-Regular.ttf",
            "LetterSerif-Bold": liberation / "LiberationSerif-Bold.ttf",
            "LetterSerif-Italic": liberation / "LiberationSerif-Italic.ttf",
            "LetterSerif-BoldItalic": liberation / "LiberationSerif-BoldItalic.ttf",
        }
    raise FileNotFoundError("Times New Roman or Liberation Serif is required to build the cover letter.")


def tokens(text: str) -> list[str]:
    return re.findall(r"[\w]+", unicodedata.normalize("NFKC", text).casefold())


def build():
    for name, path in font_files().items():
        pdfmetrics.registerFont(TTFont(name, str(path)))
    pdfmetrics.registerFontFamily(
        "LetterSerif",
        normal="LetterSerif",
        bold="LetterSerif-Bold",
        italic="LetterSerif-Italic",
        boldItalic="LetterSerif-BoldItalic",
    )
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("Elton Chang - Cover Letter - The Brattle Group Data and AI Engineer")
    pdf.setAuthor("Elton Chang")
    pdf.setSubject("Application for Data and AI Engineer, Boston")

    style = ParagraphStyle(
        "Letter",
        fontName="LetterSerif",
        fontSize=SIZE,
        leading=LEADING,
        textColor="black",
        splitLongWords=False,
        allowWidows=0,
        allowOrphans=0,
    )
    source_text = ["Elton Chang"]
    y = 728

    def line(text, font="LetterSerif", size=SIZE, leading=16, align="left", url=None):
        nonlocal y
        source_text.append(text)
        pdf.setFont(font, size)
        if align == "center":
            pdf.drawCentredString(PAGE_W / 2, y, text)
            if url:
                width = pdfmetrics.stringWidth(text, font, size)
                x = PAGE_W / 2 - width / 2
                pdf.linkURL(url, (x, y - 2, x + width, y + size), thickness=0)
        else:
            pdf.drawString(LEFT, y, text)
            if url:
                width = pdfmetrics.stringWidth(text, font, size)
                pdf.linkURL(url, (LEFT, y - 2, LEFT + width, y + size), thickness=0)
        y -= leading

    def paragraph(text, following_gap=12):
        nonlocal y
        source_text.append(text)
        block = Paragraph(escape(text), style)
        _, height = block.wrap(RIGHT - LEFT, PAGE_H)
        if abs(height / LEADING - round(height / LEADING)) > 0.05:
            raise ValueError(f"Unexpected paragraph height {height}")
        lines = int(round(height / LEADING))
        bottom = y - height + SIZE
        if bottom < BOTTOM:
            raise ValueError(f"Cover letter exceeds one page at baseline {bottom:.2f}")
        block.drawOn(pdf, LEFT, bottom)
        last_baseline = y - (lines - 1) * LEADING
        # One line gap plus following_gap keeps paragraphs visibly separate.
        y = last_baseline - LEADING - following_gap

    pdf.setFont("LetterSerif-Bold", 16)
    pdf.drawCentredString(PAGE_W / 2, y, "Elton Chang")
    y -= 20
    contact = "(510) 513-2561 | trenan2004@gmail.com | https://eltonchang1.github.io"
    source_text.append(contact)
    pdf.setFont("LetterSerif", SIZE)
    pdf.drawCentredString(PAGE_W / 2, y, contact)
    contact_width = pdfmetrics.stringWidth(contact, "LetterSerif", SIZE)
    contact_x = PAGE_W / 2 - contact_width / 2
    email = "trenan2004@gmail.com"
    website = "https://eltonchang1.github.io"
    email_x = contact_x + pdfmetrics.stringWidth("(510) 513-2561 | ", "LetterSerif", SIZE)
    website_x = contact_x + pdfmetrics.stringWidth(f"(510) 513-2561 | {email} | ", "LetterSerif", SIZE)
    pdf.linkURL("mailto:" + email, (email_x, y - 2, email_x + pdfmetrics.stringWidth(email, "LetterSerif", SIZE), y + SIZE), thickness=0)
    pdf.linkURL(website, (website_x, y - 2, website_x + pdfmetrics.stringWidth(website, "LetterSerif", SIZE), y + SIZE), thickness=0)
    y -= 28

    line("October 14, 2026", leading=22)
    for address_line in (
        "Hiring Team",
        "Data and AI Engineering",
        "The Brattle Group",
        "Boston, Massachusetts",
    ):
        line(address_line, leading=14)
    y -= 8
    line("Dear Hiring Team,", leading=LEADING + 12)
    for text in PARAGRAPHS:
        paragraph(text)
    line("Sincerely,", leading=30)
    line("Elton Chang", font="LetterSerif-Bold", leading=16)
    signature_baseline = y + 16
    if signature_baseline < BOTTOM:
        raise ValueError(f"Cover letter exceeds one page at baseline {signature_baseline:.2f}")

    pdf.save()
    SOURCE_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    SOURCE_OUTPUT.write_text("\n".join(source_text) + "\n", encoding="utf-8")
    extracted = "\n".join(page.extract_text() or "" for page in PdfReader(OUTPUT).pages)
    intended, actual = tokens("\n".join(source_text)), tokens(extracted)
    if intended != actual:
        missing = [word for word in intended if word not in actual]
        unexpected = [word for word in actual if word not in intended]
        raise ValueError(f"Extracted cover letter text differs. Missing: {missing[:12]} Unexpected: {unexpected[:12]}")
    if PdfReader(OUTPUT).is_encrypted or len(PdfReader(OUTPUT).pages) != 1:
        raise ValueError("Cover letter must be a single unencrypted page.")
    print(json.dumps({
        "output": str(OUTPUT),
        "pages": 1,
        "body_font_pt": SIZE,
        "remaining_bottom_budget_pt": round(y, 2),
        "source": str(SOURCE_OUTPUT),
    }))


if __name__ == "__main__":
    build()
