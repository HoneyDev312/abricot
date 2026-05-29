"use server";

import { revalidatePath } from "next/cache";
import type {
  CreateTaskPayload,
  GeneratedTask,
  UpdateTaskPayload,
} from "../types/task.types";
import { createTask, deleteTask, generateTasks, updateTask } from "./task.service";

export type CreateTaskActionState = {
  error?: string;
  success?: boolean;
};

export type UpdateTaskActionState = {
  error?: string;
  success?: boolean;
};

export type DeleteTaskActionState = {
  error?: string;
  success?: boolean;
};

export type GenerateTasksActionState = {
  error?: string;
  success?: boolean;
  tasks?: GeneratedTask[];
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

export async function generateTasksAction(
  _state: GenerateTasksActionState,
  formData: FormData,
): Promise<GenerateTasksActionState> {
  const projectId = String(formData.get("projectId") ?? "").trim();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const count = Number(formData.get("count") ?? 5);

  if (!projectId || !prompt) {
    return {
      error: "Décrivez les tâches à générer",
      success: false,
    };
  }

  try {
    const { tasks } = await generateTasks(projectId, {
      count: Number.isNaN(count) ? 5 : count,
      prompt,
    });

    return {
      success: true,
      tasks,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de générer des tâches pour le moment",
      success: false,
    };
  }
}

export async function updateTaskAction(
  _state: UpdateTaskActionState,
  formData: FormData,
): Promise<UpdateTaskActionState> {
  const projectId = String(formData.get("projectId") ?? "").trim();
  const taskId = String(formData.get("taskId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const status = String(
    formData.get("status") ?? "TODO",
  ) as UpdateTaskPayload["status"];
  const assigneeIds = formData
    .getAll("assigneeIds")
    .map((assigneeId) => String(assigneeId).trim())
    .filter(Boolean);

  if (!projectId || !taskId || !title) {
    return {
      error: "Le titre de la tâche est obligatoire",
      success: false,
    };
  }

  try {
    await updateTask(projectId, taskId, {
      ...(assigneeIds.length > 0 ? { assigneeIds } : {}),
      description,
      dueDate,
      status,
      title,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de modifier la tâche pour le moment",
      success: false,
    };
  }

  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

export async function deleteTaskAction(
  _state: DeleteTaskActionState,
  formData: FormData,
): Promise<DeleteTaskActionState> {
  const projectId = String(formData.get("projectId") ?? "").trim();
  const taskId = String(formData.get("taskId") ?? "").trim();

  if (!projectId || !taskId) {
    return {
      error: "Impossible d'identifier la tâche à supprimer",
      success: false,
    };
  }

  try {
    await deleteTask(projectId, taskId);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de supprimer la tâche pour le moment",
      success: false,
    };
  }

  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}
