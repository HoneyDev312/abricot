import {
  getDisplayName,
  getUserInitials,
} from "@/features/users/services/user.helpers";
import { Typography } from "@/shared/components/Typography";
import { getPeopleCountLabel } from "../services/project.helpers";
import type { ProjectMember, ProjectUser } from "../types/project.types";
import styles from "./ProjectContributors.module.css";

type ProjectContributorsProps = {
  members: ProjectMember[];
  owner: ProjectUser;
};

export function ProjectContributors({
  members,
  owner,
}: ProjectContributorsProps) {
  const peopleCount = members.length + 1;

  return (
    <section
      aria-label="Contributeurs du projet"
      className={styles.contributors}
    >
      <div className={styles.heading}>
        <Typography as="h5" variant="h5">
          Contributeurs
        </Typography>
        <Typography color="secondary" variant="small">
          {getPeopleCountLabel(peopleCount)}
        </Typography>
      </div>

      <div className={styles.people}>
        <div className={styles.owner}>
          <span className={styles.ownerAvatar}>{getUserInitials(owner)}</span>
          <span className={styles.ownerBadge}>Propriétaire</span>
        </div>

        {members.map((member) => (
          <div className={styles.member} key={member.id}>
            <span className={styles.memberAvatar}>
              {getUserInitials(member.user)}
            </span>
            <span className={styles.memberName}>
              {getDisplayName(member.user)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
