"use client";

import { useState } from "react";
import { Button } from "@/shared/components/Button";
import type { ProjectUser } from "../types/project.types";
import { CreateProjectModal } from "./CreateProjectModal";
import styles from "./CreateProjectButton.module.css";

type CreateProjectButtonProps = {
  contributors: ProjectUser[];
};

export function CreateProjectButton({ contributors }: CreateProjectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={styles.button}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Créer un projet
      </Button>

      <CreateProjectModal
        contributors={contributors}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
