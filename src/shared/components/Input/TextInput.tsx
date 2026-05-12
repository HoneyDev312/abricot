import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import { Typography } from "../Typography";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextInput({
  id,
  label,
  type = "text",
  ...props
}: TextInputProps) {
  const inputId = id ?? label;

  return (
    <label className={styles.field} htmlFor={inputId}>
      <Typography variant="label">{label}</Typography>
      <input className={styles.control} id={inputId} type={type} {...props} />
    </label>
  );
}
