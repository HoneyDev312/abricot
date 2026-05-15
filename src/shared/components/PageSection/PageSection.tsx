import type { ReactNode } from "react";
import Styles from "./PageSection.module.css";

type PageSectionProps = {
  children: ReactNode;
  label: string;
  unlogged?: boolean;
};

export function PageSection({ children, label }: PageSectionProps) {
  return (
    <section aria-label={label} className={Styles.pageSection}>
      {children}
    </section>
  );
}
