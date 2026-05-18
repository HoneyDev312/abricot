"use client";

import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { CreateProjectModal } from "./CreateProjectModal";
import styles from "./CreateProjectButton.module.css";

export function CreateProjectButton() {
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

      <CreateProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
