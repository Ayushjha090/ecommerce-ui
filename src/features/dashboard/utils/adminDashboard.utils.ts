import type { DashboardProduct } from "../types/adminDashboard.types";

export const formatDashboardNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

export const formatProductPrice = (price: DashboardProduct["price"]) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price));

export const getPrimaryProductImage = (product: DashboardProduct) =>
  product.images?.[0]?.url;
