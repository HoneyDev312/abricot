import type { InputHTMLAttributes } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./Input.module.css";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function DateInput({ id, label, ...props }: DateInputProps) {
  const inputId = id ?? label;

  return (
    <label className={styles.field} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <span className={styles.iconControl}>
        <input className={styles.control} id={inputId} type="date" {...props} />
        <Icon className={styles.icon} color="neutral" name="calendar" size="16px" />
      </span>
    </label>
  );
}
