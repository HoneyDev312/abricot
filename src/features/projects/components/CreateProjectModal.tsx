"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { getDisplayName } from "@/features/users/services/user.helpers";
import { createProjectAction } from "../services/project.actions";
import type { ProjectUser } from "../types/project.types";
import styles from "./CreateProjectModal.module.css";

type CreateProjectModalProps = {
  contributors: ProjectUser[];
  isOpen: boolean;
  onClose: () => void;
};

export function CreateProjectModal({
  contributors,
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createProjectAction, {});

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    onClose();
    router.refresh();
  }, [onClose, router, state.success]);

  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label="Créer un projet"
      onClose={onClose}
    >
      <form action={formAction} className={styles.form} ref={formRef}>
        <Typography as="h4" className={styles.title} variant="h4">
          Créer un projet
        </Typography>

        <div className={styles.fields}>
          <label className={styles.field} htmlFor="create-project-title">
            <span className={styles.label}>Titre*</span>
            <input
              className={styles.control}
              id="create-project-title"
              name="name"
              required
              type="text"
            />
          </label>

          <label className={styles.field} htmlFor="create-project-description">
            <span className={styles.label}>Description*</span>
            <input
              className={styles.control}
              id="create-project-description"
              name="description"
              required
              type="text"
            />
          </label>

          <label className={styles.field} htmlFor="create-project-contributors">
            <span className={styles.label}>Contributeurs</span>
            <span className={styles.selectWrapper}>
              <select
                className={`${styles.control} ${styles.select}`}
                id="create-project-contributors"
                name="contributors"
              >
                <option value="">Choisir un ou plusieurs collaborateurs</option>
                {contributors.map((contributor) => (
                  <option key={contributor.id} value={contributor.email}>
                    {getDisplayName(contributor)}
                  </option>
                ))}
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
          disabled={isPending}
          size="md"
          type="submit"
          variant={isPending ? "disabled" : "dark"}
        >
          {isPending ? "Ajout..." : "Ajouter un projet"}
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
