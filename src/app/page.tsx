import { Button } from "@/shared/components/Button";
import { Icon, type IconName } from "@/shared/components/Icons";
import { DateInput, SelectInput, TextInput } from "@/shared/components/Input";
import { Link } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
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

      <section className={styles.links} aria-label="Liens disponibles">
        <Link href="/">Link</Link>
        <Link href="/" variant="dark">
          Link
        </Link>
        <Link href="/" variant="disabled">
          Link
        </Link>
      </section>

      <section className={styles.inputs} aria-label="Champs disponibles">
        <TextInput label="Label" />
        <DateInput label="Label" />
        <SelectInput defaultValue="" label="Label">
          <option disabled value="">
            Selectionner
          </option>
          <option value="todo">A faire</option>
          <option value="done">Termine</option>
        </SelectInput>
      </section>

      <section className={styles.typography} aria-label="Textes disponibles">
        <Typography as="h1" variant="h1">
          Heading Manrope
        </Typography>
        <Typography as="h4" variant="h4">
          Title Inter brand
        </Typography>
        <Typography>small text Inter regular</Typography>
        <Typography color="secondary" variant="label">
          Label
        </Typography>
        <Typography color="neutral" variant="link">
          link
        </Typography>
      </section>
    </main>
  );
}
