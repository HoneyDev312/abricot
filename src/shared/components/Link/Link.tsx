import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Link.module.css";

type LinkVariant = "brand" | "dark" | "disabled";

type LinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    variant?: LinkVariant;
  };

export function Link({
  children,
  className,
  href,
  variant = "brand",
  ...props
}: LinkProps) {
  const linkClassName = className
    ? `${styles.link} ${styles[variant]} ${className}`
    : `${styles.link} ${styles[variant]}`;

  if (variant === "disabled") {
    return (
      <span aria-disabled="true" className={linkClassName}>
        {children}
      </span>
    );
  }

  return (
    <NextLink className={linkClassName} href={href} {...props}>
      {children}
    </NextLink>
  );
}
