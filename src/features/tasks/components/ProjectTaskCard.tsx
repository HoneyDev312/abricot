"use client";

import { useState } from "react";
import { DashboardTaskStatus } from "@/features/tasks/components/DashboardTaskStatus";
import {
  formatTaskDate,
  getDisplayableTaskStatus,
} from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import type { ProjectDetails } from "../../projects/types/project.types";
import { TaskActionsMenu } from "./TaskActionsMenu";
import { CommentsToggle } from "../../comments/components/CommentsToggle";
import styles from "./ProjectTaskCard.module.css";

type ProjectTaskCardProps = {
  project: ProjectDetails;
  task: Task;
};

export function ProjectTaskCard({ project, task }: ProjectTaskCardProps) {
  const [isCommentEditorOpen, setIsCommentEditorOpen] = useState(false);
  const status = getDisplayableTaskStatus(task.status);

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.titleRow}>
              <Typography as="h5" variant="h5" weight="bold">
                {task.title}
              </Typography>
              <DashboardTaskStatus status={status} />
            </div>
            <Typography color="secondary" variant="small">
              {task.description || "Aucune description"}
            </Typography>
          </div>

          <TaskActionsMenu
            onComment={() => setIsCommentEditorOpen(true)}
            project={project}
            task={task}
          />
        </header>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <Typography color="secondary" variant="small">
              Échéance :
            </Typography>
            <Icon color="neutral" name="calendar" size="14px" />
            <Typography color="secondary" variant="small">
              {formatTaskDate(task.dueDate)}
            </Typography>
          </div>

          <div className={styles.assignees}>
            <Typography color="secondary" variant="small">
              Assigné à :
            </Typography>
            {task.assignees.map((assignee) => (
              <span className={styles.assignee} key={assignee.id}>
                <span className={styles.assigneeAvatar}>
                  {getUserInitials(assignee.user)}
                </span>
                <span className={styles.assigneeName}>
                  {getDisplayName(assignee.user)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <CommentsToggle
        isEditorOpen={isCommentEditorOpen}
        onEditorClose={() => setIsCommentEditorOpen(false)}
        task={task}
      />
    </article>
  );
}
