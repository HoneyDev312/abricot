"use client";

import { useActionState, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProjectDetails } from "@/features/projects/types/project.types";
import { deleteTaskAction } from "@/features/tasks/services/task.actions";
import type { Task } from "@/features/tasks/types/task.types";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import { EditTaskModal } from "./EditTaskModal";
import styles from "./TaskActionsMenu.module.css";

type TaskActionsMenuProps = {
  project?: ProjectDetails;
  task: Task;
};

export function TaskActionsMenu({ project, task }: TaskActionsMenuProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteTaskAction,
    {},
  );

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
              disabled={!project}
              onClick={() => {
                if (!project) {
                  return;
                }

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
              <input name="projectId" type="hidden" value={task.projectId} />
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

      {project && isEditModalOpen ? (
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
