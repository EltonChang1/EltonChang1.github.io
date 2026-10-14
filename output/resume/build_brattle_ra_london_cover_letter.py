"""Build the Brattle London Research Analyst cover letter as selectable PDF text.

The letter is a one-page application document. It is not copied to the website
and is excluded from the résumé validator's required section headings.
Claims stay within the résumé builders: quantitative training, the Talent vs.
Luck simulation, Ashe, the PNC collaboration, and the Wintec documentation work.
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
OUTPUT = ROOT / "output/pdf/Elton_Chang_Brattle_Research_Analyst_Competition_London_Cover_Letter.pdf"
SOURCE_OUTPUT = ROOT / "output/resume/ats-sources" / f"{OUTPUT.name}.txt"
PAGE_W, PAGE_H = 612, 792
LEFT, RIGHT = 54, 558
BOTTOM = 50
SIZE, LEADING = 11, 14

PARAGRAPHS = [
    "I am applying for the 2027 Research Analyst position in Competition in your London office. I completed an M.S. in Data Analytics for Science at Carnegie Mellon University in May 2026, with a 3.97 GPA, and a B.S. in Computer Science at the University of California, Santa Cruz. I want to join a project team where quantitative work is tied to a real question: imperfect data, a model that has to be checked, and a result a colleague can explain.",
    "In Quantifying Meritocracy, I extended the University of Catania's Talent vs. Luck model with a solidarity parameter. I used agent-based simulation to compare redistribution strategies on inequality, upward mobility, and wealth concentration, and I ran sensitivity analyses across policy timing and model parameters. I documented the results as comparisons produced by the model. The habit I would bring to project work is the same one: name the mechanism, choose a metric that matches the question, and keep the comparison inside what the model can support.",
    "I have also built and checked models on operational records. At Ashe System, where I am founder and technical lead, I ranked aircraft-on-ground risk from operators' maintenance, inventory, and supplier exports. Using XGBoost, validated Precision@20 improved from 35% to 62%. Tuning parameters and decision thresholds with Optuna increased median warning lead time from 6.5 to 10.2 days. Each recommendation keeps the evidence behind it, and the product is decision support for human review. In a Carnegie Mellon collaboration with PNC, I compared histogram gradient boosting, LightGBM, XGBoost, and an ensemble for next-month product adoption. The pipeline reached 0.811 ROC AUC, and a supported recommendation appeared in the top three 95% of the time. We reported both numbers because a ranking is useful when the short list a person reviews contains the relevant action.",
    "The PNC analysis was a team project, and as a software engineer intern at Wintec Industries I wrote architecture and workflow documentation that improved onboarding and platform adoption by 35%. I revise an analysis so a teammate can rerun it, and I write down where the data stop. I do this work in Python, with SQL when the records are relational.",
    "I would like to learn Competition research with Brattle's London team: how a market question becomes a measurement, how a model is checked before it is relied on, and how the finding is written so a colleague can use it.",
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
    pdf.setTitle("Elton Chang - Cover Letter - The Brattle Group Research Analyst, Competition, London")
    pdf.setAuthor("Elton Chang")
    pdf.setSubject("Application for 2027 Research Analyst, Competition, London")

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

    def paragraph(text, following_gap=16):
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
        "Competition",
        "The Brattle Group",
        "London, United Kingdom",
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
    reader = PdfReader(OUTPUT)
    extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
    intended, actual = tokens("\n".join(source_text)), tokens(extracted)
    if intended != actual:
        missing = [word for word in intended if word not in actual]
        unexpected = [word for word in actual if word not in intended]
        raise ValueError(f"Extracted cover letter text differs. Missing: {missing[:12]} Unexpected: {unexpected[:12]}")
    if reader.is_encrypted or len(reader.pages) != 1:
        raise ValueError("Cover letter must be a single unencrypted page.")
    print(json.dumps({
        "output": str(OUTPUT),
        "pages": 1,
        "body_font_pt": SIZE,
        "signature_baseline_pt": round(signature_baseline, 2),
        "source": str(SOURCE_OUTPUT),
    }))


if __name__ == "__main__":
    build()
