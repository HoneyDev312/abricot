import { getProjectOrNotFound } from "@/features/projects/services/project.helpers";
import { ProjectDetailsHeader } from "@/features/projects/components/ProjectDetailsHeader";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProjectOrNotFound(projectId);

  return (
    <main className={styles.page}>
      <ProjectDetailsHeader
        description={project.description || "Aucune description"}
        title={project.name}
      />
    </main>
  );
}
