import type { InputHTMLAttributes } from "react";
import styles from "./ModalField.module.css";

type ProjectModalTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function ModalTextField({
  id,
  label,
  type = "text",
  ...props
}: ProjectModalTextFieldProps) {
  const inputId = id ?? label;

  return (
    <label className={styles.field} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <input className={styles.control} id={inputId} type={type} {...props} />
    </label>
  );
}
