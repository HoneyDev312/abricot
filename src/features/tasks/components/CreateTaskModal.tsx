"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardTaskStatus } from "@/features/tasks/components/DashboardTaskStatus";
import { Button } from "@/shared/components/Button";
import {
  Modal,
  ModalSelectField,
  ModalTextField,
} from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { getDisplayName } from "@/features/users/services/user.helpers";
import { createTaskAction } from "@/features/tasks/services/task.actions";
import type { CreateTaskPayload } from "@/features/tasks/types/task.types";
import type {
  ProjectDetails,
  ProjectUser,
} from "../../projects/types/project.types";
import styles from "./CreateTaskModal.module.css";

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
};

const TASK_STATUS_OPTIONS: CreateTaskPayload["status"][] = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

function getProjectAssignableUsers(project: ProjectDetails): ProjectUser[] {
  const usersById = new Map<string, ProjectUser>();

  usersById.set(project.owner.id, project.owner);
  project.members.forEach((member) => {
    usersById.set(member.user.id, member.user);
  });

  return Array.from(usersById.values());
}

export function CreateTaskModal({
  isOpen,
  onClose,
  project,
}: CreateTaskModalProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createTaskAction, {});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] = useState<CreateTaskPayload["status"]>("TODO");

  const assignableUsers = useMemo(
    () => getProjectAssignableUsers(project),
    [project],
  );
  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    dueDate.trim().length > 0 &&
    !isPending;

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
      label="Créer une tâche"
      onClose={onClose}
    >
      <form action={formAction} className={styles.form}>
        <input name="projectId" type="hidden" value={project.id} />
        <input name="status" type="hidden" value={status} />

        <Typography as="h4" className={styles.title} variant="h4">
          Créer une tâche
        </Typography>

        <div className={styles.fields}>
          <ModalTextField
            id="create-task-title"
            label="Titre*"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            required
            value={title}
          />

          <ModalTextField
            id="create-task-description"
            label="Description*"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            required
            value={description}
          />

          <ModalTextField
            id="create-task-due-date"
            label="Échéance*"
            name="dueDate"
            onChange={(event) => setDueDate(event.target.value)}
            required
            type="date"
            value={dueDate}
          />

          <ModalSelectField
            id="create-task-assignee"
            label="Assigné à :"
            name="assigneeIds"
            onChange={(event) => setAssigneeId(event.target.value)}
            value={assigneeId}
          >
            <option value="">Choisir un ou plusieurs collaborateurs</option>
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
          {isPending ? "Ajout..." : "+ Ajouter une tâche"}
        </Button>
        <Typography
          className={styles.requiredHint}
          color="secondary"
          variant="small"
        >
          * champ obligatoire
        </Typography>
      </form>
    </Modal>
  );
}
