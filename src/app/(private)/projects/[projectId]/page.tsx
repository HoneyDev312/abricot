import { ProjectContributors } from "@/features/projects/components/ProjectContributors";
import { ProjectDetailsHeader } from "@/features/projects/components/ProjectDetailsHeader";
import { ProjectTasksContainer } from "@/features/projects/components/ProjectTasksContainer";
import { getProjectOrNotFound } from "@/features/projects/services/project.helpers";
import { getProjectTasks } from "@/features/projects/services/project.service";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProjectOrNotFound(projectId);
  const tasks = await getProjectTasks(projectId);

  return (
    <main className={styles.page}>
      <ProjectDetailsHeader
        description={project.description || "Aucune description"}
        title={project.name}
      />
      <ProjectContributors members={project.members} owner={project.owner} />
      <ProjectTasksContainer tasks={tasks} />
    </main>
  );
}
