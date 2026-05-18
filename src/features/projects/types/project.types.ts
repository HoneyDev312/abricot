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

export type ProjectTask = {
  createdAt: string;
  creator: ProjectUser;
  creatorId: string;
  description: string | null;
  dueDate: string | null;
  id: string;
  priority: string;
  projectId: string;
  status: string;
  title: string;
  updatedAt: string;
};

export type ProjectDetails = Project & {
  tasks: ProjectTask[];
};

export type ProjectResponse = {
  project: ProjectDetails;
};

export type ProjectsResponse = {
  projects: Project[];
};

export type CreateProjectPayload = {
  contributors?: string[];
  description: string;
  name: string;
};

export type CreateProjectResponse = {
  project: Project;
};

export type UpdateProjectPayload = {
  description: string;
  name: string;
};

export type AddProjectContributorPayload = {
  email: string;
};

export type UsersSearchResponse = {
  users: ProjectUser[];
};
