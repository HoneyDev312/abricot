import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./ProjectModalField.module.css";

type ProjectModalSelectFieldProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
  };

export function ProjectModalSelectField({
  children,
  id,
  label,
  ...props
}: ProjectModalSelectFieldProps) {
  const selectId = id ?? label;

  return (
    <label className={styles.field} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <span className={styles.selectWrapper}>
        <select
          className={`${styles.control} ${styles.select}`}
          id={selectId}
          {...props}
        >
          {children}
        </select>
        <Icon
          className={styles.selectIcon}
          color="dark"
          name="arrowDown"
          size="16px"
        />
      </span>
    </label>
  );
}
