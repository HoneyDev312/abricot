import { apiClient } from "@/shared/lib/api-client";
import type { Task, TasksResponse } from "@/features/tasks/types/task.types";

export async function getAssignedTasks(): Promise<Task[]> {
  const { tasks } = await apiClient.get<TasksResponse>(
    "/dashboard/assigned-tasks",
    {
      cache: "no-store",
    }
  );

  return tasks;
}
