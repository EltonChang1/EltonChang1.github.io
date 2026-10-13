# Repository instructions

## Resume work: persistent user preference

On October 13, 2026, the user requested that all resumes be ATS friendly and that future resume edits follow the same requirement. Apply this section to resume content, builders, exported resumes, and website resume downloads; it does not impose resume formatting on unrelated website content.

- Before a resume edit, read `output/resume/ATS_GUIDE.md`, `output/resume/resume_guidance.md`, and any available role-specific evidence notes.
- Keep a single-column document with clear conventional section headings and selectable text. Put the name and contact information in the page body. Avoid layout tables, text boxes, sidebars, images, icons, and essential information that appears only in a hyperlink, header, or footer.
- Use ordinary text bullets/separators that survive extraction, consistent dates, complete job titles, and a readable font and size. Preserve the current readable Times layout and variant-specific page/skills constraints where feasible. Do not hide keywords or squeeze content until it is illegible.
- Tailor wording and section order to a supplied job description using only supported experience. Never invent a qualification, role, metric, publication, institutional affiliation, completed physical validation, or job-description keyword. Keep synthetic/development evaluation qualifiers and preserve each variant's existing claim scope. Add previously excluded roles only with supporting evidence or explicit user correction.
- Edit the canonical source/builders, then run `python output/resume/build_all_resumes.py` and `python output/resume/validate_ats_resumes.py` using an environment with the required dependencies. The build must synchronize the website's general-resume PDF copies. Do not leave stale duplicate downloads.
- Inspect the extracted text and audit results in `output/resume/ats-audit/`, including name/contact, headings, degrees, employer/title/date associations, skills, numbers, punctuation, reading order, and completeness. Render and visually inspect changed PDFs for clipping, overlap, wrapping, and margins. Fix failures before delivery; disclose any check that could not run.
- `Resume.1.jpeg` is a website preview, never the ATS application file. Follow an application's accepted file type and size limits. Use a verified text PDF when accepted; create and validate DOCX when requested instead of merely renaming a file.
- Describe the checks as local readability and extraction checks. Do not promise an ATS score, universal parsing, screening success, interviews, or hiring. When submitting through an application form, verify its autofilled fields.
