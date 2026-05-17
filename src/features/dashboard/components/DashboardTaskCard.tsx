import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import {
  DashboardTaskStatus,
  type DashboardTaskStatusValue,
} from "./DashboardTaskStatus";
import styles from "./DashboardTaskCard.module.css";

type DashboardTaskCardProps = {
  status?: DashboardTaskStatusValue;
  variant?: "kanban" | "list";
};

export function DashboardTaskCard({
  status = "TODO",
  variant = "list",
}: DashboardTaskCardProps) {
  const cardClassName =
    variant === "kanban" ? `${styles.card} ${styles.cardKanban}` : styles.card;

  return (
    <article className={cardClassName}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <Typography as="h5" variant="h5" weight="bold">
              Nom de la tâche
            </Typography>
            <Typography color="secondary" variant="small">
              Description de la tâche
            </Typography>
          </div>

          {variant === "kanban" ? (
            <DashboardTaskStatus status={status} />
          ) : null}
        </div>

        <ul className={styles.meta} aria-label="Informations de la tâche">
          <li className={styles.metaItem}>
            <Icon color="neutral" name="folder" size="14px" />
            <Typography color="secondary" variant="small">
              Nom du projet
            </Typography>
          </li>
          <li className={styles.metaSeparator} />
          <li className={styles.metaItem}>
            <Icon color="neutral" name="calendar" size="14px" />
            <Typography color="secondary" variant="small">
              9 mars
            </Typography>
          </li>
          <li className={styles.metaSeparator} />
          <li className={styles.metaItem}>
            <Icon color="neutral" name="comment" size="14px" />
            <Typography color="secondary" variant="small">
              2
            </Typography>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        {variant === "list" ? <DashboardTaskStatus status={status} /> : null}
        <Button className={styles.viewButton} type="button">
          Voir
        </Button>
      </div>
    </article>
  );
}
