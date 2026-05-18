"use client";

import { Button } from "@/shared/components/Button";
import { Icon } from "@/shared/components/Icons";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import styles from "./CreateProjectModal.module.css";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  return (
    <Modal
      className={styles.dialog}
      contentClassName={styles.content}
      isOpen={isOpen}
      label="Créer un projet"
      onClose={onClose}
    >
      <form className={styles.form}>
        <Typography as="h4" className={styles.title} variant="h4">
          Créer un projet
        </Typography>

        <div className={styles.fields}>
          <label className={styles.field} htmlFor="create-project-title">
            <span className={styles.label}>Titre*</span>
            <input
              className={styles.control}
              id="create-project-title"
              name="title"
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

        <Button disabled size="md" type="button" variant="disabled">
          Ajouter un projet
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
