import type { ReactNode } from "react";
import { Typography } from "@/shared/components/Typography";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  action?: ReactNode;
  description: string;
  title: string;
};

export function PageHeader({ action, description, title }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <Typography as="h4" variant="h4">
          {title}
        </Typography>
        <Typography variant="large">{description}</Typography>
      </div>

      {action ?? null}
    </div>
  );
}
