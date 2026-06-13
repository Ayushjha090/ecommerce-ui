import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  type LucideIcon,
} from "lucide-react";

import { paths } from "@/config";

export type AdminNavigationItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const adminNavigationItems: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    to: paths.admin.dashboard.getHref(),
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    to: "/admin/orders",
    icon: ShoppingCart,
  },
];
