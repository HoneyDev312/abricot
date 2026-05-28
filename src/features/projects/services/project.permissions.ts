import type { ProjectDetails } from "../types/project.types";

export function canEditProjectTask(project?: Pick<ProjectDetails, "userRole">) {
  if (!project?.userRole) {
    return false;
  }

  return ["ADMIN", "CONTRIBUTOR"].includes(project.userRole.toUpperCase());
}
