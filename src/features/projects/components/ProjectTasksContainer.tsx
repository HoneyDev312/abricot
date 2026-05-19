"use client";

import { useState } from "react";
import { SearchInput } from "@/shared/components/SearchInput";
import { SelectFilter } from "@/shared/components/SelectFilter";
import { Tabs, type TabItem } from "@/shared/components/Tabs";
import { Typography } from "@/shared/components/Typography";
import type { Task, TaskStatus } from "@/features/tasks/types/task.types";
import type { ProjectDetails } from "../types/project.types";
import { ProjectTaskCard } from "./ProjectTaskCard";
import styles from "./ProjectTasksContainer.module.css";

type ProjectTaskTabId = "calendar" | "list";
type ProjectTaskStatusFilter = Extract<
  TaskStatus,
  "DONE" | "IN_PROGRESS" | "TODO"
>;

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
  project: ProjectDetails;
  tasks: Task[];
};

export function ProjectTasksContainer({
  project,
  tasks,
}: ProjectTasksContainerProps) {
  const [activeTab, setActiveTab] = useState<ProjectTaskTabId>("list");
  const [statusFilter, setStatusFilter] = useState<
    ProjectTaskStatusFilter | ""
  >("");
  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

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
            onChange={(event) =>
              setStatusFilter(event.target.value as ProjectTaskStatusFilter | "")
            }
            value={statusFilter}
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
        {filteredTasks.map((task) => (
          <ProjectTaskCard key={task.id} project={project} task={task} />
        ))}
        {!filteredTasks.length ? (
          <Typography
            className={styles.empty}
            color="secondary"
            variant="medium"
          >
            Aucune tâche pour ce statut.
          </Typography>
        ) : null}
      </div>
    </section>
  );
}
