"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/Icons";
import { AiTaskModal } from "../../tasks/components/AiTaskModal";

type AiTaskButtonProps = {
  className?: string;
  projectId: string;
};

export function AiTaskButton({ className, projectId }: AiTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Assistant IA"
        className={className}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Icon color="light" name="star" size="16px" />
        IA
      </button>

      {isOpen ? (
        <AiTaskModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          projectId={projectId}
        />
      ) : null}
    </>
  );
}
