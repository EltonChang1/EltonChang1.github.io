# ATS-friendly resume editing guide

Recorded October 13, 2026. This is the user's standing preference for all resume variants and future resume edits. Repository `AGENTS.md` records the local workflow; the personal Codex home file `~/.codex/AGENTS.md` also saves the preference for future work in other repositories, following the documented global-instructions mechanism. [OpenAI: Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

## What “ATS friendly” means here

The resume should expose its actual text in a clear reading order so software can identify contact details, education, experience, dates, and skills, while remaining easy for a person to read. Local extraction tests provide evidence of readability. They are not a test inside every employer's applicant tracking system, a universal ATS score, or a guarantee of screening success. Relevance and qualifications still depend on the particular job.

## Formatting rules

- Use one column and clear headings such as Education, Professional Experience, Research Experience, Selected Projects, and Technical Skills. Distinct independent research and research-interest sections are appropriate when they accurately describe the work.
- Place the name, phone, email, and visible website address at the top of the main page body. Keep each employer, full job title, location, and date associated with its entry in the extracted text.
- Avoid tables used for layout, sidebars, floating text boxes, graphics, photos, word art, icons, and essential content in headers or footers. Keep all resume wording as selectable text rather than a scan, screenshot, or outlined lettering. Greenhouse documents these layout and image choices as potential causes of incomplete parsing. [Greenhouse: Unsuccessful resume parse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse)
- Retain readable conventional type. The general and software engineering resumes use 11-point Times body text; the research and other role-specific variants use 12-point Times. All use half-inch side margins. Preserve the current size where practical, and shorten lower-priority content before reducing readability. Respect a variant's page-count and skills-length requirements; an academic CV can use more pages when the application calls for it.
- Use ordinary text bullets, separators, and consistent month/year dates. Avoid decorative spacing between letters. Confirm punctuation, technical names, percentages, and comparison symbols survive text extraction. A right-aligned date on the same entry line is acceptable only when the extracted order still keeps it with that entry.
- Make important contact and portfolio URLs visible when they matter to an application. Hyperlink annotations can supplement the text but must not carry a qualification or required contact detail on their own.

## Tailoring without changing the facts

1. Read the actual job description and identify its main responsibilities, tools, and qualifications.
2. Prioritize supported projects and accomplishments that demonstrate those requirements. Use the posting's terminology naturally when it accurately describes existing work; spell out a relevant acronym on first use when space allows.
3. Show the contribution, technical context, and result in concise bullets. Explain the scope of metrics rather than converting every number into an unsupported claim of impact.
4. Preserve evidence limits: development comparisons remain development comparisons, synthetic trials remain synthetic, and pending physical validation remains pending. A project does not become employment, a lab appointment, or a publication through wording changes.
5. Preserve each variant's existing role selection and claim scope. Consult the relevant source builder and any available local evidence notes for current research claim limits. Add previously excluded roles only with supporting evidence or explicit user correction. Do not transfer an unsupported or variant-specific claim into another resume solely to match a keyword.
6. Never add hidden text, keyword stuffing, invented proficiency, or fabricated credentials. If a required skill has no supporting evidence, leave the gap visible rather than manufacturing experience.

## Build and check every revision

Run from the repository root with Python and the builder/validator dependencies available:

```powershell
python output/resume/build_all_resumes.py
python output/resume/validate_ats_resumes.py
```

Use the saved sources/builders rather than hand-editing a generated PDF. The full build keeps every website download copy synchronized and rebuilds the distinct tailored variants. The website's `/resume` index links to separate purpose pages at `/resume/general`, `/resume/software-engineering`, `/resume/robotics`, `/resume/research`, and `/resume/data-science`.

The Python dependencies are listed in `output/resume/requirements.txt`; the builders use the installed Windows Times New Roman fonts. This workspace's bundled Python was used for verification. On Linux, the builders resolve `C:/Windows/Fonts` relative to the repository root; on October 14, 2026, Microsoft's core-fonts Times New Roman files placed there temporarily (never committed) reproduced the committed PDFs' glyph widths and line breaks exactly. Poppler's `pdftoppm` is used for rendered checks and refreshing the JPEG preview when available.

Canonical builders and outputs:

| Builder | Application PDF | Synchronized copies |
| --- | --- | --- |
| `build_general_resume.py` | `output/pdf/Elton_Chang_Resume.pdf` | Root `Resume.pdf`, root `Elton_Chang_Resume.pdf`, and `react-app/public/Elton_Chang_Resume.pdf` |
| `build_software_engineering_resume.py` | `output/pdf/Elton_Chang_Software_Engineering_Resume.pdf` | `react-app/public/resumes/software-engineering.pdf` |
| `build_robotic_resume.py` | `output/pdf/robotic_resume.pdf` | `react-app/public/resumes/robotics.pdf` |
| `build_cmu_research_associate_resume.py` | `output/pdf/robotic_resume_cmu_research_associate_2025207.pdf` | `output/pdf/research.pdf` and `react-app/public/resumes/research.pdf` |
| `build_stanford_reglab_resume.py` | `output/pdf/Elton_Chang_Stanford_RegLab_Data_Scientist_Resume.pdf` | `react-app/public/resumes/data-science.pdf` |

The catalog in `react-app/src/constants/resume.ts` defines the purpose labels, page slugs, and PDF URLs. The downloads use the same verified PDF bytes as their canonical outputs. The validator includes all website copies and explicitly maps their shorter filenames to the canonical intended-text files in `ats-sources`; changing a public filename requires updating both the catalog and this mapping. After changing resume content, use the full build so the published/download copies stay current.

Review the audit artifacts in `output/resume/ats-audit/`. Check the extracted text in reading order: name and contact details first, complete headings and entries, correctly associated dates, readable degrees and skills, intact metrics, and no missing or garbled words. Compare the meaningful text with the intended source. Investigate warnings and failures; a successful script run does not replace checking the text itself.

Each builder saves its intended content in `output/resume/ats-sources/`. The validator compares both libraries' extracted words and numbers with this content to detect omissions. The source files are generated alongside the PDFs; edit the builders rather than these check files. `report.json` records all results and the expected-source paths.

Render and inspect every changed PDF page. Confirm there is no clipped text, overlapping text, unexpected extra page, orphaned heading, unreadable density, or broken link area. When a shared renderer changes, inspect all variants it produces. Keep the check results with the audit artifacts, and state any unavailable validation honestly.

## Choosing and submitting a file

- Follow the employer's upload instructions first. Submit a verified text-based PDF when PDF is accepted; produce a genuine DOCX when Word is required and validate its own layout and extracted content. There is no single file type that is best for every receiving system.
- Use the appropriate tailored variant and an identifiable filename. `Resume.1.jpeg` is a website preview, not an application resume. Markdown working notes and evidence notes are not submission documents.
- Respect the receiving system's size limit. Greenhouse currently cannot parse resumes larger than 2.5 MB; other systems can have different limits. [Greenhouse: Unsuccessful resume parse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse)
- After upload, check all autofilled contact, education, employer, title, and date fields and correct errors before submitting. Greenhouse itself recommends verifying imported candidate information. [Greenhouse: Manually add a candidate or prospect](https://support.greenhouse.io/hc/en-us/articles/115002195063-Manually-add-a-candidate-or-prospect)

## Evidence and maintenance

Vendor guidance was checked on October 13, 2026. The rules above combine those documented parsing failure modes with this repository's practical extraction and visual-review workflow. Recheck vendor instructions when an application exposes a parsing problem or its accepted file types change. Update this guide if the canonical sources, build commands, output locations, or user's format preferences change.
