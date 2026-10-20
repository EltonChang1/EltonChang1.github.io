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

## Software engineering variant — October 14, 2026

Target: full-stack and AI engineering roles. Source: `build_software_engineering_resume.py`; website page `/resume/software-engineering`. The user asked for every supported software engineering skill, including full-stack and AI engineering stacks, a Technical Skills section of no more than two lines, and skills shown through the work rather than only listed.

### Guidance and how it was applied

1. **Use a conventional one-page structure for a recent graduate.** The Tech Interview Handbook recommends standard headings, one page, at least 10-point type, Education first for candidates with under three years of experience, a GitHub profile in the contact details, and project names linked to their code. The variant keeps Education first, adds the GitHub URL to the visible contact line, uses the general resume's 11-point Times layout, and links each project title to its repository. [Tech Interview Handbook](https://www.techinterviewhandbook.org/resume/)

2. **Show the skills inside the work.** The handbook recommends repeating skill keywords in experience entries, and MIT's checklist asks for action verbs, evidence, quantification, and industry keywords. Every bullet names the stack behind a specific system or result, so the two-line skills section summarizes rather than introduces skills. Only Go, C/C++, and PyTorch appear solely in the skills lines; their evidence is listed below. [MIT resume checklist](https://capd.mit.edu/resources/resume-checklist/)

3. **Pair actions with outcomes.** The existing Ashe, Wintec, and open-source numbers are retained unchanged. Project bullets describe concrete capabilities rather than adding unsupported usage or performance metrics.

4. **Select rather than list everything.** Four projects cover full-stack web, mobile, LLM applications, and networked systems. TraceFrame, Next Best Action, and Quantifying Meritocracy remain in the general, data science, and research variants.

### Evidence and claim limits

- **AMOS:** The repository README (main branch) supports the Rust/Axum control layer, parsed SQL subset, role checks, versioned OpenAPI API, idempotent SQLite transactions, and GitHub Actions gates. The non-root Docker image and hardened Docker Compose package are on the `finance` branch. The README states that the local analyst agent is not yet in the Rust implementation, so the bullet describes the control layer only. The date stays "2026 - Present" because no start month is recorded.
- **Ashe System and Wintec:** The Ashe stack comes from the website project description; all metrics are unchanged from the general resume. The 2022 Java and SQL references come from that role's website technology tags.
- **Projects:** Commit history shows Elton authored 101 of 106 MarketPulse commits and all commits in the Enterprise AI Assistant, Zoe, and Torflix repositories. On October 14, 2026, the MarketPulse Vercel client responded; its committed production configuration points to a Google Cloud Run API that returned a 503 that day, so the bullet describes the launch rather than current uptime. The Enterprise AI Assistant uses OpenAI `text-embedding-3-small` vectors with cosine similarity and a lexical fallback. Zoe's Hono, Prisma, PostgreSQL, argon2id, Google/Apple sign-in, S3 presigned upload, and `tsvector` search code is in its `server/` directory. Torflix implements its own asyncio BitTorrent engine and HTTP range responses.
- **Open source:** GitHub showed 10 merged upstream pull requests on October 14, 2026. The vLLM TPU Inference, Dynamo, ONNX Runtime, and vLLM Production Stack pull requests were still open and are described only as opened. SGLang pull requests closed without merging are excluded.
- **Skills without a dedicated bullet:** Go (the Go/Vue.js chat app with a goroutine WebSocket hub), C/C++ (Squid RP2040 firmware), and PyTorch (tactile prediction research). LangChain, LangGraph, and LlamaIndex appear on the general resume, but no project evidence was found, so this variant omits them until a supporting project is provided.
- **Excluded project:** Enterprise AI Suite's deployment workflow never succeeded and its agents do not call an LLM, so its Kubernetes and deployment claims are not used.

## General resume open-source line — October 15, 2026

