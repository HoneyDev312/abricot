"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { updateProjectAction } from "../services/project.actions";
import type { ProjectDetails, ProjectUser } from "../types/project.types";
import { EditProjectContributorsField } from "./EditProjectContributorsField";
import { ProjectModalTextField } from "./ProjectModalTextField";
import styles from "./EditProjectModal.module.css";

type EditProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
  contributors: ProjectUser[];
};

export function EditProjectModal({
  isOpen,
  onClose,
  project,
  contributors,
}: EditProjectModalProps) {
  const router = useRouter();
  const initialValues = useMemo(
    () => ({
      description: project.description ?? "",
      name: project.name,
    }),
    [project.description, project.name],
  );
  const [values, setValues] = useState(initialValues);
  const [selectedContributor, setSelectedContributor] = useState("");
  const [contributorsToRemove, setContributorsToRemove] = useState<string[]>(
    [],
  );
  const [state, formAction, isPending] = useActionState(
    updateProjectAction,
    {},
  );

  const hasChanges =
    values.name.trim() !== initialValues.name ||
    values.description.trim() !== initialValues.description ||
    Boolean(selectedContributor) ||
    contributorsToRemove.length > 0;

  useEffect(() => {
    if (!state.success) {
      return;
    }

    onClose();
    router.refresh();
  }, [onClose, router, state.success]);

  function toggleContributorToRemove(userId: string) {
    setContributorsToRemove((current) =>
      current.includes(userId)
        ? current.filter((currentUserId) => currentUserId !== userId)
        : [...current, userId],
    );
  }

  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label="Modifier un projet"
      onClose={onClose}
    >
      <form action={formAction} className={styles.form}>
        <Typography as="h4" className={styles.title} variant="h4">
          Modifier un projet
        </Typography>

        <input name="projectId" type="hidden" value={project.id} />

        <div className={styles.fields}>
          <ProjectModalTextField
            id="edit-project-title"
            label="Titre*"
            name="name"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            required
            value={values.name}
          />

          <ProjectModalTextField
            id="edit-project-description"
            label="Description*"
            name="description"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            required
            value={values.description}
          />

          <EditProjectContributorsField
            contributors={contributors}
            contributorsToRemove={contributorsToRemove}
            onContributorChange={setSelectedContributor}
            onToggleContributorToRemove={toggleContributorToRemove}
            project={project}
            selectedContributor={selectedContributor}
          />
        </div>

        {state.error ? (
          <Typography className={styles.error} variant="small">
            {state.error}
          </Typography>
        ) : null}

        <Button
          disabled={!hasChanges || isPending}
          size="md"
          type="submit"
          variant={!hasChanges || isPending ? "disabled" : "dark"}
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Modal>
  );
}
