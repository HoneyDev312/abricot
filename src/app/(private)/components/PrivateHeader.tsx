"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/shared/components/Icons";
import { Logo } from "@/shared/components/Logo";
import styles from "./PrivateHeader.module.css";
import { Typography } from "@/shared/components/Typography";

type NavLink = {
  href: string;
  icon: "folder" | "mosaic";
  label: string;
};

const navLinks: NavLink[] = [
  {
    href: "/dashboard",
    icon: "mosaic",
    label: "Tableau de bord",
  },
  {
    href: "/projects",
    icon: "folder",
    label: "Projets",
  },
];

type PrivateHeaderProps = {
  userInitials: string;
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrivateHeader({ userInitials }: PrivateHeaderProps) {
  const pathname = usePathname();
  const isAccountActive = pathname.startsWith("/account");

  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <NextLink
          href="/dashboard"
          aria-label="Retour au tableau de bord"
          className={styles.logoLink}
        >
          <Logo size="md" />
        </NextLink>

        <nav className={styles.nav} aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <NextLink
                aria-current={isActive ? "page" : undefined}
                className={isActive ? styles.navLinkActive : styles.navLink}
                href={link.href}
                key={link.href}
              >
                <Icon
                  color={isActive ? "light" : "brand"}
                  name={link.icon}
                  size="24px"
                />
                <Typography
                  variant="navLink"
                  color={isActive ? "light" : "brand"}
                >
                  {link.label}
                </Typography>
              </NextLink>
            );
          })}
        </nav>

        <NextLink
          aria-current={isAccountActive ? "page" : undefined}
          aria-label="Mon compte"
          className={
            isAccountActive
              ? `${styles.avatar} ${styles.avatarActive}`
              : styles.avatar
          }
          href="/account"
        >
          <Typography variant="navLink">{userInitials}</Typography>
        </NextLink>
      </div>
    </header>
  );
}
