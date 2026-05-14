import type { ReactNode } from "react";

import { arrowDownIcon } from "./svg/arrowDown";
import { arrowTopIcon } from "./svg/arrowTop";
import { calendarIcon } from "./svg/calendar";
import { commentIcon } from "./svg/comment";
import { crossIcon } from "./svg/cross";
import { folderIcon } from "./svg/folder";
import { menuIcon } from "./svg/menu";
import { mosaicIcon } from "./svg/mosaic";
import { pencilIcon } from "./svg/pencil";
import { searchIcon } from "./svg/search";
import { starIcon } from "./svg/star";
import { taskIcon } from "./svg/task";
import { teamIcon } from "./svg/team";
import { trashIcon } from "./svg/trash";

export type IconDefinition = {
  Svg: () => ReactNode;
  viewBox: string;
};

const iconDefinitions = {
  arrowDown: arrowDownIcon,
  arrowTop: arrowTopIcon,
  calendar: calendarIcon,
  comment: commentIcon,
  cross: crossIcon,
  folder: folderIcon,
  menu: menuIcon,
  mosaic: mosaicIcon,
  pencil: pencilIcon,
  search: searchIcon,
  star: starIcon,
  task: taskIcon,
  team: teamIcon,
  trash: trashIcon,
};

export type IconName = keyof typeof iconDefinitions;

export const icons: Record<IconName, IconDefinition> = iconDefinitions;
