import { FolderTree } from "lucide-react";

import type { DashboardCategory } from "../../types/adminDashboard.types";

type AdminCategoryOverviewProps = {
  categories: DashboardCategory[];
  isLoading?: boolean;
};

export const AdminCategoryOverview = ({
  categories,
  isLoading = false,
}: AdminCategoryOverviewProps) => {
  const visibleCategories = categories.slice(0, 6);

  return (
    <section className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
            Categories
          </h2>
          <p className="mt-1 truncate text-sm text-surface-500 dark:text-surface-400">
            Catalog organization
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500">
          <FolderTree className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <div className="flex min-h-52 items-center justify-center rounded-md border border-surface-200 text-sm text-surface-500 dark:border-surface-900 dark:text-surface-400">
            Loading categories...
          </div>
        ) : visibleCategories.length === 0 ? (
          <div className="flex min-h-52 items-center justify-center rounded-md border border-surface-200 text-sm text-surface-500 dark:border-surface-900 dark:text-surface-400">
            No categories found
          </div>
        ) : (
          visibleCategories.map((category) => (
            <div
              key={category.id}
              className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-surface-200 px-3 dark:border-surface-900"
            >
              <span className="truncate text-sm font-medium text-surface-800 dark:text-surface-100">
                {category.name}
              </span>
              <span className="shrink-0 rounded-md bg-surface-100 px-2 py-1 text-xs font-medium text-surface-500 dark:bg-surface-900 dark:text-surface-400">
                #{category.id}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
