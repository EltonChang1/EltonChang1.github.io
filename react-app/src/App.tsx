import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "@/components/site-layout";
import { RESUME_PAGE_PATH } from "@/constants/resume";
import { HomePage } from "@/pages/home-page";
import { ProjectsPage } from "@/pages/projects-page";
import { ResumePage } from "@/pages/resume-page";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path={RESUME_PAGE_PATH} element={<ResumePage />} />
      </Route>
    </Routes>
  );
}
