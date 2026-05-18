"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { updateProjectAction } from "../services/project.actions";
import type { ProjectDetails } from "../types/project.types";
import styles from "./EditProjectModal.module.css";

type EditProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
};

export function EditProjectModal({
  isOpen,
  onClose,
  project,
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
  const [state, formAction, isPending] = useActionState(updateProjectAction, {});

  const hasChanges =
    values.name.trim() !== initialValues.name ||
    values.description.trim() !== initialValues.description;

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
      label="Modifier un projet"
      onClose={onClose}
    >
      <form action={formAction} className={styles.form}>
        <Typography as="h4" className={styles.title} variant="h4">
          Modifier un projet
        </Typography>

        <input name="projectId" type="hidden" value={project.id} />

        <div className={styles.fields}>
          <label className={styles.field} htmlFor="edit-project-title">
            <span className={styles.label}>Titre*</span>
            <input
              className={styles.control}
              id="edit-project-title"
              name="name"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              required
              type="text"
              value={values.name}
            />
          </label>

          <label className={styles.field} htmlFor="edit-project-description">
            <span className={styles.label}>Description*</span>
            <input
              className={styles.control}
              id="edit-project-description"
              name="description"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
              type="text"
              value={values.description}
            />
          </label>

          <label className={styles.field} htmlFor="edit-project-contributors">
            <span className={styles.label}>Contributeurs</span>
            <span className={styles.selectWrapper}>
              <select
                className={`${styles.control} ${styles.select}`}
                disabled
                id="edit-project-contributors"
                name="contributors"
              >
                <option>{project.members.length} collaborateurs</option>
              </select>
              <Icon
                className={styles.selectIcon}
                color="dark"
                name="arrowDown"
                size="16px"
              />
            </span>
          </label>
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
