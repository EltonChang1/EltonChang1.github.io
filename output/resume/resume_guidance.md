# Research behind the robotics resume revision

Reviewed October 12, 2026. Target: robotics research assistant and research engineering roles, with an interest in tactile representations, contact mechanics, and world models.

## Guidance and how it was applied

1. **Tailor the document to the role and prioritize relevant evidence.** MIT recommends emphasizing the experiences and terminology that match the reader's needs, including relevant independent projects. The revised resume places tactile research immediately after education and research interests, followed by AI systems and reproducibility projects. [MIT career toolkit](https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/)

2. **Write action, context, and outcome statements.** CMU's graduate guide favors specific accomplishments, useful measures of scale, and bullets that occupy no more than two lines where possible. The revision gives each bullet a concrete action and a result, capability, or meaningful research finding. [CMU SCS graduate resume guide](https://www.cmu.edu/career/documents/resources-by-college/scs-graduate-resume-guide-2020.pdf)

3. **Make technical research understandable.** MIT advises describing completed work and intended value clearly, including research that is ongoing. The tactile entry names the actual outputs: vibration prediction, reproducible evaluation, synthetic force comparisons, and analytical motion calculations. World models remain the stated research interest. [MIT career toolkit](https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/)

4. **Use verifiable accomplishments.** Stanford's guide emphasizes credible results and a clearly organized account of relevant experience. Development findings retain their scope, synthetic trials remain explicitly labeled, and physical validation remains pending. The excluded UCSC research role was not restored. [Stanford resume guide](https://careered.stanford.edu/sites/g/files/sbiybj22801/files/media/file/resume_and_cover_letter_examples_1.pdf)

5. **Demonstrate the selected skills in the body.** CMU recommends showing individual contributions and linking to technical work. AI engineering is supported by the PyTorch pipeline, AMOS control layer, and ML projects; robotics research is supported by tactile signal processing, friction estimation, and contact-dynamics software. Both skills categories fit on two rendered lines at 12 points. [CMU Silicon Valley guidance](https://www.sv.cmu.edu/current-students/career-services/jobs-and-internships/create-your-resume.html)

6. **Maintain readable, simple formatting.** MIT's checklist recommends consistent dates and headings, readable 10-12 point type, adequate margins, and relevant section ordering. The existing single-column Times New Roman format is retained at 12 points, with half-inch margins and more spacing between entries. Text extraction and a rendered page check verify the layout. [MIT resume checklist](https://capd.mit.edu/resources/resume-checklist/)

7. **Select content rather than listing everything.** The MIT Communication Lab emphasizes a concise account of qualifications and tangible achievements. The skills section is now a short, relevant selection; other demonstrated tools remain in the project and experience bullets. [MIT Communication Lab](https://mitcommlab.mit.edu/aeroastro/commkit/resumes-and-cvs/)

## Application limits

This is a one-page research resume for staff applications. A future PhD application may request a fuller academic CV. Each specific vacancy can warrant a further change in emphasis. Existing Ashe and PNC metrics are retained from the supplied resume; evaluation details still need to be explainable in an interview. No new publication, supervised appointment, hardware experience, or physical validation claim has been introduced.

## Standing ATS requirement — October 13, 2026

The user requested that all resumes be ATS friendly and that all future resume edits follow this requirement. The durable instructions are recorded in the repository's `AGENTS.md` and [ATS_GUIDE.md](ATS_GUIDE.md).

Use a single-column document with selectable text, clear conventional headings, contact information in the main page body, and consistent dates. Avoid layout tables, text boxes, columns, decorative icons, and image-only resumes. Keep actual text bullets and verify their extraction. Follow an employer's required file type; the JPEG resume image is only a website preview.

After changing source content or layout, run `python output/resume/build_all_resumes.py` and `python output/resume/validate_ats_resumes.py`, review the text/audit artifacts in `output/resume/ats-audit/`, and inspect rendered pages for clipping, overlap, and readable spacing. Keep general-resume website PDF copies synchronized. Preserve supported claims and research evidence limits during keyword tailoring.

These are formatting and local readability checks, not a guaranteed score from an employer's ATS or a promise of screening success. Verify the receiving application's autofilled fields before submission. The guide links the primary Greenhouse documentation used for this requirement.
