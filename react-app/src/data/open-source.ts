export type ContributionStatus = "merged" | "open";

export type OpenSourceContribution = {
  project: string;
  repository: string;
  pullRequest: number;
  title: string;
  summary: string;
  status: ContributionStatus;
  date: string;
  url: string;
  repositoryUrl: string;
  additions: number;
  deletions: number;
  files: number;
  tags: string[];
};

export const MERGED_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    project: "Panel",
    repository: "holoviz/panel",
    pullRequest: 8736,
    title: "Clean up GridSpec children when deleting cells",
    summary:
      "Fixed GridSpec deletion cleanup by emitting a copied object mapping so removed pane models are released correctly, with regression coverage for deletion and replacement paths.",
    status: "merged",
    date: "Aug 26, 2026",
    url: "https://github.com/holoviz/panel/pull/8736",
    repositoryUrl: "https://github.com/holoviz/panel",
    additions: 18,
    deletions: 3,
    files: 2,
    tags: ["Python", "State management", "Regression testing"],
  },
  {
    project: "Career Ops",
    repository: "santifer/career-ops",
    pullRequest: 3264,
    title: "Handle quoted angle brackets while stripping HTML tags",
    summary:
      "Hardened the shared HTML-to-text pipeline so quoted angle brackets remain inside tag attributes instead of leaking markup into job-description text.",
    status: "merged",
    date: "Aug 25, 2026",
    url: "https://github.com/santifer/career-ops/pull/3264",
    repositoryUrl: "https://github.com/santifer/career-ops",
    additions: 51,
    deletions: 3,
    files: 2,
    tags: ["TypeScript", "Text parsing", "Regression testing"],
  },
  {
    project: "Py-Shiny",
    repository: "posit-dev/py-shiny",
    pullRequest: 2278,
    title: "Fail documentation builds on missing API examples",
    summary:
      "Made documentation generation fail when API examples are missing, corrected example references, and expanded validation across the public API documentation pipeline.",
    status: "merged",
    date: "Jul 6, 2026",
    url: "https://github.com/posit-dev/py-shiny/pull/2278",
    repositoryUrl: "https://github.com/posit-dev/py-shiny",
    additions: 343,
    deletions: 31,
    files: 16,
    tags: ["Python", "Documentation tooling", "CI"],
  },
  {
    project: "Panel",
    repository: "holoviz/panel",
    pullRequest: 8660,
    title: "Fix repeated location synchronization mappings",
    summary:
      "Corrected repeated Location.sync mappings so query updates select only mappings that contain the changed parameter, with a focused regression test.",
    status: "merged",
    date: "Jul 6, 2026",
    url: "https://github.com/holoviz/panel/pull/8660",
    repositoryUrl: "https://github.com/holoviz/panel",
    additions: 18,
    deletions: 1,
    files: 2,
    tags: ["Python", "URL state", "Regression testing"],
  },
  {
    project: "SQLFluff",
    repository: "sqlfluff/sqlfluff",
    pullRequest: 8052,
    title: "Parse SparkSQL SET literal lists",
    summary:
      "Extended the SparkSQL grammar to parse parenthesized literal lists as SET property values and added dialect fixtures for the new syntax.",
    status: "merged",
    date: "Jul 5, 2026",
    url: "https://github.com/sqlfluff/sqlfluff/pull/8052",
    repositoryUrl: "https://github.com/sqlfluff/sqlfluff",
    additions: 18,
    deletions: 1,
    files: 3,
    tags: ["Python", "SQL parsing", "SparkSQL"],
  },
  {
    project: "Plotnine",
    repository: "has2k1/plotnine",
    pullRequest: 1092,
    title: "Fix facet-grid categorical missing IDs",
    summary:
      "Fixed categorical panel-ID assignment for missing facet values when drop=True and added regression coverage for facet_grid and the underlying interaction logic.",
    status: "merged",
    date: "Jul 3, 2026",
    url: "https://github.com/has2k1/plotnine/pull/1092",
    repositoryUrl: "https://github.com/has2k1/plotnine",
    additions: 71,
    deletions: 17,
    files: 3,
    tags: ["Python", "Data visualization", "Categorical data"],
  },
  {
    project: "Statsmodels",
    repository: "statsmodels/statsmodels",
    pullRequest: 9881,
    title: "Document GLS other_results",
    summary:
      "Expanded the generalized least-squares documentation for other_results, clarifying the result surface and keeping examples covered by the documentation test suite.",
    status: "merged",
    date: "Jul 2, 2026",
    url: "https://github.com/statsmodels/statsmodels/pull/9881",
    repositoryUrl: "https://github.com/statsmodels/statsmodels",
    additions: 18,
    deletions: 6,
    files: 1,
    tags: ["Python", "Statistics", "Documentation"],
  },
];

