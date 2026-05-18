"use client";

import { useState } from "react";
import { SearchInput } from "@/shared/components/SearchInput";
import { SelectFilter } from "@/shared/components/SelectFilter";
import { Tabs, type TabItem } from "@/shared/components/Tabs";
import { Typography } from "@/shared/components/Typography";
import type { Task } from "@/features/tasks/types/task.types";
import { ProjectTaskCard } from "./ProjectTaskCard";
import styles from "./ProjectTasksContainer.module.css";

type ProjectTaskTabId = "calendar" | "list";

const projectTaskTabs: TabItem<ProjectTaskTabId>[] = [
  {
    icon: "task",
    id: "list",
    label: "Liste",
  },
  {
    icon: "calendar",
    id: "calendar",
    label: "Calendrier",
  },
];

type ProjectTasksContainerProps = {
  tasks: Task[];
};

export function ProjectTasksContainer({ tasks }: ProjectTasksContainerProps) {
  const [activeTab, setActiveTab] = useState<ProjectTaskTabId>("list");

  return (
    <section className={styles.container} aria-label="Tâches du projet">
      <header className={styles.header}>
        <div className={styles.heading}>
          <Typography as="h5" variant="h5">
            Tâches
          </Typography>
          <Typography color="secondary" variant="medium">
            Par ordre de priorité
          </Typography>
        </div>

        <div className={styles.controls}>
          <Tabs
            activeTab={activeTab}
            ariaLabel="Affichage des tâches du projet"
            items={projectTaskTabs}
            onChange={setActiveTab}
          />

          <SelectFilter
            className={styles.status}
            id="project-task-status"
            label="Filtrer par statut"
            name="taskStatus"
          >
            <option value="">Statut</option>
            <option value="TODO">À faire</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Terminée</option>
          </SelectFilter>

          <SearchInput
            className={styles.search}
            id="project-task-search"
            label="Rechercher une tâche"
            name="taskSearch"
          />
        </div>
      </header>

      <div className={styles.tasks}>
        {tasks.map((task) => (
          <ProjectTaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
