import type { DisplayableTaskStatus } from "@/features/tasks/services/task.helpers";
import styles from "./DashboardTaskStatus.module.css";

type DashboardTaskStatusProps = {
  status: DisplayableTaskStatus;
};

const statusConfig: Record<
  DisplayableTaskStatus,
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
