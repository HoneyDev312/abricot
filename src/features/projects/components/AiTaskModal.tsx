"use client";

import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import styles from "./AiTaskModal.module.css";

type AiTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AiTaskModal({ isOpen, onClose }: AiTaskModalProps) {
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

        <form className={styles.promptForm}>
          <label className={styles.promptLabel} htmlFor="ai-task-prompt">
            <span className={styles.hiddenLabel}>
              Décrire les tâches à ajouter
            </span>
            <input
              className={styles.promptInput}
              id="ai-task-prompt"
              name="prompt"
              placeholder="Décrivez les tâches que vous souhaitez ajouter..."
              type="text"
            />
          </label>
          <button
            aria-label="Envoyer la demande à l'IA"
            className={styles.submitButton}
            type="submit"
          >
            <Icon color="light" name="star" size="12px" />
          </button>
        </form>
      </div>
    </Modal>
  );
}
