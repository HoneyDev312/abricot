export type ProjectUser = {
  email: string;
  firstname?: string | null;
  id: string;
  name: string | null;
};

export type ProjectMember = {
  id: string;
  joinedAt: string;
  projectId: string;
  role: string;
  user: ProjectUser;
  userId: string;
};

export type Project = {
  _count: {
    tasks: number;
  };
  createdAt: string;
  description: string | null;
  id: string;
  members: ProjectMember[];
  name: string;
  owner: ProjectUser;
  ownerId: string;
  updatedAt: string;
  userRole: string | null;
};

export type ProjectsResponse = {
  projects: Project[];
};