export const OPEN_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    project: "Py-Shiny",
    repository: "posit-dev/py-shiny",
    pullRequest: 2468,
    title: "Make checkbox selection assertions order-independent",
    summary:
      "Treats selected checkbox-group values as an unordered set while preserving exact-count, uniqueness, string, and regular-expression expectations.",
    status: "open",
    date: "Opened Aug 24, 2026",
    url: "https://github.com/posit-dev/py-shiny/pull/2468",
    repositoryUrl: "https://github.com/posit-dev/py-shiny",
    additions: 11,
    deletions: 11,
    files: 2,
    tags: ["Python", "Testing", "UI assertions"],
  },
  {
    project: "Apache Airflow",
    repository: "apache/airflow",
    pullRequest: 69226,
    title: "Fix the Cloud Function invoke-operator documentation link",
    summary:
      "Adds a dedicated invoke-operator section and points the operator reference to the correct Google Cloud Functions documentation target.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/apache/airflow/pull/69226",
    repositoryUrl: "https://github.com/apache/airflow",
    additions: 27,
    deletions: 1,
    files: 2,
    tags: ["Python", "Google Cloud", "Documentation"],
  },
  {
    project: "Stingray",
    repository: "StingraySoftware/stingray",
    pullRequest: 980,
    title: "Fix the vectorized boolean signature",
    summary:
      "Updates a Numba signature that resolves bool incorrectly on newer versions, restoring vectorized boolean behavior and adding focused compatibility coverage.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/StingraySoftware/stingray/pull/980",
    repositoryUrl: "https://github.com/StingraySoftware/stingray",
    additions: 11,
    deletions: 4,
    files: 4,
    tags: ["Python", "Numba", "Compatibility"],
  },
  {
    project: "Panel",
    repository: "holoviz/panel",
    pullRequest: 8659,
    title: "Fix FileDownload color styling",
    summary:
      "Maps FileDownload colors to the underlying Bokeh button type and normalizes variant-based CSS updates to match other button widgets.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/holoviz/panel/pull/8659",
    repositoryUrl: "https://github.com/holoviz/panel",
    additions: 20,
    deletions: 4,
    files: 3,
    tags: ["Python", "Bokeh", "Component styling"],
  },
  {
    project: "VegaFusion",
    repository: "vega/vegafusion",
    pullRequest: 590,
    title: "Allow window transforms without fields",
    summary:
      "Aligns VegaFusion with Vega by making fields optional for window transforms, including row_number specifications that previously failed deserialization.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/vega/vegafusion/pull/590",
    repositoryUrl: "https://github.com/vega/vegafusion",
    additions: 76,
    deletions: 1,
    files: 3,
    tags: ["Rust", "Vega", "Serialization"],
  },
  {
    project: "nbsite",
    repository: "holoviz-dev/nbsite",
    pullRequest: 360,
    title: "Use gallery title mappings for item pages",
    summary:
      "Shares gallery-title resolution across generated Markdown and RST item pages, with regression coverage for explicit title mappings.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/holoviz-dev/nbsite/pull/360",
    repositoryUrl: "https://github.com/holoviz-dev/nbsite",
    additions: 67,
    deletions: 2,
    files: 2,
    tags: ["Python", "Documentation tooling", "Gallery generation"],
  },
  {
    project: "Featuretools",
    repository: "alteryx/featuretools",
    pullRequest: 2774,
    title: "Clarify query_by_values instance-value handling",
    summary:
      "Restricts query_by_values inputs to supported iterable forms and raises clear errors for scalar, string, and DataFrame values.",
    status: "open",
    date: "Opened Jul 1, 2026",
    url: "https://github.com/alteryx/featuretools/pull/2774",
    repositoryUrl: "https://github.com/alteryx/featuretools",
    additions: 37,
    deletions: 16,
    files: 2,
    tags: ["Python", "Dataframes", "API validation"],
  },
];

export const FEATURED_CONTRIBUTIONS = [
  MERGED_CONTRIBUTIONS[0],
  MERGED_CONTRIBUTIONS[2],
  MERGED_CONTRIBUTIONS[4],
];

export const CONTRIBUTION_STATS = [
  { value: "14", label: "Tracked upstream PRs" },
  { value: "7", label: "Merged upstream" },
  { value: "7", label: "Currently open" },
  { value: "11", label: "Upstream repositories" },
];
