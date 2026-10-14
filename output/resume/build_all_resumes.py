"""Rebuild every active resume and synchronize all website download copies."""

from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
BUILDERS = [
    "build_general_resume.py",
    "build_software_engineering_resume.py",
    "build_robotic_resume.py",
    "build_cmu_research_associate_resume.py",
    "build_stanford_reglab_resume.py",
]
DOWNLOAD_COPIES = {
    "output/pdf/Elton_Chang_Resume.pdf": [
        "Resume.pdf",
        "Elton_Chang_Resume.pdf",
        "react-app/public/Elton_Chang_Resume.pdf",
    ],
    "output/pdf/Elton_Chang_Software_Engineering_Resume.pdf": [
        "react-app/public/resumes/software-engineering.pdf",
    ],
    "output/pdf/robotic_resume.pdf": ["react-app/public/resumes/robotics.pdf"],
    "output/pdf/research.pdf": ["react-app/public/resumes/research.pdf"],
    "output/pdf/Elton_Chang_Stanford_RegLab_Data_Scientist_Resume.pdf": [
        "react-app/public/resumes/data-science.pdf",
    ],
}


def sync_download_copies():
    """Publish each canonical PDF without changing its text or file contents."""
    for source, destinations in DOWNLOAD_COPIES.items():
        for relative in destinations:
            destination = ROOT / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / source, destination)


def main():
    for filename in BUILDERS:
        subprocess.run([sys.executable, str(Path(__file__).parent / filename)], cwd=ROOT, check=True)
    source_dir = ROOT / "output/resume/ats-sources"
    shutil.copyfile(source_dir / "Elton_Chang_Resume.pdf.txt", source_dir / "Resume.pdf.txt")
    # research.pdf is the established filename for the CMU research variant.
    shutil.copyfile(
        ROOT / "output/pdf/robotic_resume_cmu_research_associate_2025207.pdf",
        ROOT / "output/pdf/research.pdf",
    )
    shutil.copyfile(
        source_dir / "robotic_resume_cmu_research_associate_2025207.pdf.txt",
        source_dir / "research.pdf.txt",
    )
    sync_download_copies()
    subprocess.run([sys.executable, str(Path(__file__).parent / "validate_ats_resumes.py")], cwd=ROOT, check=True)
    # The historical JPEG is a visual preview; applications use the text PDFs.
    poppler = shutil.which("pdftoppm")
    if poppler:
        preview_dir = ROOT / "tmp/pdfs/ats-preview"
        preview_dir.mkdir(parents=True, exist_ok=True)
        prefix = preview_dir / "general"
        general = ROOT / "output/pdf/Elton_Chang_Resume.pdf"
        subprocess.run([poppler, "-jpeg", "-singlefile", "-r", "150", str(general), str(prefix)], check=True)
        shutil.copyfile(prefix.with_suffix(".jpg"), ROOT / "Resume.1.jpeg")
    else:
        print("PDFs validated. JPEG preview not refreshed because pdftoppm is unavailable.")


if __name__ == "__main__":
    main()
