"use client";

import { Icon, type IconName } from "@/shared/components/Icons";
import styles from "./Tabs.module.css";

export type TabItem<T extends string> = {
  icon: IconName;
  id: T;
  label: string;
};

type TabsProps<T extends string> = {
  activeTab: T;
  ariaLabel: string;
  className?: string;
  items: TabItem<T>[];
  onChange: (tab: T) => void;
};

export function Tabs<T extends string>({
  activeTab,
  ariaLabel,
  className,
  items,
  onChange,
}: TabsProps<T>) {
  const tabsClassName = className
    ? `${styles.tabs} ${className}`
    : styles.tabs;

  return (
    <div aria-label={ariaLabel} className={tabsClassName} role="tablist">
      {items.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            aria-selected={isActive}
            className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            key={item.id}
            onClick={() => onChange(item.id)}
            role="tab"
            type="button"
          >
            <Icon color="brand" name={item.icon} size="14px" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
