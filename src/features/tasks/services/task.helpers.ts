import type { Task, TaskStatus } from "../types/task.types";

export type DisplayableTaskStatus = Extract<
  TaskStatus,
  "DONE" | "IN_PROGRESS" | "TODO"
>;

export function formatTaskDate(dueDate?: string | null) {
  if (!dueDate) {
    return "Sans échéance";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(dueDate));
}

export function getDisplayableTaskStatus(
  status?: TaskStatus,
  fallback: DisplayableTaskStatus = "TODO",
): DisplayableTaskStatus {
  if (status === "DONE" || status === "IN_PROGRESS" || status === "TODO") {
    return status;
  }

  return fallback;
}

export function groupTasksByDisplayableStatus(tasks: Task[]) {
  return tasks.reduce<Record<DisplayableTaskStatus, Task[]>>(
    (groups, task) => {
      const status = getDisplayableTaskStatus(task.status);

      groups[status].push(task);

      return groups;
    },
    {
      DONE: [],
      IN_PROGRESS: [],
      TODO: [],
    },
  );
}

export function filterTasksByTitle(tasks: Task[], search: string) {
  const normalizedSearch = search.trim().toLocaleLowerCase("fr-FR");

  if (!normalizedSearch) {
    return tasks;
  }

  return tasks.filter((task) =>
    task.title.toLocaleLowerCase("fr-FR").includes(normalizedSearch),
  );
}
