"use client";

import { useState } from "react";
import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import type { Task } from "../types/task.types";
import styles from "./TaskCommentsToggle.module.css";

type TaskCommentsToggleProps = {
  task: Task;
};

function formatCommentDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function TaskCommentsToggle({ task }: TaskCommentsToggleProps) {
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

      {isOpen ? (
        <div className={styles.comments}>
          {task.comments.length ? (
            task.comments.map((comment) => (
              <article className={styles.comment} key={comment.id}>
                <header className={styles.commentHeader}>
                  <span className={styles.commentAvatar}>
                    {getUserInitials(comment.author)}
                  </span>
                  <div className={styles.commentMeta}>
                    <Typography variant="small" weight="semibold">
                      {getDisplayName(comment.author)}
                    </Typography>
                    <Typography color="secondary" variant="small">
                      {formatCommentDate(comment.createdAt)}
                    </Typography>
                  </div>
                </header>
                <Typography color="secondary" variant="small">
                  {comment.content}
                </Typography>
              </article>
            ))
          ) : (
            <Typography color="secondary" variant="small">
              Aucun commentaire pour cette tâche.
            </Typography>
          )}
        </div>
      ) : null}
    </section>
  );
}
