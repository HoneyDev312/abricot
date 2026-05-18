"use client";

import { useState } from "react";
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
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskStatus } from "@/features/dashboard/components/DashboardTaskStatus";
import styles from "./ProjectTaskCard.module.css";

type ProjectTaskCardProps = {
  task: Task;
};

export function ProjectTaskCard({ task }: ProjectTaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const status = getDisplayableTaskStatus(task.status);

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.titleRow}>
              <Typography as="h5" variant="h5" weight="bold">
                {task.title}
              </Typography>
              <DashboardTaskStatus status={status} />
            </div>
            <Typography color="secondary" variant="small">
              {task.description || "Aucune description"}
            </Typography>
          </div>

          <div className={styles.menu}>
            <button
              aria-expanded={isMenuOpen}
              aria-label={`Options de la tâche ${task.title}`}
              className={styles.menuButton}
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <Icon color="dark" name="menu" size="16px" />
            </button>

            {isMenuOpen ? (
              <div className={styles.menuPanel}>
                <button className={styles.menuItem} type="button">
                  <Icon color="dark" name="pencil" size="14px" />
                  Modifier
                </button>
                <button className={styles.menuItem} type="button">
                  <Icon color="dark" name="trash" size="14px" />
                  Effacer
                </button>
              </div>
            ) : null}
          </div>
        </header>

        <div className={styles.details}>
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
      </div>

      <footer className={styles.footer}>
        <Typography variant="small">
          Commentaires ({task.comments.length})
        </Typography>
        <Icon color="dark" name="arrowTop" size="14px" />
      </footer>
    </article>
  );
}
