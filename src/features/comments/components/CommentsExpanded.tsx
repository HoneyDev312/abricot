import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import { Typography } from "@/shared/components/Typography";
import type { TaskComment } from "../../tasks/types/task.types";
import styles from "./CommentsExpanded.module.css";

type CommentsExpandedProps = {
  comments: TaskComment[];
};

function formatCommentDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function CommentsExpanded({ comments }: CommentsExpandedProps) {
  return (
    <div className={styles.comments}>
      {comments.length ? (
        comments.map((comment) => (
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
  );
}
