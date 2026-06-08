import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import {
  getDashboardCategories,
  getDashboardProducts,
} from "../api/adminDashboard.api";
import { adminDashboardKeys } from "../api/adminDashboard.keys";
import { ADMIN_DASHBOARD_STAT_CONFIG } from "../constants/adminDashboard.constants";

export const useAdminDashboard = () => {
  const [
    latestProductsQuery,
    activeProductsQuery,
    inactiveProductsQuery,
    categoriesQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: adminDashboardKeys.productList({ page: 1, limit: 5 }),
        queryFn: () => getDashboardProducts({ page: 1, limit: 5 }),
      },
      {
        queryKey: adminDashboardKeys.productList({
          page: 1,
          limit: 1,
          isActive: true,
        }),
        queryFn: () =>
          getDashboardProducts({ page: 1, limit: 1, isActive: true }),
      },
      {
        queryKey: adminDashboardKeys.productList({
          page: 1,
          limit: 1,
          isActive: false,
        }),
        queryFn: () =>
          getDashboardProducts({ page: 1, limit: 1, isActive: false }),
      },
      {
        queryKey: adminDashboardKeys.categories(),
        queryFn: getDashboardCategories,
      },
    ],
  });

  const counts = useMemo(
    () => ({
      totalProducts: latestProductsQuery.data?.meta?.total ?? 0,
      activeProducts: activeProductsQuery.data?.meta?.total ?? 0,
      inactiveProducts: inactiveProductsQuery.data?.meta?.total ?? 0,
      totalCategories: categoriesQuery.data?.length ?? 0,
    }),
    [
      activeProductsQuery.data?.meta?.total,
      categoriesQuery.data?.length,
      inactiveProductsQuery.data?.meta?.total,
      latestProductsQuery.data?.meta?.total,
    ],
  );

  const stats = useMemo(
    () =>
      ADMIN_DASHBOARD_STAT_CONFIG.map((stat) => ({
        ...stat,
        value: counts[stat.key],
      })),
    [counts],
  );

  return {
    stats,
    latestProducts: latestProductsQuery.data?.data ?? [],
    categories: categoriesQuery.data ?? [],
    isLoading:
      latestProductsQuery.isLoading ||
      activeProductsQuery.isLoading ||
      inactiveProductsQuery.isLoading ||
      categoriesQuery.isLoading,
    isError:
      latestProductsQuery.isError ||
      activeProductsQuery.isError ||
      inactiveProductsQuery.isError ||
      categoriesQuery.isError,
    refetch: () => {
      void latestProductsQuery.refetch();
      void activeProductsQuery.refetch();
      void inactiveProductsQuery.refetch();
      void categoriesQuery.refetch();
    },
  };
};
