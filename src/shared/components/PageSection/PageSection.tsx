import type { ReactNode } from "react";
import Styles from "./PageSection.module.css";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  label: string;
  unlogged?: boolean;
};

export function PageSection({
  children,
  className,
  label,
  unlogged = false,
}: PageSectionProps) {
  const pageSectionClassName = [
    Styles.pageSection,
    unlogged ? Styles.unlogged : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-label={label} className={pageSectionClassName}>
      {children}
    </section>
  );
}
