import { Typography } from "@/shared/components/Typography";
import { DashboardTaskCard } from "./DashboardTaskCard";
import styles from "./DashboardKanbanContainer.module.css";
import type { TaskStatus } from "@/features/tasks/types/task.types";

const kanbanColumns = [
  {
    count: 4,
    status: "TODO",
    title: "À faire",
  },
  {
    count: 4,
    status: "IN_PROGRESS",
    title: "En cours",
  },
  {
    count: 4,
    status: "DONE",
    title: "Terminées",
  },
] satisfies Array<{ count: number; status: TaskStatus; title: string }>;

export function DashboardKanbanContainer() {
  return (
    <section className={styles.container} aria-label="Vue Kanban des tâches">
      {kanbanColumns.map((column) => (
        <section
          aria-label={column.title}
          className={styles.column}
          key={column.title}
        >
          <header className={styles.header}>
            <Typography as="h5" variant="h5">
              {column.title}
            </Typography>
            <span className={styles.count}>{column.count}</span>
          </header>

          <div className={styles.tasks}>
            <DashboardTaskCard status={column.status} variant="kanban" />
          </div>
        </section>
      ))}
    </section>
  );
}
