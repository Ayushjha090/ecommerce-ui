import { type FC, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { Download, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import AdminPageHeader from "@/layouts/admin/AdminPageHeader";

import { getCategories } from "../api/categories.api";
import { categoriesKey } from "../api/categories.key";
import type { Category } from "../types";

const CategoriesDashboard: FC = () => {
  const categoriesQuery = useQuery({
    queryKey: categoriesKey.list(),
    queryFn: getCategories,
  });

  const categories = categoriesQuery.data ?? [];
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
              {category.imageUrl ? (
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
              <p className="truncate text-xs text-surface-500 dark:text-surface-400">
                {category.description ?? "No description"}
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "parent",
        header: "Parent ID",
        enableColumnSearch: true,
        searchValue: (category) => String(category.parentId ?? "Root"),
        cell: (category) => category.parentId ?? "Root",
      },
      {
        id: "imageKey",
        header: "Image Key",
        enableColumnSearch: true,
        searchValue: (category) => category.imageKey ?? "",
        cell: (category) => (
          <span className="block max-w-56 truncate">
            {category.imageKey ?? "No image"}
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
            onClick={() => categoriesQuery.refetch()}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            isLoading={categoriesQuery.isFetching}
            className="shrink-0"
          >
            Refresh
          </Button>
        }
      />

      {categoriesQuery.isError && (
        <p className="text-sm text-error-500">Failed to load categories.</p>
      )}

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
