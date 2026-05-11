import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "dark" | "black" | "disabled" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  disabled,
  variant = "dark",
  ...props
}: ButtonProps) {
  const buttonClassName = className
    ? `${styles.button} ${styles[variant]} ${className}`
    : `${styles.button} ${styles[variant]}`;

  return (
    <button
      className={buttonClassName}
      disabled={disabled || variant === "disabled"}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
