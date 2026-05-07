import type { CSSProperties } from "react";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span
      aria-label={"Abricot"}
      className={className ? `${styles.logo} ${className}` : styles.logo}
      role="img"
    />
  );
}
