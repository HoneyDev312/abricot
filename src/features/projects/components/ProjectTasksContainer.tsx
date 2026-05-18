"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/Icons";
import { Tabs, type TabItem } from "@/shared/components/Tabs";
import { Typography } from "@/shared/components/Typography";
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

export function ProjectTasksContainer() {
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

          <label className={styles.status}>
            <span className={styles.hiddenLabel}>Filtrer par statut</span>
            <select
              className={styles.statusSelect}
              id="project-task-status"
              name="taskStatus"
            >
              <option value="">Statut</option>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminée</option>
            </select>
            <Icon
              className={styles.statusIcon}
              color="neutral"
              name="arrowDown"
              size="14px"
            />
          </label>

          <label className={styles.search}>
            <span className={styles.hiddenLabel}>Rechercher une tâche</span>
            <input
              className={styles.searchInput}
              id="project-task-search"
              name="taskSearch"
              placeholder="Rechercher une tâche"
              type="search"
            />
            <Icon
              className={styles.searchIcon}
              color="neutral"
              name="search"
              size="14px"
            />
          </label>
        </div>
      </header>
    </section>
  );
}
