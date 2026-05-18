import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  size?: "lg" | "md" | "sm";
  tone?: "brand" | "dark";
};

export function Logo({
  className,
  size = "lg",
  tone = "brand",
}: LogoProps) {
  const logoClassName = [
    styles.logo,
    styles[size],
    styles[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      aria-label={"Abricot"}
      className={logoClassName}
      role="img"
    />
  );
}
