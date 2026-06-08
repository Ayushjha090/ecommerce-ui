export type VisualizationKind = "admin-products";

export type VisualizationStat = {
  label: string;
  value: string;
  detail: string;
  tone: "brand" | "success" | "warning" | "accent";
};

export type ProductStatus = "Active" | "Draft" | "Low stock" | "Archived";

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: string;
  stock: number;
  status: ProductStatus;
  updatedAt: string;
};

export type ProductFilter = {
  label: string;
  value: string;
};

export type VisualizationAction = {
  label: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
};

export type VisualizationSpec = {
  kind: VisualizationKind;
  title: string;
  subtitle: string;
  intent: string;
  stats: VisualizationStat[];
  actions: VisualizationAction[];
  filters: ProductFilter[];
  products: AdminProduct[];
};

export const currentVisualizationSpec: VisualizationSpec = {
  kind: "admin-products",
  title: "Products Management",
  subtitle:
    "A professional admin surface for listing products, adding new inventory, editing catalog details, and importing product data from CSV or Excel.",
  intent:
    "Give admins a fast, scannable workspace to manage the ecommerce catalog with clear inventory status and high-confidence actions.",
  stats: [
    {
      label: "Total products",
      value: "1,284",
      detail: "Across 18 categories",
      tone: "brand",
    },
    {
      label: "Active listings",
      value: "1,108",
      detail: "86% of catalog live",
      tone: "success",
    },
    {
      label: "Low stock",
      value: "42",
      detail: "Needs replenishment",
      tone: "warning",
    },
    {
      label: "Draft updates",
      value: "17",
      detail: "Waiting for review",
      tone: "accent",
    },
  ],
  actions: [
    { label: "Add product", variant: "primary" },
    { label: "Import CSV / Excel", variant: "outline" },
  ],
  filters: [
    { label: "All products", value: "1,284" },
    { label: "Active", value: "1,108" },
    { label: "Draft", value: "93" },
    { label: "Low stock", value: "42" },
    { label: "Archived", value: "41" },
  ],
  products: [
    {
      id: "PRD-1048",
      name: "Galaxy M Power 5G",
      category: "Mobiles",
      sku: "MOB-GMP-128-BLK",
      price: "$219.00",
      stock: 128,
      status: "Active",
      updatedAt: "Today, 10:42 AM",
    },
    {
      id: "PRD-0982",
      name: "NoiseLite Headphones",
      category: "Electronics",
      sku: "AUD-NLH-ANC-GRY",
      price: "$89.00",
      stock: 18,
      status: "Low stock",
      updatedAt: "Today, 9:15 AM",
    },
    {
      id: "PRD-1120",
      name: "UrbanRun Sneakers",
      category: "Fashion",
      sku: "FSH-URS-42-WHT",
      price: "$64.00",
      stock: 246,
      status: "Active",
      updatedAt: "Yesterday, 6:20 PM",
    },
    {
      id: "PRD-1177",
      name: "SmartChef Air Fryer",
      category: "Home Appliances",
      sku: "HOM-SAF-6L-BLK",
      price: "$129.00",
      stock: 7,
      status: "Low stock",
      updatedAt: "Yesterday, 4:05 PM",
    },
    {
      id: "PRD-1214",
      name: "GlowCare Starter Kit",
      category: "Beauty",
      sku: "BTY-GCK-SET-01",
      price: "$34.00",
      stock: 0,
      status: "Draft",
      updatedAt: "Jun 7, 2:18 PM",
    },
    {
      id: "PRD-0871",
      name: "Everyday Backpack",
      category: "Accessories",
      sku: "ACC-EDB-24L-NVY",
      price: "$42.00",
      stock: 312,
      status: "Active",
      updatedAt: "Jun 6, 11:30 AM",
    },
  ],
};
