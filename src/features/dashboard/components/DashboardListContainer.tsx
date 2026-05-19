"use client";

import { useState } from "react";
import { filterTasksByTitle } from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import { SearchInput } from "@/shared/components/SearchInput";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskCard } from "./DashboardTaskCard";
import styles from "./DashboardListContainer.module.css";

type DashboardListContainerProps = {
  tasks: Task[];
};

export function DashboardListContainer({ tasks }: DashboardListContainerProps) {
  const [search, setSearch] = useState("");
  const filteredTasks = filterTasksByTitle(tasks, search);

  return (
    <section className={styles.container} aria-label="Mes tâches assignées">
      <header className={styles.header}>
        <div className={styles.heading}>
          <Typography as="h5" variant="h5">
            Mes tâches assignées
          </Typography>
          <Typography color="secondary" variant="medium">
            Par ordre de priorité
          </Typography>
        </div>

        <SearchInput
          className={styles.search}
          id="dashboard-task-search"
          label="Rechercher une tâche"
          name="taskSearch"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </header>

      <div className={styles.tasks}>
        {filteredTasks.map((task) => (
          <DashboardTaskCard key={task.id} task={task} />
        ))}
        {!filteredTasks.length ? (
          <Typography
            className={styles.empty}
            color="secondary"
            variant="medium"
          >
            Aucune tâche ne correspond à votre recherche.
          </Typography>
        ) : null}
      </div>
    </section>
  );
}
