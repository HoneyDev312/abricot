import { apiClient } from "@/shared/lib/api-client";
import type {
  CreateTaskPayload,
  GenerateTasksPayload,
  GenerateTasksResponse,
  Task,
  TaskResponse,
  UpdateTaskPayload,
} from "../types/task.types";

export async function createTask(
  projectId: string,
  payload: CreateTaskPayload,
): Promise<Task> {
  const data = await apiClient.post<TaskResponse>(
    `/projects/${projectId}/tasks`,
    payload,
  );

  return data.task;
}

export async function generateTasks(
  projectId: string,
  payload: GenerateTasksPayload,
) {
  return apiClient.post<GenerateTasksResponse>(
    `/projects/${projectId}/tasks/generate`,
    payload,
  );
}

export async function updateTask(
  projectId: string,
  taskId: string,
  payload: UpdateTaskPayload,
): Promise<Task> {
  const data = await apiClient.put<TaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`,
    payload,
  );

  return data.task;
}

export async function deleteTask(
  projectId: string,
  taskId: string,
): Promise<void> {
  await apiClient.delete<void>(`/projects/${projectId}/tasks/${taskId}`);
}