The general resume listed mypy, SciPy, and Narwhals, whose pull requests had closed without merging, plus Featuretools, Apache Airflow, and VegaFusion, whose pull requests are still open. It omitted merged work in Apache DataFusion, aeon, and Career Ops. On October 15, 2026, GitHub showed 10 merged upstream pull requests: Apache DataFusion (1), SQLFluff (1), Panel (3), statsmodels (1), plotnine (1), Shiny for Python (1), aeon (1), and Career Ops (1). The line now states that count and those projects; open pull requests stay on the website's open-source page. Nothing else on the general resume changed, and its skills line was left as supplied.

The build ran on Linux with Microsoft's core-fonts Times New Roman (`times32.exe`, SHA-256 `db56595ec6ef5d3de5c24994f001f03b2a13e37cee27bc25c58f6f43e8f807ab`) placed temporarily under `C:/Windows/Fonts`. Rebuilding the unchanged general resume first reproduced the committed text and layout exactly. The other rebuilt variants were text- and layout-identical to their committed PDFs, so those files were kept. The new line still wraps to two lines, leaving the page's 106-point bottom budget unchanged, and all 13 PDFs pass the validator.

## Software engineering resume refresh — October 20, 2026

The software engineering resume was checked against the current AMOS repository and public GitHub pull requests. No job description was supplied, so the four selected projects, internship metrics, education, and skills lines stayed in place.

- **Open source:** A GitHub search on October 20, 2026 showed 11 merged upstream pull requests. The addition since October 15 is Apache Airflow #69226, merged October 17, 2026, which corrects the Cloud Functions invoke-operator documentation link. Own-repository and class pull requests are excluded. The vLLM TPU Inference, Dynamo, ONNX Runtime, and vLLM Production Stack pull requests named on the software engineering resume were still open. CycloneDX and Sigstore drafts remain off this resume; the inference-infrastructure line already uses the two-line budget.
- **AMOS:** The main-branch README and `src/workers.rs` support permission-first context, a parsed SQL subset, statistics and chart workers, typed claims, review, invalidation, replay, the versioned OpenAPI API, bearer auth, idempotent mutations, server-rendered review surfaces, and GitHub Actions test and benchmark gates. The same README says the customer-local analyst agent and deterministic graph, report, slide, dashboard, and spreadsheet generation are not yet in the Rust slice, so those outputs are not claimed. The non-root Docker image and hardened Docker Compose package remain on the `finance` branch as a customer-evaluation topology, not a production pilot.
- **General resume:** Only its open-source line changed, from 10 projects to the same 11, still on two lines. Ashe, Wintec, projects, and skills are unchanged.

## Project bullets — October 20, 2026

Each software-engineering project bullet now keeps that project's hardest supported mechanism. Stack lists that were already demonstrated elsewhere were removed.

- **MarketPulse AI:** `technicalService.js` builds each horizon from a 30/25/15/10/10/10 blend of linear-regression slope, MACD, short-term and long-term moving-average crossovers, stochastic, and RSI, multiplies by an ADX strength factor, and scales by `sqrt(daysAhead / 7)`. No forecast-accuracy metric is claimed.
- **Enterprise AI Assistant:** `retrieveContextForOrg` scores an organization's chunks as 0.8 cosine similarity on `text-embedding-3-small` plus 0.2 lexical term overlap, and uses the lexical score alone when no embedding is available.
- **Zoe:** The client binary-searches pairwise comparisons for an insertion rank. `server/src/lib/ranking.ts` then shifts dense 1-indexed ranks in one transaction. The migration defines `UNIQUE (listId, rank) DEFERRABLE INITIALLY DEFERRED`.
- **Torflix:** `src/pytorrent/piece_picker.py` selects the rarest missing piece and, in the endgame, duplicates the last few blocks. The engine speaks the peer wire protocol and HTTP/UDP trackers, and the daemon serves HTTP range requests while pieces arrive.
- **Inference pull requests:** Checked again on October 20, 2026. vLLM TPU Inference #3471, #3474, #3475, and #3604, Dynamo #14311, ONNX Runtime #32448, and vLLM Production Stack #1058 were still open. Commit search found no commits by EltonChang1 in those repositories, so the resume still describes them as opened.
