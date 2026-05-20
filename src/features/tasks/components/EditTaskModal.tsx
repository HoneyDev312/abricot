"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardTaskStatus } from "@/features/tasks/components/DashboardTaskStatus";
import { updateTaskAction } from "@/features/tasks/services/task.actions";
import { getDisplayableTaskStatus } from "@/features/tasks/services/task.helpers";
import type {
  Task,
  UpdateTaskPayload,
} from "@/features/tasks/types/task.types";
import { getDisplayName } from "@/features/users/services/user.helpers";
import { Button } from "@/shared/components/Button";
import {
  Modal,
  ModalSelectField,
  ModalTextField,
} from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import type {
  ProjectDetails,
  ProjectUser,
} from "../../projects/types/project.types";
import styles from "./EditTaskModal.module.css";

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
  task: Task;
};

const TASK_STATUS_OPTIONS: Array<NonNullable<UpdateTaskPayload["status"]>> = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

function getDateInputValue(dueDate?: string | null) {
  if (!dueDate) {
    return "";
  }

  return dueDate.slice(0, 10);
}

function getProjectAssignableUsers(project: ProjectDetails): ProjectUser[] {
  const usersById = new Map<string, ProjectUser>();

  usersById.set(project.owner.id, project.owner);
  project.members.forEach((member) => {
    usersById.set(member.user.id, member.user);
  });

  return Array.from(usersById.values());
}

export function EditTaskModal({
  isOpen,
  onClose,
  project,
  task,
}: EditTaskModalProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateTaskAction, {});
  const initialStatus = getDisplayableTaskStatus(task.status);
  const initialDueDate = getDateInputValue(task.dueDate);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] =
    useState<NonNullable<UpdateTaskPayload["status"]>>(initialStatus);

  const assignableUsers = useMemo(
    () => getProjectAssignableUsers(project),
    [project],
  );
  const isDirty =
    title !== task.title ||
    description !== (task.description ?? "") ||
    dueDate !== initialDueDate ||
    assigneeId !== "" ||
    status !== initialStatus;
  const canSubmit = title.trim().length > 0 && isDirty && !isPending;
  const selectedAssigneeIds = assigneeId
    ? [assigneeId]
    : task.assignees.map((assignee) => assignee.userId);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
    router.refresh();
  }, [onClose, router, state.success]);

  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label={`Modifier la tâche ${task.title}`}
      onClose={onClose}
    >
      <form action={formAction} className={styles.form}>
        <input name="projectId" type="hidden" value={project.id} />
        <input name="taskId" type="hidden" value={task.id} />
        <input name="status" type="hidden" value={status} />
        {selectedAssigneeIds.map((selectedAssigneeId) => (
          <input
            key={selectedAssigneeId}
            name="assigneeIds"
            type="hidden"
            value={selectedAssigneeId}
          />
        ))}

        <Typography as="h4" className={styles.title} variant="h4">
          Modifier
        </Typography>

        <div className={styles.fields}>
          <ModalTextField
            id={`edit-task-title-${task.id}`}
            label="Titre"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            required
            value={title}
          />

          <ModalTextField
            id={`edit-task-description-${task.id}`}
            label="Description"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />

          <ModalTextField
            id={`edit-task-due-date-${task.id}`}
            label="Échéance"
            name="dueDate"
            onChange={(event) => setDueDate(event.target.value)}
            type="date"
            value={dueDate}
          />

          <ModalSelectField
            id={`edit-task-assignee-${task.id}`}
            label="Assigné à :"
            name="assigneeChoice"
            onChange={(event) => setAssigneeId(event.target.value)}
            value={assigneeId}
          >
            <option value="">
              {task.assignees.length} collaborateur
              {task.assignees.length > 1 ? "s" : ""}
            </option>
            {assignableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {getDisplayName(user)}
              </option>
            ))}
          </ModalSelectField>

          <fieldset className={styles.statusField}>
            <legend className={styles.statusLegend}>Statut :</legend>
            <div className={styles.statusOptions}>
              {TASK_STATUS_OPTIONS.map((option) => (
                <button
                  aria-pressed={status === option}
                  className={styles.statusButton}
                  key={option}
                  onClick={() => setStatus(option)}
                  type="button"
                >
                  <DashboardTaskStatus status={option} />
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {state.error ? (
          <Typography className={styles.error} variant="small">
            {state.error}
          </Typography>
        ) : null}

        <Button
          disabled={!canSubmit}
          size="md"
          type="submit"
          variant={canSubmit ? "dark" : "disabled"}
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Modal>
  );
}
