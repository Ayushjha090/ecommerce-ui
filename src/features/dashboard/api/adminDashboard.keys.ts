export const adminDashboardKeys = {
  all: ["adminDashboard"] as const,
  products: () => [...adminDashboardKeys.all, "products"] as const,
  productList: (params: Record<string, string | number | boolean>) =>
    [...adminDashboardKeys.products(), params] as const,
  categories: () => [...adminDashboardKeys.all, "categories"] as const,
};
