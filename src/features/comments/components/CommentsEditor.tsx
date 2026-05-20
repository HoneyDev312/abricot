"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createCommentAction } from "@/features/comments/services/comment.actions";
import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/Typography";
import type { Task } from "../../tasks/types/task.types";
import styles from "./CommentsEditor.module.css";

type CommentsEditorProps = {
  onClose?: () => void;
  task: Task;
};

export function CommentsEditor({ onClose, task }: CommentsEditorProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    {},
  );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    onClose?.();
    router.refresh();
  }, [onClose, router, state.success]);

  return (
    <form action={formAction} className={styles.editor} ref={formRef}>
      <input name="projectId" type="hidden" value={task.projectId} />
      <input name="taskId" type="hidden" value={task.id} />
      <textarea
        className={styles.editorTextarea}
        id={`comment-${task.id}`}
        maxLength={2000}
        name="content"
        placeholder="Ajouter un commentaire..."
        required
        rows={4}
      />
      {state.error ? (
        <Typography className={styles.error} variant="small">
          {state.error}
        </Typography>
      ) : null}
      <div className={styles.editorActions}>
        <Button onClick={onClose} size="sm" type="button" variant="outline">
          Annuler
        </Button>
        <Button
          disabled={isPending}
          size="sm"
          type="submit"
          variant={isPending ? "disabled" : "dark"}
        >
          {isPending ? "Publication..." : "Publier"}
        </Button>
      </div>
    </form>
  );
}
