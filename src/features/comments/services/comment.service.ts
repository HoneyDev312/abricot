import { apiClient } from "@/shared/lib/api-client";
import type {
  CreateCommentPayload,
  CreateCommentResponse,
} from "../types/comment.types";

export async function createComment(
  projectId: string,
  taskId: string,
  payload: CreateCommentPayload,
) {
  const data = await apiClient.post<CreateCommentResponse>(
    `/projects/${projectId}/tasks/${taskId}/comments`,
    payload,
  );

  return data.comment;
}
