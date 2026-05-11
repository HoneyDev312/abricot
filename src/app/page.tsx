import { Button } from "@/shared/components/Button";
import { Icon, type IconName } from "@/shared/components/Icons";
import { Logo } from "@/shared/components/Logo";
import styles from "./page.module.css";

const iconNames: IconName[] = [
  "arrowDown",
  "arrowTop",
  "calendar",
  "comment",
  "folder",
  "menu",
  "mosaic",
  "pencil",
  "search",
  "star",
  "task",
  "team",
  "trash",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <Logo className={styles.logo} />

      <section className={styles.icons} aria-label="Icones disponibles">
        {iconNames.map((name, index) => (
          <div className={styles.iconCard} key={name}>
            <Icon
              label={name}
              name={name}
              size={index % 2 === 0 ? "24px" : "16px"}
              color={
                index % 3 === 0 ? "brand" : index % 3 === 1 ? "neutral" : "dark"
              }
            />
            <span>{name}</span>
          </div>
        ))}
      </section>

      <section className={styles.buttons} aria-label="Boutons disponibles">
        <Button>Label</Button>
        <Button variant="black">Label</Button>
        <Button variant="disabled">Label</Button>
        <Button variant="outline">Label</Button>
      </section>
    </main>
  );
}
