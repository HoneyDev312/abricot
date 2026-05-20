import { getDisplayName } from "@/features/users/services/user.helpers";
import { Typography } from "@/shared/components/Typography";
import type { ProjectDetails, ProjectUser } from "../types/project.types";
import { ModalSelectField } from "@/shared/components/Modal";
import styles from "./EditProjectContributorsField.module.css";

type EditProjectContributorsFieldProps = {
  contributors: ProjectUser[];
  contributorsToRemove: string[];
  onContributorChange: (email: string) => void;
  onToggleContributorToRemove: (userId: string) => void;
  project: ProjectDetails;
  selectedContributor: string;
};

export function EditProjectContributorsField({
  contributors,
  contributorsToRemove,
  onContributorChange,
  onToggleContributorToRemove,
  project,
  selectedContributor,
}: EditProjectContributorsFieldProps) {
  const existingUserIds = new Set([
    project.ownerId,
    ...project.members.map((member) => member.userId),
  ]);
  const availableContributors = contributors.filter(
    (contributor) => !existingUserIds.has(contributor.id),
  );

  return (
    <>
      <ModalSelectField
        id="edit-project-contributors"
        label="Contributeurs"
        name="contributors"
        onChange={(event) => onContributorChange(event.target.value)}
        value={selectedContributor}
      >
        <option value="">{project.members.length} collaborateurs</option>
        {availableContributors.map((contributor) => (
          <option key={contributor.id} value={contributor.email}>
            {getDisplayName(contributor)}
          </option>
        ))}
      </ModalSelectField>

      {project.members.length > 0 ? (
        <div className={styles.currentContributors}>
          <Typography color="secondary" variant="small">
            Contributeurs actuels
          </Typography>
          <div className={styles.contributorBadges}>
            {project.members.map((member) => {
              const isMarkedForRemoval = contributorsToRemove.includes(
                member.userId,
              );

              return (
                <span
                  className={
                    isMarkedForRemoval
                      ? `${styles.contributorBadge} ${styles.contributorBadgeRemoved}`
                      : styles.contributorBadge
                  }
                  key={member.id}
                >
                  {getDisplayName(member.user)}
                  <button
                    aria-label={`Retirer ${getDisplayName(member.user)}`}
                    className={styles.removeContributorButton}
                    onClick={() => onToggleContributorToRemove(member.userId)}
                    type="button"
                  >
                    ×
                  </button>
                  {isMarkedForRemoval ? (
                    <input
                      name="contributorsToRemove"
                      type="hidden"
                      value={member.userId}
                    />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
