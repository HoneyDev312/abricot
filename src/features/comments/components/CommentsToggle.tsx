"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import type { Task } from "../../tasks/types/task.types";
import { CommentsEditor } from "./CommentsEditor";
import { CommentsExpanded } from "./CommentsExpanded";
import styles from "./CommentsToggle.module.css";

type CommentsToggleProps = {
  isEditorOpen?: boolean;
  onEditorClose?: () => void;
  task: Task;
};

export function CommentsToggle({
  isEditorOpen = false,
  onEditorClose,
  task,
}: CommentsToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.wrapper} aria-label="Commentaires de la tâche">
      <footer className={styles.footer}>
        <Typography variant="small">
          Commentaires ({task.comments.length})
        </Typography>
        <button
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Masquer les commentaires" : "Afficher les commentaires"
          }
          className={styles.button}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <Icon
            className={isOpen ? styles.iconOpen : undefined}
            color="dark"
            name="arrowDown"
            size="14px"
          />
        </button>
      </footer>

      {isEditorOpen ? (
        <CommentsEditor onClose={onEditorClose} task={task} />
      ) : null}

      {isOpen ? <CommentsExpanded comments={task.comments} /> : null}
    </section>
  );
}
