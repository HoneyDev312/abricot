"use server";

import { revalidatePath } from "next/cache";
import type { CreateTaskPayload } from "../types/task.types";
import { createTask } from "./task.service";

export type CreateTaskActionState = {
  error?: string;
  success?: boolean;
};

export async function createTaskAction(
  _state: CreateTaskActionState,
  formData: FormData,
): Promise<CreateTaskActionState> {
  const projectId = String(formData.get("projectId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const status = String(
    formData.get("status") ?? "TODO",
  ) as CreateTaskPayload["status"];
  const assigneeIds = formData
    .getAll("assigneeIds")
    .map((assigneeId) => String(assigneeId).trim())
    .filter(Boolean);

  if (!projectId || !title || !description || !dueDate) {
    return {
      error: "Le titre, la description et l'échéance sont obligatoires",
      success: false,
    };
  }

  try {
    await createTask(projectId, {
      assigneeIds,
      description,
      dueDate,
      priority: "MEDIUM",
      status,
      title,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de créer la tâche pour le moment",
      success: false,
    };
  }

  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}
