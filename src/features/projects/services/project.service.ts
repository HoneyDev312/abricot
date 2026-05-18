import { apiClient } from "@/shared/lib/api-client";
import type { Task, TasksResponse } from "@/features/tasks/types/task.types";
import type {
  CreateProjectPayload,
  CreateProjectResponse,
  Project,
  ProjectDetails,
  ProjectResponse,
  ProjectUser,
  ProjectsResponse,
  UsersSearchResponse,
} from "../types/project.types";

export async function getProjects(): Promise<Project[]> {
  const data = await apiClient.get<ProjectsResponse>("/projects", {
    cache: "no-store",
  });

  return data.projects;
}

export async function createProject(
  payload: CreateProjectPayload,
): Promise<Project> {
  const data = await apiClient.post<CreateProjectResponse>("/projects", payload);

  return data.project;
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

export async function searchUsers(query = ""): Promise<ProjectUser[]> {
  const searchParams = new URLSearchParams();

  if (query) {
    searchParams.set("query", query);
  }

  const endpoint = searchParams.size
    ? `/users/search?${searchParams.toString()}`
    : "/users/search";

  const data = await apiClient.get<UsersSearchResponse>(endpoint, {
    cache: "no-store",
  });

  return data.users;
}
