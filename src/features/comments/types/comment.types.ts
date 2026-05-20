import type { TaskComment } from "@/features/tasks/types/task.types";

export type CreateCommentPayload = {
  content: string;
};

export type CreateCommentResponse = {
  comment: TaskComment;
};
