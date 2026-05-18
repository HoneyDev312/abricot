import { apiClient } from "@/shared/lib/api-client";
import type {
  CreateTaskPayload,
  Task,
  TaskResponse,
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
