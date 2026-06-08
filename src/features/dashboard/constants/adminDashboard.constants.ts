import {
  FolderTree,
  ListTree,
  Package,
  PackageCheck,
  PackagePlus,
  PackageX,
  Plus,
  type LucideIcon,
} from "lucide-react";

export type AdminDashboardStatConfig = {
  key: "totalProducts" | "activeProducts" | "inactiveProducts" | "totalCategories";
  label: string;
  description: string;
  tone: "brand" | "success" | "warning" | "info";
  icon: LucideIcon;
};

export type AdminDashboardQuickAction = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const ADMIN_DASHBOARD_STAT_CONFIG: AdminDashboardStatConfig[] = [
  {
    key: "totalProducts",
    label: "Products",
    description: "Catalog items",
    tone: "brand",
    icon: Package,
  },
  {
    key: "activeProducts",
    label: "Active",
    description: "Visible to customers",
    tone: "success",
    icon: PackageCheck,
  },
  {
    key: "inactiveProducts",
    label: "Inactive",
    description: "Hidden products",
    tone: "warning",
    icon: PackageX,
  },
  {
    key: "totalCategories",
    label: "Categories",
    description: "Catalog groups",
    tone: "info",
    icon: FolderTree,
  },
];

export const ADMIN_DASHBOARD_QUICK_ACTIONS: AdminDashboardQuickAction[] = [
  {
    label: "Add product",
    description: "Create a catalog item",
    href: "/admin/products/new",
    icon: PackagePlus,
  },
  {
    label: "Manage products",
    description: "Review product listings",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Add category",
    description: "Create a product group",
    href: "/admin/categories/new",
    icon: Plus,
  },
  {
    label: "Manage categories",
    description: "Organize catalog groups",
    href: "/admin/categories",
    icon: ListTree,
  },
];
