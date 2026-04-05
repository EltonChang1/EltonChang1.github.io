import { Navigate, Route, Routes } from "react-router-dom";

import { RESUME_HTML_URL } from "@/constants/resume";
import { SiteLayout } from "@/components/site-layout";
import { HomePage } from "@/pages/home-page";
import { ProjectsPage } from "@/pages/projects-page";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Route>
      <Route
        path="/resume"
        element={<Navigate to={RESUME_HTML_URL} replace />}
      />
    </Routes>
  );
}
