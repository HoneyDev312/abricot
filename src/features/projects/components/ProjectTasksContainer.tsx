import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import styles from "./ProjectTasksContainer.module.css";

export function ProjectTasksContainer() {
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
          <div
            aria-label="Affichage des tâches du projet"
            className={styles.tabs}
            role="tablist"
          >
            <button
              aria-selected="true"
              className={`${styles.tab} ${styles.tabActive}`}
              role="tab"
              type="button"
            >
              <Icon color="brand" name="task" size="14px" />
              Liste
            </button>
            <button
              aria-selected="false"
              className={styles.tab}
              role="tab"
              type="button"
            >
              <Icon color="brand" name="calendar" size="14px" />
              Calendrier
            </button>
          </div>

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
