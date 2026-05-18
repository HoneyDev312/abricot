import type { DisplayableTaskStatus } from "@/features/tasks/services/task.helpers";
import {
  formatTaskDate,
  getDisplayableTaskStatus,
} from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskStatus } from "./DashboardTaskStatus";
import styles from "./DashboardTaskCard.module.css";

type DashboardTaskCardProps = {
  task?: Task;
  status?: DisplayableTaskStatus;
  variant?: "kanban" | "list";
};

export function DashboardTaskCard({
  task,
  status = "TODO",
  variant = "list",
}: DashboardTaskCardProps) {
  const taskStatus = getDisplayableTaskStatus(task?.status, status);
  const cardClassName =
    variant === "kanban" ? `${styles.card} ${styles.cardKanban}` : styles.card;

  return (
    <article className={cardClassName}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <Typography as="h5" variant="h5" weight="bold">
              {task?.title ?? "Nom de la tâche"}
            </Typography>
            <Typography color="secondary" variant="small">
              {task?.description || "Description de la tâche"}
            </Typography>
          </div>

          {variant === "kanban" ? (
            <DashboardTaskStatus status={taskStatus} />
          ) : null}
        </div>

        <ul className={styles.meta} aria-label="Informations de la tâche">
          <li className={styles.metaItem}>
            <Icon color="neutral" name="folder" size="14px" />
            <Typography color="secondary" variant="small">
              {task?.project?.name ?? "Nom du projet"}
            </Typography>
          </li>
          <li className={styles.metaSeparator} />
          <li className={styles.metaItem}>
            <Icon color="neutral" name="calendar" size="14px" />
            <Typography color="secondary" variant="small">
              {formatTaskDate(task?.dueDate)}
            </Typography>
          </li>
          <li className={styles.metaSeparator} />
          <li className={styles.metaItem}>
            <Icon color="neutral" name="comment" size="14px" />
            <Typography color="secondary" variant="small">
              {task?.comments.length ?? 0}
            </Typography>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        {variant === "list" ? <DashboardTaskStatus status={taskStatus} /> : null}
        <Button className={styles.viewButton} type="button">
          Voir
        </Button>
      </div>
    </article>
  );
}
