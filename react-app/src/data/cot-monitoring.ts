import { COT_MONITORING_PAGE_PATH } from "@/constants/research";

const id = "cot-monitoring-interpretability";

export const COT_MONITORING = {
  id,
  title: "CoT Monitoring & Interpretability",
  tagline: "Testing whether a model’s written reasoning helps flag unauthorized actions.",
  question: "Can a monitor better predict whether an AI model is about to propose an unauthorized action if it can read the model’s chain of thought?",
  summary: "I built a controlled evaluation with local Qwen models and an independent rule checker. At thresholds set before the main simulated test, adding reasoning cut false alarms from 69 to 4, while detections fell from 4 to 0 out of 35 confirmed violations.",
  path: COT_MONITORING_PAGE_PATH,
  projectPath: `/projects#${id}`,
  image: "/images/cot-monitoring-warnings.svg",
};
