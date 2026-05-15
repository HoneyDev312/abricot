import type { ElementType, ReactNode } from "react";
import styles from "./Typography.module.css";

type TypographyColor =
  | "brand"
  | "dark"
  | "light"
  | "neutral"
  | "primary"
  | "secondary";
type TypographyFamily = "main" | "accent";
type TypographyVariant =
  | "h1"
  | "h4"
  | "h5"
  | "navLink"
  | "link"
  | "label"
  | "small"
  | "medium"
  | "large";
type TypographyWeight = "bold" | "medium" | "regular" | "semibold";

type TypographyProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  color?: TypographyColor;
  family?: TypographyFamily;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
};

export function Typography({
  as: Component = "p",
  children,
  className,
  color,
  family,
  variant = "small",
  weight,
}: TypographyProps) {
  const typographyClassName = [
    styles.typography,
    styles[variant],
    color ? styles[color] : undefined,
    family ? styles[family] : undefined,
    weight ? styles[weight] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={typographyClassName}>{children}</Component>;
}
