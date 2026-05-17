import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import { DashboardTaskCard } from "./DashboardTaskCard";
import styles from "./DashboardListContainer.module.css";

export function DashboardListContainer() {
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

        <label className={styles.search}>
          <span className={styles.searchLabel}>Rechercher une tâche</span>
          <input
            className={styles.searchInput}
            id="dashboard-task-search"
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
      </header>

      <div className={styles.tasks}>
        <DashboardTaskCard />
      </div>
    </section>
  );
}
