import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectsGrid.module.css";

const placeholderProjects = Array.from({ length: 9 }, (_, index) => index);

export function ProjectsGrid() {
  return (
    <section className={styles.grid} aria-label="Liste des projets">
      {placeholderProjects.map((project) => (
        <ProjectCard key={project} />
      ))}
    </section>
  );
}
