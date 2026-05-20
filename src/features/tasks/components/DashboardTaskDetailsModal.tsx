import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import {
  formatTaskDate,
  getDisplayableTaskStatus,
} from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskStatus } from "./DashboardTaskStatus";
import styles from "./DashboardTaskDetailsModal.module.css";

type DashboardTaskDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

export function DashboardTaskDetailsModal({
  isOpen,
  onClose,
  task,
}: DashboardTaskDetailsModalProps) {
  const status = getDisplayableTaskStatus(task.status);

  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label={`Détails de la tâche ${task.title}`}
      onClose={onClose}
    >
      <article className={styles.task}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.titleRow}>
              <Typography as="h4" variant="h4">
                {task.title}
              </Typography>
              <DashboardTaskStatus status={status} />
            </div>
            <Typography color="secondary" variant="small">
              {task.description || "Aucune description"}
            </Typography>
          </div>

          <button
            aria-label={`Options de la tâche ${task.title}`}
            className={styles.menuButton}
            type="button"
          >
            <Icon color="dark" name="menu" size="16px" />
          </button>
        </header>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <Typography color="secondary" variant="small">
              Projet :
            </Typography>
            <Icon color="neutral" name="folder" size="14px" />
            <Typography color="secondary" variant="small">
              {task.project?.name ?? "Nom du projet"}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography color="secondary" variant="small">
              Échéance :
            </Typography>
            <Icon color="neutral" name="calendar" size="14px" />
            <Typography color="secondary" variant="small">
              {formatTaskDate(task.dueDate)}
            </Typography>
          </div>

          <div className={styles.assignees}>
            <Typography color="secondary" variant="small">
              Assigné à :
            </Typography>
            {task.assignees.map((assignee) => (
              <span className={styles.assignee} key={assignee.id}>
                <span className={styles.assigneeAvatar}>
                  {getUserInitials(assignee.user)}
                </span>
                <span className={styles.assigneeName}>
                  {getDisplayName(assignee.user)}
                </span>
              </span>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <Typography variant="small">
            Commentaires ({task.comments.length})
          </Typography>
          <Icon color="dark" name="arrowTop" size="14px" />
        </footer>
      </article>
    </Modal>
  );
}
