import { apiClient } from "@/shared/lib/api-client";
import type { Task, TasksResponse } from "@/features/tasks/types/task.types";
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

export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const data = await apiClient.get<TasksResponse>(`/projects/${projectId}/tasks`, {
    cache: "no-store",
  });

  return data.tasks;
}
