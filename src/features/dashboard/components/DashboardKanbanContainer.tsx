import {
  groupTasksByDisplayableStatus,
  type DisplayableTaskStatus,
} from "@/features/tasks/services/task.helpers";
import type { Task } from "@/features/tasks/types/task.types";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskCard } from "./DashboardTaskCard";
import styles from "./DashboardKanbanContainer.module.css";

const kanbanColumns = [
  {
    status: "TODO",
    title: "À faire",
  },
  {
    status: "IN_PROGRESS",
    title: "En cours",
  },
  {
    status: "DONE",
    title: "Terminées",
  },
] satisfies Array<{ status: DisplayableTaskStatus; title: string }>;

type DashboardKanbanContainerProps = {
  tasks: Task[];
};

export function DashboardKanbanContainer({
  tasks,
}: DashboardKanbanContainerProps) {
  const tasksByStatus = groupTasksByDisplayableStatus(tasks);

  return (
    <section className={styles.container} aria-label="Vue Kanban des tâches">
      {kanbanColumns.map((column) => {
        const columnTasks = tasksByStatus[column.status];

        return (
          <section
            aria-label={column.title}
            className={styles.column}
            key={column.title}
          >
            <header className={styles.header}>
              <Typography as="h5" variant="h5">
                {column.title}
              </Typography>
              <span className={styles.count}>{columnTasks.length}</span>
            </header>

            <div className={styles.tasks}>
              {columnTasks.map((task) => (
                <DashboardTaskCard
                  key={task.id}
                  task={task}
                  variant="kanban"
                />
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}
