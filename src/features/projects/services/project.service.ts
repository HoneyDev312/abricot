import { apiClient } from "@/shared/lib/api-client";
import type {
  Project,
  ProjectDetails,
  ProjectResponse,
  ProjectsResponse,
} from "../types/project.types";

export async function getProjects(): Promise<Project[]> {
  const data = await apiClient.get<ProjectsResponse>("/projects", {
    cache: "no-store",
  });

  return data.projects;
}

export async function getProject(projectId: string): Promise<ProjectDetails> {
  const data = await apiClient.get<ProjectResponse>(`/projects/${projectId}`, {
    cache: "no-store",
  });

  return data.project;
}
