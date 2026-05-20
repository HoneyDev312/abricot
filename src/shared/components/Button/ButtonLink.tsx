import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonLinkVariant = "dark" | "black" | "outline";
type ButtonLinkSize = "md" | "sm";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  fullWidth?: boolean;
  size?: ButtonLinkSize;
  variant?: ButtonLinkVariant;
};

export function ButtonLink({
  children,
  className,
  fullWidth = false,
  size = "md",
  variant = "dark",
  ...props
}: ButtonLinkProps) {
  const linkClassName = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={linkClassName} {...props}>
      {children}
    </Link>
  );
}
