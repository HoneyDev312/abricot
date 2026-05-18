import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { getProjects } from "@/features/projects/services/project.service";
import { PageHeader } from "../components/PageHeader";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <PageHeader
        actionLabel="+ Créer un projet"
        description="Gérez vos projets"
        title="Mes projets"
      />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
