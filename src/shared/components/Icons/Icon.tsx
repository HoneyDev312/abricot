import { icons, type IconName } from "./icons";
import styles from "./Icon.module.css";

type IconColor = "brand" | "dark" | "light" | "neutral";

type IconProps = {
  className?: string;
  height?: string;
  label?: string;
  name: IconName;
  size?: string;
  color?: IconColor;
  width?: string;
};

export function Icon({
  className,
  height,
  label,
  name,
  size = "16px",
  color = "brand",
  width,
}: IconProps) {
  const icon = icons[name];
  const Svg = icon.Svg;
  const iconClassName = className
    ? `${styles.icon} ${styles[color]} ${className}`
    : `${styles.icon} ${styles[color]}`;

  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={iconClassName}
      fill="none"
      height={size ?? height}
      role={label ? "img" : undefined}
      viewBox={icon.viewBox}
      width={size ?? width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Svg />
    </svg>
  );
}
