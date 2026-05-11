import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./Input.module.css";

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function SelectInput({
  children,
  id,
  label,
  ...props
}: SelectInputProps) {
  const selectId = id ?? label;

  return (
    <label className={styles.field} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <span className={styles.iconControl}>
        <select
          className={`${styles.control} ${styles.select}`}
          id={selectId}
          {...props}
        >
          {children}
        </select>
        <Icon className={styles.icon} color="dark" name="arrowDown" size="16px" />
      </span>
    </label>
  );
}
