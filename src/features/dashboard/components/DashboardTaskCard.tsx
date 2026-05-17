import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import type { TaskStatus } from "@/features/tasks/types/task.types";
import styles from "./DashboardTaskCard.module.css";

type DashboardTaskCardStatus = Extract<
  TaskStatus,
  "DONE" | "IN_PROGRESS" | "TODO"
>;

type DashboardTaskCardProps = {
  status?: DashboardTaskCardStatus;
};

const statusConfig: Record<
  DashboardTaskCardStatus,
  { className: string; label: string }
> = {
  DONE: {
    className: styles.statusDone,
    label: "Terminée",
  },
  IN_PROGRESS: {
    className: styles.statusInProgress,
    label: "En cours",
  },
  TODO: {
    className: styles.statusTodo,
    label: "À faire",
  },
};

export function DashboardTaskCard({ status = "TODO" }: DashboardTaskCardProps) {
  const currentStatus = statusConfig[status];

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <Typography as="h5" variant="h5" weight="bold">
            Nom de la tâche
          </Typography>
          <Typography color="secondary" variant="small">
            Description de la tâche
          </Typography>
        </div>

        <ul className={styles.meta} aria-label="Informations de la tâche">
          <li className={styles.metaItem}>
            <Icon color="neutral" name="folder" size="14px" />
            <Typography color="secondary" variant="small">
              Nom du projet
            </Typography>
          </li>
          <li className={styles.metaItem}>
            <Icon color="neutral" name="calendar" size="14px" />
            <Typography color="secondary" variant="small">
              9 mars
            </Typography>
          </li>
          <li className={styles.metaItem}>
            <Icon color="neutral" name="comment" size="14px" />
            <Typography color="secondary" variant="small">
              2
            </Typography>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <span className={`${styles.status} ${currentStatus.className}`}>
          {currentStatus.label}
        </span>
        <Button className={styles.viewButton} type="button">
          Voir
        </Button>
      </div>
    </article>
  );
}
