import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/Typography";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  actionLabel: string;
  description: string;
  title: string;
};

export function PageHeader({
  actionLabel,
  description,
  title,
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <Typography as="h4" variant="h4">
          {title}
        </Typography>
        <Typography variant="large">{description}</Typography>
      </div>

      <Button className={styles.actionButton} type="button">
        {actionLabel}
      </Button>
    </div>
  );
}
