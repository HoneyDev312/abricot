import type { TaskStatus } from "@/features/tasks/types/task.types";
import styles from "./DashboardTaskStatus.module.css";

export type DashboardTaskStatusValue = Extract<
  TaskStatus,
  "DONE" | "IN_PROGRESS" | "TODO"
>;

type DashboardTaskStatusProps = {
  status: DashboardTaskStatusValue;
};

const statusConfig: Record<
  DashboardTaskStatusValue,
  { className: string; label: string }
> = {
  DONE: {
    className: styles.done,
    label: "Terminée",
  },
  IN_PROGRESS: {
    className: styles.inProgress,
    label: "En cours",
  },
  TODO: {
    className: styles.todo,
    label: "À faire",
  },
};

export function DashboardTaskStatus({ status }: DashboardTaskStatusProps) {
  const currentStatus = statusConfig[status];

  return (
    <span className={`${styles.status} ${currentStatus.className}`}>
      {currentStatus.label}
    </span>
  );
}
