"use client";

import { useState } from "react";
import type { ProjectDetails } from "../types/project.types";
import { CreateTaskModal } from "./CreateTaskModal";

type CreateTaskButtonProps = {
  className?: string;
  project: ProjectDetails;
};

export function CreateTaskButton({ className, project }: CreateTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Créer une tâche
      </button>

      {isOpen ? (
        <CreateTaskModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          project={project}
        />
      ) : null}
    </>
  );
}
