import { adminAxios } from "@/lib/axios/adminAxios";

import type {
  ApiCollectionResponse,
  DashboardCategory,
  DashboardProduct,
} from "../types/adminDashboard.types";

type ProductListParams = {
  page?: number;
  limit?: number;
  isActive?: boolean;
};

export const getDashboardProducts = async (params: ProductListParams = {}) => {
  const response = await adminAxios.get<
    ApiCollectionResponse<DashboardProduct[]>
  >("/products", {
    params,
    requiresAuth: true,
  });

  return {
    data: response.data.data ?? [],
    meta: response.data.meta,
  };
};

export const getDashboardCategories = async () => {
  const response = await adminAxios.get<
    ApiCollectionResponse<DashboardCategory[]>
  >("/categories", {
    requiresAuth: true,
  });

  return response.data.data ?? [];
};
