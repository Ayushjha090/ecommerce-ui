import { type FC, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  Boxes,
  Download,
  FolderTree,
  Layers3,
  PackageX,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import AdminPageHeader from "@/layouts/admin/AdminPageHeader";
import { cn } from "@/utils/cn";

import { getCategories, getCategoryStats } from "../api/categories.api";
import { categoriesKey } from "../api/categories.key";
import type { Category } from "../types";

const formatCategoryNumber = (value?: number) =>
  new Intl.NumberFormat("en-IN").format(value ?? 0);

type CategoryStatCard = {
  label: string;
  value?: number;
  description: string;
  icon: LucideIcon;
  tone: "brand" | "success" | "info" | "warning";
};

const statToneClasses: Record<CategoryStatCard["tone"], string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-50",
  success:
    "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  info: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
};

const CategoriesDashboard: FC = () => {
  const categoriesQuery = useQuery({
    queryKey: categoriesKey.list(),
    queryFn: getCategories,
  });

  const categoryStatsQuery = useQuery({
    queryKey: categoriesKey.stats(),
    queryFn: getCategoryStats,
  });

  const categories = categoriesQuery.data ?? [];

  const stats = useMemo<CategoryStatCard[]>(
    () => [
      {
        label: "Total Categories",
        value: categoryStatsQuery.data?.total,
        description: "All active catalog groups",
        icon: FolderTree,
        tone: "brand",
      },
      {
        label: "Main Categories",
        value: categoryStatsQuery.data?.totalRootCategories,
        description: "Top-level shopping sections",
        icon: Boxes,
        tone: "success",
      },
      {
        label: "Subcategories",
        value: categoryStatsQuery.data?.childCategories,
        description: "Nested under main categories",
        icon: Layers3,
        tone: "info",
      },
      {
        label: "Empty Categories",
        value: categoryStatsQuery.data?.emptyCategories,
        description: "No products assigned",
        icon: PackageX,
        tone: "warning",
      },
    ],
    [categoryStatsQuery.data],
  );

  const columns = useMemo<DataTableColumn<Category>[]>(
    () => [
      {
        id: "category",
        header: "Category",
        canHide: false,
        enableColumnSearch: true,
        searchValue: (category) =>
          [category.name, category.description].filter(Boolean).join(" "),
        cell: (category) => (
          <div className="flex min-w-64 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-100 text-xs font-semibold text-surface-500 dark:bg-surface-800 dark:text-surface-400">
              {category.imageKey && category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name ?? "Category"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{category.name?.slice(0, 2).toUpperCase() ?? "NA"}</span>
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-surface-900 dark:text-surface-50">
                {category.name ?? "Untitled category"}
              </p>
              {category.description ? (
                <p className="truncate text-xs text-surface-500 dark:text-surface-400">
                  {category.description}
                </p>
              ) : null}
            </div>
          </div>
        ),
      },
      {
        id: "parent",
        header: "Parent Category",
        enableColumnSearch: true,
        searchValue: (category) => category.parentCategory?.name ?? "Main category",
        cell: (category) => (
          <span className="font-medium text-surface-700 dark:text-surface-200">
            {category.parentCategory?.name ?? "Main category"}
          </span>
        ),
      },
      {
        id: "totalProducts",
        header: "Total Products",
        searchValue: (category) => String(category.totalProducts ?? 0),
        className: "w-44",
        headerClassName: "w-44",
        cell: (category) => (
          <span className="inline-flex h-8 min-w-16 items-center justify-center rounded-md bg-brand-50 px-3 text-xs font-semibold text-brand-700 ring-1 ring-brand-500/15 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-500/20">
            {formatCategoryNumber(category.totalProducts)}
          </span>
        ),
      },
      {
        id: "createdAt",
        header: "Created",
        searchValue: (category) => category.createdAt ?? "",
        cell: (category) =>
          category.createdAt
            ? new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
              }).format(new Date(category.createdAt))
            : "Unknown",
      },
    ],
    [],
  );

  return (
    <div className="w-full space-y-6 py-2">
      <AdminPageHeader
        title="Categories"
        breadcrumbs={[{ label: "Admin" }, { label: "Categories" }]}
        actions={
          <Button
            variant="primary"
            onClick={() => {
              categoriesQuery.refetch();
              categoryStatsQuery.refetch();
            }}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            isLoading={categoriesQuery.isFetching || categoryStatsQuery.isFetching}
            className="shrink-0"
          >
            Refresh
          </Button>
        }
      />

      {(categoriesQuery.isError || categoryStatsQuery.isError) && (
        <p className="text-sm text-error-500">Failed to load categories.</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-surface-500 dark:text-surface-400">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-surface-900 dark:text-surface-50">
                  {categoryStatsQuery.isLoading
                    ? "..."
                    : formatCategoryNumber(stat.value)}
                </p>
              </div>

              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
                  statToneClasses[stat.tone],
                )}
              >
                <stat.icon className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-4 truncate text-sm text-surface-500 dark:text-surface-400">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      <DataTable
        data={categories}
        columns={columns}
        getRowId={(category) => category.id ?? category.imageKey ?? category.name ?? ""}
        isLoading={categoriesQuery.isLoading}
        emptyMessage="No categories found."
        enableGlobalSearch
        enableColumnVisibility
        enablePagination
        enableRowSelection
        initialPageSize={10}
        toolbarActions={
          <>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Export
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add Category
            </Button>
          </>
        }
        rowActionItems={(category) => [
          {
            id: "edit",
            label: "Edit category",
            icon: <Pencil className="h-4 w-4" />,
            onClick: () => {
              console.log("Edit category", category.id);
            },
          },
          {
            id: "delete",
            label: "Delete category",
            icon: <Trash2 className="h-4 w-4" />,
            variant: "danger",
            onClick: () => {
              console.log("Delete category", category.id);
            },
          },
        ]}
      />
    </div>
  );
};

export default CategoriesDashboard;
