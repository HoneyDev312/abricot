import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./SelectFilter.module.css";

type SelectFilterProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function SelectFilter({
  children,
  className,
  id,
  label,
  name,
  ...props
}: SelectFilterProps) {
  const selectId = id ?? name ?? label;
  const filterClassName = className
    ? `${styles.filter} ${className}`
    : styles.filter;

  return (
    <label className={filterClassName} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <select className={styles.select} id={selectId} name={name} {...props}>
        {children}
      </select>
      <Icon
        className={styles.icon}
        color="neutral"
        name="arrowDown"
        size="14px"
      />
    </label>
  );
}
