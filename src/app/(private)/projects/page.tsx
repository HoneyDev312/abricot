import { CreateProjectButton } from "@/features/projects/components/CreateProjectButton";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { getProjects } from "@/features/projects/services/project.service";
import { PageHeader } from "../components/PageHeader";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <PageHeader
        action={<CreateProjectButton />}
        description="Gérez vos projets"
        title="Mes projets"
      />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
