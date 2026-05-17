import { Typography } from "@/shared/components/Typography";
import styles from "./DashboardKanbanContainer.module.css";

const kanbanColumns = [
  {
    count: 4,
    title: "À faire",
  },
  {
    count: 4,
    title: "En cours",
  },
  {
    count: 4,
    title: "Terminées",
  },
];

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
        </section>
      ))}
    </section>
  );
}
