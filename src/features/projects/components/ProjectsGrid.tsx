import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/project.types";
import styles from "./ProjectsGrid.module.css";

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects.length) {
    return (
      <section className={styles.empty} aria-label="Liste des projets">
        <p>Aucun projet pour le moment.</p>
      </section>
    );
  }

  return (
    <section className={styles.grid} aria-label="Liste des projets">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
