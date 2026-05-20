"use client";

import { useActionState, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DashboardTaskStatus } from "@/features/tasks/components/DashboardTaskStatus";
import { deleteTaskAction } from "@/features/tasks/services/task.actions";
import {
  formatTaskDate,
  getDisplayableTaskStatus,
} from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import type { ProjectDetails } from "../../projects/types/project.types";
import { EditTaskModal } from "./EditTaskModal";
import styles from "./ProjectTaskCard.module.css";

type ProjectTaskCardProps = {
  project: ProjectDetails;
  task: Task;
};

export function ProjectTaskCard({ project, task }: ProjectTaskCardProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteTaskAction,
    {},
  );
  const status = getDisplayableTaskStatus(task.status);

  useEffect(() => {
    if (!deleteState.success) {
      return;
    }

    router.refresh();
  }, [deleteState.success, router]);

  function handleDeleteSubmit(event: FormEvent<HTMLFormElement>) {
    const shouldDelete = window.confirm(
      `Supprimer définitivement la tâche "${task.title}" ?`,
    );

    if (!shouldDelete) {
      event.preventDefault();
    }
  }

  return (
    <>
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
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    type="button"
                  >
                    <Icon color="dark" name="pencil" size="14px" />
                    Modifier
                  </button>
                  <form
                    action={deleteAction}
                    className={styles.menuForm}
                    onSubmit={handleDeleteSubmit}
                  >
                    <input name="projectId" type="hidden" value={project.id} />
                    <input name="taskId" type="hidden" value={task.id} />
                    <button
                      className={styles.menuItem}
                      disabled={isDeletePending}
                      type="submit"
                    >
                      <Icon color="dark" name="trash" size="14px" />
                      {isDeletePending ? "Suppression..." : "Effacer"}
                    </button>
                  </form>
                  {deleteState.error ? (
                    <Typography className={styles.menuError} variant="small">
                      {deleteState.error}
                    </Typography>
                  ) : null}
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

      {isEditModalOpen ? (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={project}
          task={task}
        />
      ) : null}
    </>
  );
}
