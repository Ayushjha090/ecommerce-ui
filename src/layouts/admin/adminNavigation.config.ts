import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
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
    label: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    to: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
];
