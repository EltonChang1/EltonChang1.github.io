# Technical project selection for SWE and AI inference

Reviewed October 20, 2026 for the user's request to feature their strongest
technical projects in the Software Engineering and AI Inference resumes and
exclude Enterprise AI experience. Enterprise AI Assistant and Enterprise AI
Suite are omitted from both project selections. No project source was edited,
no remote code was fetched, and no underlying project tests or studies were rerun.

## Selection

- Software Engineering: Assay, Torflix, and Zoe. Three entries allow mechanisms
  and implementation decisions to receive two bullets each. Assay supplies
  execution isolation and transactional correctness; Torflix supplies protocol,
  concurrency, storage, and streaming; Zoe supplies full-stack identity, search,
  and object-storage implementation. These replace the shallower MarketPulse
  description and the excluded Enterprise AI Assistant entry.
- AI Inference: Tactile Data Toolkit, Tactile Prediction, Assay, and Torflix.
  Worker/process boundaries, chunked storage, checkpoint execution, controlled
  replay, sandboxed tool execution, and verified streaming supply concrete
  systems evidence. Assay replaces Enterprise AI Assistant. The PyTorch work
  remains CPU/development work, not a GPU serving deployment.
- AMOS remains under professional experience. The project selection avoids
  repeating the same startup work as a separate accomplishment.
- Education, professional experience, skills, and the corrected open-source
  classifications retain their current variant-specific content. Both PDFs
  retain one page, 11-point Times, and two skills lines.

## Assay

Inspected the current local repository at
`C:/Users/trena/OneDrive/Documents/GitHub/assay`, HEAD
`994f904cb91dd549c74b66831f7c3de1accc464f`. Its working tree contains ongoing
documentation/research changes. The three core implementation files used below
have no local diff from that HEAD.

- `src/assay/execution/docker.py`: no external network, read-only root/data
  mounts, non-root identity, dropped capabilities, CPU/memory/PID caps, bounded
  output capture, timeout/cancellation cleanup.
- `src/assay/gateway/policy.py` and `sandbox/worker.py`: SQL AST policy and
  constrained DuckDB query execution, with worker-side policy revalidation.
- `src/assay/evidence/store.py`: transactional SQLite state and content-addressed
  artifacts/dependencies.
- `src/assay/publication/service.py`: approvals bind exact report revisions;
  publication checks source registry/epochs and writes release state within
  the evidence transaction; changed sources make current reports stale.
- `tests/test_publication.py`: delayed/cancelled approvals, source changes,
  historical/current release handling and stale-publication cases.

Keep research-prototype and synthetic-task scope. The current README,
`docs/IMPLEMENTATION_STATUS.md` and `SECURITY.md` supersede older resume notes:
development model comparisons now exist, but do not establish comparative
safety. Semantic false passes and incomplete recovery/admission/final-test
isolation remain documented. The resume claims concrete mechanisms, not a
validated general defense, comparative efficacy, production deployment, or a
completed inference service. No test count or study outcome is added.

## Torflix

Cached commit `3ddb42308c4215e5571af4031a589b10190fa461`, under
`C:/Users/trena/.cache/resume-repo-review/EltonChang1/Torflix`.

- `src/pytorrent/piece_picker.py`: rarest-first/sequential selection, bounded
  in-flight block requests, endgame duplication.
- `src/pytorrent/protocol/peer.py`: bounded request pumping and piece validation.
- `src/pytorrent/session.py`: resume hash revalidation, atomic resume-file
  replacement, contiguous verified-prefix calculation.
- `src/pytorrent/storage.py`: locked seek/read/write, cross-file torrent offsets,
  SHA-1 piece verification.
- `src/pytorrentd/app.py`: FastAPI byte-range responses constrained to verified
  contiguous bytes, HTTP 206/416 handling and WebSocket progress. The existing
  React/TypeScript playback client is retained in the SWE description.

No nonblocking disk-I/O, zero-copy, measured throughput, production scale, or
ownership of vendored provider code is claimed.

## Zoe

Cached commit `2fb5b20f7a5e77f2410df721480e1666e30a5c4d`.

- `server/prisma/migrations/20260421000000_init/migration.sql`: weighted
  PostgreSQL tsvector columns and GIN/trigram indexes.
