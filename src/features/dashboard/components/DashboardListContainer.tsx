import type { Task } from "@/features/tasks/types/task.types";
import { SearchInput } from "@/shared/components/SearchInput";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskCard } from "./DashboardTaskCard";
import styles from "./DashboardListContainer.module.css";

type DashboardListContainerProps = {
  tasks: Task[];
};

export function DashboardListContainer({ tasks }: DashboardListContainerProps) {
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
        />
      </header>

      <div className={styles.tasks}>
        {tasks.map((task) => (
          <DashboardTaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
