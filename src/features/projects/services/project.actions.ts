"use server";

import { revalidatePath } from "next/cache";
import { createProject } from "./project.service";

export type CreateProjectActionState = {
  error?: string;
  success?: boolean;
};

export async function createProjectAction(
  _state: CreateProjectActionState,
  formData: FormData,
): Promise<CreateProjectActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contributors = formData
    .getAll("contributors")
    .map((contributor) => String(contributor).trim())
    .filter(Boolean);

  if (!name || !description) {
    return {
      error: "Le titre et la description sont obligatoires",
      success: false,
    };
  }

  try {
    await createProject({
      contributors,
      description,
      name,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de créer le projet pour le moment",
      success: false,
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/projects");

  return { success: true };
}
