"use client";

import { useActionState } from "react";
import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { generateTasksAction } from "../services/task.actions";
import type { GeneratedTask } from "../types/task.types";
import styles from "./AiTaskModal.module.css";

type AiTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectTask: (task: GeneratedTask) => void;
  projectId: string;
};

export function AiTaskModal({
  isOpen,
  onClose,
  onSelectTask,
  projectId,
}: AiTaskModalProps) {
  const [state, formAction, isPending] = useActionState(
    generateTasksAction,
    {},
  );

  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label="Créer une tâche avec l'IA"
      onClose={onClose}
    >
      <div className={styles.layout}>
        <header className={styles.header}>
          <Icon color="brand" name="star" size="16px" />
          <Typography as="h4" className={styles.title} variant="h4">
            Créer une tâche
          </Typography>
        </header>

        {isPending ? (
          <div aria-live="polite" className={styles.loader} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <Typography color="secondary" variant="small">
              Génération des tâches...
            </Typography>
          </div>
        ) : state.tasks?.length ? (
          <div className={styles.results} aria-live="polite">
            {state.tasks.map((task, index) => (
              <button
                className={styles.task}
                key={`${task.title}-${index}`}
                onClick={() => onSelectTask(task)}
                type="button"
              >
                <Typography as="h5" variant="h5">
                  {task.title}
                </Typography>
                <Typography color="secondary" variant="small">
                  {task.description || "Aucune description"}
                </Typography>
              </button>
            ))}
          </div>
        ) : (
          <Typography className={styles.empty} color="secondary" variant="small">
            Décrivez votre besoin, l&apos;IA proposera des tâches structurées.
          </Typography>
        )}

        {state.error ? (
          <Typography className={styles.error} variant="small">
            {state.error}
          </Typography>
        ) : null}

        <form action={formAction} className={styles.promptForm}>
          <input name="projectId" type="hidden" value={projectId} />
          <input name="count" type="hidden" value="5" />
          <label className={styles.promptLabel} htmlFor="ai-task-prompt">
            <span className={styles.hiddenLabel}>
              Décrire les tâches à ajouter
            </span>
            <input
              className={styles.promptInput}
              disabled={isPending}
              id="ai-task-prompt"
              name="prompt"
              placeholder="Décrivez les tâches que vous souhaitez ajouter..."
              type="text"
            />
          </label>
          <button
            aria-label="Envoyer la demande à l'IA"
            className={styles.submitButton}
            disabled={isPending}
            type="submit"
          >
            <Icon color="light" name="star" size="12px" />
          </button>
        </form>
      </div>
    </Modal>
  );
}
