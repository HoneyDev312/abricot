export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskUser = {
  createdAt: string;
  email: string;
  id: string;
  name?: string | null;
  updatedAt: string;
};

export type TaskAssignee = {
  assignedAt: string;
  id: string;
  taskId: string;
  user: TaskUser;
  userId: string;
};

export type TaskComment = {
  author: TaskUser;
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  taskId: string;
  updatedAt: string;
};

export type Task = {
  assignees: TaskAssignee[];
  comments: TaskComment[];
  createdAt: string;
  creatorId: string;
  description?: string | null;
  dueDate?: string | null;
  id: string;
  priority: TaskPriority;
  projectId: string;
  status: TaskStatus;
  title: string;
  updatedAt: string;
};

export type TasksResponse = {
  tasks: Task[];
};
