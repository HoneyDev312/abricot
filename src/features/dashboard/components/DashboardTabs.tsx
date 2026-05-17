"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/shared/components/Icons";
import { DashboardKanbanContainer } from "./DashboardKanbanContainer";
import { DashboardListContainer } from "./DashboardListContainer";
import styles from "./DashboardTabs.module.css";

type DashboardTabId = "kanban" | "list";

type DashboardTab = {
  icon: IconName;
  id: DashboardTabId;
  label: string;
};

const dashboardTabs: DashboardTab[] = [
  {
    icon: "task",
    id: "list",
    label: "Liste",
  },
  {
    icon: "calendar",
    id: "kanban",
    label: "Kanban",
  },
];

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<DashboardTabId>("list");

  return (
    <>
      <div
        aria-label="Affichage des tâches"
        className={styles.tabs}
        role="tablist"
      >
        {dashboardTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              aria-selected={isActive}
              className={
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              <Icon color="brand" name={tab.icon} size="14px" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "list" ? <DashboardListContainer /> : null}
      {activeTab === "kanban" ? <DashboardKanbanContainer /> : null}
    </>
  );
}
