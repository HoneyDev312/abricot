import type { InputHTMLAttributes } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./SearchInput.module.css";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function SearchInput({
  className,
  id,
  label,
  name,
  placeholder,
  type = "search",
  ...props
}: SearchInputProps) {
  const inputId = id ?? name ?? label;
  const searchClassName = className
    ? `${styles.search} ${className}`
    : styles.search;

  return (
    <label className={searchClassName} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        id={inputId}
        name={name}
        placeholder={placeholder ?? label}
        type={type}
        {...props}
      />
      <Icon
        className={styles.icon}
        color="neutral"
        name="search"
        size="14px"
      />
    </label>
  );
}
