import { Typography } from "@/shared/components/Typography";
import type { ProfileUpdateFeedback as ProfileUpdateFeedbackType } from "../types/user.types";
import styles from "./ProfileUpdateFeedback.module.css";

type ProfileUpdateFeedbackProps = {
  feedback: ProfileUpdateFeedbackType | null;
};

export function ProfileUpdateFeedback({
  feedback,
}: ProfileUpdateFeedbackProps) {
  if (!feedback) {
    return null;
  }

  return (
    <div
      className={`${styles.feedback} ${styles[feedback.type]}`}
      role={feedback.type === "error" ? "alert" : "status"}
    >
      <Typography variant="small">{feedback.message}</Typography>
    </div>
  );
}
