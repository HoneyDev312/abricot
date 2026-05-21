import type { ProjectDetails } from "../types/project.types";

export function canEditProjectTask(project?: Pick<ProjectDetails, "userRole">) {
  if (!project?.userRole) {
    return false;
  }

  return project.userRole.toUpperCase() === "ADMIN";
}
