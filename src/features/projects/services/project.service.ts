import { apiClient } from "@/shared/lib/api-client";
import type { Project, ProjectsResponse } from "../types/project.types";

export async function getProjects(): Promise<Project[]> {
  const data = await apiClient.get<ProjectsResponse>("/projects", {
    cache: "no-store",
  });

  return data.projects;
}
