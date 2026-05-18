"use client";

import { useState } from "react";
import type { Task } from "@/features/tasks/types/task.types";
import { Tabs, type TabItem } from "@/shared/components/Tabs";
import { DashboardKanbanContainer } from "./DashboardKanbanContainer";
import { DashboardListContainer } from "./DashboardListContainer";
import styles from "./DashboardTabs.module.css";

type DashboardTabId = "kanban" | "list";

const dashboardTabs: TabItem<DashboardTabId>[] = [
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

type DashboardTabsProps = {
  assignedTasks: Task[];
};

export function DashboardTabs({ assignedTasks }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<DashboardTabId>("list");

  return (
    <>
      <Tabs
        activeTab={activeTab}
        ariaLabel="Affichage des tâches"
        className={styles.tabs}
        items={dashboardTabs}
        onChange={setActiveTab}
      />

      {activeTab === "list" ? (
        <DashboardListContainer tasks={assignedTasks} />
      ) : null}
      {activeTab === "kanban" ? (
        <DashboardKanbanContainer tasks={assignedTasks} />
      ) : null}
    </>
  );
}
