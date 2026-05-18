import { ApiError } from "@/shared/lib/api-client";
import { notFound } from "next/navigation";
import { getProject } from "./project.service";

export async function getProjectOrNotFound(projectId: string) {
  try {
    return await getProject(projectId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export function getPeopleCountLabel(count: number) {
  return count > 1 ? `${count} personnes` : `${count} personne`;
}
