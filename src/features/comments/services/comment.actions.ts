"use server";

import { revalidatePath } from "next/cache";
import { createComment } from "./comment.service";

export type CreateCommentActionState = {
  error?: string;
  success?: boolean;
};

export async function createCommentAction(
  _state: CreateCommentActionState,
  formData: FormData,
): Promise<CreateCommentActionState> {
  const projectId = String(formData.get("projectId") ?? "").trim();
  const taskId = String(formData.get("taskId") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!projectId || !taskId || !content) {
    return {
      error: "Le commentaire ne peut pas être vide",
      success: false,
    };
  }

  try {
    await createComment(projectId, taskId, { content });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible d'ajouter le commentaire pour le moment",
      success: false,
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}
