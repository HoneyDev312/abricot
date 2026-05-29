"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/Icons";
import type { ProjectDetails } from "../../projects/types/project.types";
import { AiTaskModal } from "../../tasks/components/AiTaskModal";
import type { GeneratedTask } from "../types/task.types";
import { CreateTaskModal } from "./CreateTaskModal";

type AiTaskButtonProps = {
  className?: string;
  project: ProjectDetails;
};

export function AiTaskButton({ className, project }: AiTaskButtonProps) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<GeneratedTask | null>(null);

  function handleSelectTask(task: GeneratedTask) {
    setSelectedTask(task);
    setIsAiModalOpen(false);
  }

  return (
    <>
      <button
        aria-label="Assistant IA"
        className={className}
        onClick={() => setIsAiModalOpen(true)}
        type="button"
      >
        <Icon color="light" name="star" size="16px" />
        IA
      </button>

      {isAiModalOpen ? (
        <AiTaskModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onSelectTask={handleSelectTask}
          projectId={project.id}
        />
      ) : null}

      {selectedTask ? (
        <CreateTaskModal
          initialTask={selectedTask}
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          project={project}
        />
      ) : null}
    </>
  );
}
