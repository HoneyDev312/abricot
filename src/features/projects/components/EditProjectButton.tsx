"use client";

import { useState } from "react";
import type { ProjectDetails, ProjectUser } from "../types/project.types";
import { EditProjectModal } from "./EditProjectModal";
import styles from "./EditProjectButton.module.css";

type EditProjectButtonProps = {
  project: ProjectDetails;
  contributors: ProjectUser[];
};

export function EditProjectButton({
  project,
  contributors,
}: EditProjectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.editButton}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Modifier
      </button>

      {isOpen ? (
        <EditProjectModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          project={project}
          contributors={contributors}
        />
      ) : null}
    </>
  );
}
