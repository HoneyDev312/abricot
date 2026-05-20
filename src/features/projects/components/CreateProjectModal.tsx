"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import {
  Modal,
  ModalSelectField,
  ModalTextField,
} from "@/shared/components/Modal";
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
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    {},
  );

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
          <ModalTextField
            id="create-project-title"
            label="Titre*"
            name="name"
            required
          />

          <ModalTextField
            id="create-project-description"
            label="Description*"
            name="description"
            required
          />

          <ModalSelectField
            id="create-project-contributors"
            label="Contributeurs"
            name="contributors"
          >
            <option value="">Choisir un ou plusieurs collaborateurs</option>
            {contributors.map((contributor) => (
              <option key={contributor.id} value={contributor.email}>
                {getDisplayName(contributor)}
              </option>
            ))}
          </ModalSelectField>
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