- `server/src/routes/search.ts`: parameterized queries, `ts_rank_cd`, visibility
  and block filtering.
- `server/src/auth/password.ts` and `session.ts`: Argon2id and hashed opaque
  session tokens.
- `server/src/storage/s3.ts`: S3-compatible direct presigned uploads, MIME/size
  checks and paginated cleanup.
- `server/src/lib/tokenCrypto.ts` and `routes/connected-accounts.ts`: actual
  AES-256-GCM encryption for OAuth-token persistence.

The Expo/React Native client, TypeScript/Hono API and PostgreSQL/Prisma stack
remain supported. The encryption code has a development-key fallback; no
production security assurance, deployed AWS service or performance claim is added.

## Tactile Data Toolkit

Cached commit `8f15b0c59236ead4a9a6cd3b9522dd910874faf2`.

- `src/tactile_toolkit/pipeline.py`: calibration overlaps one pending export
  future; a separate format-writer thread pool supplies bounded concurrency.
- `export/zarr_writer.py`: Zstd compression, whole-chunk staging, copied remainder
  buffers and episode boundaries avoid repeated partial-chunk encoding.
- `dataset/torch_dataset.py`: lazy Zarr opening, cleared root/array state during
  pickling, strided temporal windows and persistent PyTorch worker defaults.
- `tests/test_dataloader_workers.py`: multiprocess DataLoader/window cases.

No achieved throughput, peak-memory target, GPU acceleration, distributed
training, or deployed model-serving system is claimed.

## Tactile Prediction

Cached commit `49ea671ad759a18599dfdaf9255abf9631937881`.

- `src/tactile_contact/models.py`: masked support pooling and query-condition
  features with input/shape checks. Architecture derives from the supplied
  starter implementation guide; no architectural-novelty claim is added.
- `training.py` and `episodes.py`: CPU PyTorch, train-only preprocessing,
  balanced sampling, gradient clipping, early stopping and saved checkpoints.
- `repetition_review.py` and `scripts/verify_matched_results.py`: query-target
  access denied during replay; targets unlock for scoring after prediction.
- Saved `docs/matched_validation_provenance.json`: 22 frozen prediction arrays
  replayed bit-for-bit. This is a recorded development result, not a new run.

Development evaluation and pending physical validation remain explicit. No
untouched-holdout generalization, predictive gain over the stronger baselines,
GPU training, or production inference performance is implied.


## Software engineering revision - October 28, 2026

At the user's request, Ashe System is removed from Experience and Squid joins
Assay, Torflix, and Zoe in Projects. AMOS and both Wintec internships remain.
The user selected **Assay | Sandboxed Analytics and Atomic Release Control**
from subtitle options without the word SQL. Atomic release control refers to
transactional revision/source-epoch publication checks; it does not establish
analytical correctness or comparative safety. Assay keeps its research-prototype
and synthetic-task qualifiers, and AMOS retains co-development/prototype scope.
The SWE resume remains one page with 11-point Times and two skills lines.

Squid evidence was inspected read-only at commit
`48e1a4ca01fa7569adc86ba74298ff9cb012f243`:

- [Firmware source](https://github.com/EltonChang1/squid/tree/48e1a4ca01fa7569adc86ba74298ff9cb012f243/firmware):
  `CMakeLists.txt` selects C++17; `src/main.cpp`, `as5048a.cpp`,
  `strain_frontend.cpp`, and `test/test_protocol.cpp` support RP2040 SPI
  encoder/multiplexed strain acquisition, binary USB framing, parity checks,
  angle unwrapping, and host-side protocol tests.
- [ROS 2 source](https://github.com/EltonChang1/squid/tree/48e1a4ca01fa7569adc86ba74298ff9cb012f243/ros2_ws/src/tactile_umi):
  `tactile_umi/protocol.py`, `alignment.py`, `mcap_recorder_node.py`, and the
  emulation/tests support incremental parser resynchronization, causal timestamp
  gating, jitter diagnostics, MCAP recording, emulated serial stalls, and fault
  injection. See also `docs/verification.md` for verification procedures.

Squid keeps Sep 2026. These are software implementation claims, without claims
of hardware deployment, measured acquisition rate, or calibrated physical
performance. No underlying project tests or hardware validation were rerun for
this resume edit.
