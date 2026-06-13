import {
  ArrowRight,
  Edit3,
  FolderTree,
  ImageOff,
  Loader2,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import AdminPageHeader from "@/layouts/admin/AdminPageHeader";
import { cn } from "@/utils/cn";

import {
  currentVisualizationSpec,
  type Category,
  type CategoryStat,
} from "./visualizationSpec";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const statToneClasses: Record<CategoryStat["tone"], string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-50",
  info: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500",
  success:
    "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
};

type StatCardProps = CategoryStat & {
  icon: LucideIcon;
};

const StatCard = ({ description, icon: Icon, label, tone, value }: StatCardProps) => (
  <article className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-surface-500 dark:text-surface-400">
          {label}
        </p>
        <p className="mt-3 text-3xl font-bold text-surface-900 dark:text-surface-50">
          {value}
        </p>
      </div>

      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
          statToneClasses[tone],
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
    </div>

    <p className="mt-4 truncate text-sm text-surface-500 dark:text-surface-400">
      {description}
    </p>
  </article>
);

const CategoryImage = ({ category }: { category: Category }) => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-100 text-surface-400 dark:bg-surface-900">
    {category.image ? (
      <img
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover"
      />
    ) : (
      <ImageOff className="h-5 w-5" />
    )}
  </div>
);

const ProductsBadge = ({ count }: { count: number }) => (
  <span
    className={cn(
      "inline-flex h-7 w-fit items-center rounded-md px-2 text-xs font-semibold",
      count > 0
        ? "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-50"
        : "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
    )}
  >
    {count} products
  </span>
);

const CategoryActions = ({ category }: { category: Category }) => (
  <div className="relative flex justify-end">
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-950 dark:text-surface-400 dark:hover:bg-surface-900 dark:hover:text-surface-50"
      aria-label={`Actions for ${category.name}`}
    >
      <MoreHorizontal className="h-5 w-5" />
    </button>

    <div className="absolute right-0 top-10 z-10 hidden w-36 overflow-hidden rounded-md bg-surface-50 p-1 shadow-soft group-hover:block dark:bg-surface-900">
      <button className="flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800">
        <Edit3 className="h-4 w-4" />
        Edit
      </button>
      <button className="flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm font-medium text-error-600 hover:bg-error-50 dark:text-error-500 dark:hover:bg-error-500/10">
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  </div>
);

type CategoriesTableProps = {
  categories: Category[];
  isLoading?: boolean;
  selectedCategoryId?: number;
  onSelectCategory: (category: Category) => void;
};

const CategoriesTable = ({
  categories,
  isLoading = false,
  onSelectCategory,
  selectedCategoryId,
}: CategoriesTableProps) => {
  return (
    <section className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
            Category List
          </h2>
          <p className="mt-1 truncate text-sm text-surface-500 dark:text-surface-400">
            Flat admin table with parent category labels
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            type="search"
            aria-label="Search categories"
            placeholder="Search categories"
            className="h-10 w-full rounded-md border-2 border-surface-200 bg-transparent pl-9 pr-3 text-sm text-surface-900 outline-none transition-colors placeholder:text-surface-500 focus:border-brand-500 dark:border-surface-900 dark:text-surface-50 dark:placeholder:text-surface-400"
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-surface-200 dark:border-surface-900">
        <div className="scrollbar-admin overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="h-11 bg-surface-100 text-xs font-semibold uppercase text-surface-500 dark:bg-surface-900 dark:text-surface-400">
                <th className="px-4">Image</th>
                <th className="px-4">Category Name</th>
                <th className="px-4">Description</th>
                <th className="px-4">Parent Category</th>
                <th className="px-4">Total Products</th>
                <th className="px-4">Created At</th>
                <th className="px-4 text-right">Actions</th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <div className="flex min-h-52 items-center justify-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading categories...
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : categories.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <div className="flex min-h-52 flex-col items-center justify-center text-center">
                      <FolderTree className="h-10 w-10 text-surface-400" />
                      <p className="mt-3 text-sm font-semibold text-surface-900 dark:text-surface-50">
                        No categories exist yet
                      </p>
                      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                        Add your first category to organize products.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-surface-200 dark:divide-surface-900">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className={cn(
                      "group cursor-pointer transition-colors hover:bg-surface-100/60 dark:hover:bg-surface-900/40",
                      selectedCategoryId === category.id &&
                        "bg-brand-50/70 dark:bg-brand-900/20",
                    )}
                    onClick={() => onSelectCategory(category)}
                  >
                    <td className="px-4 py-4">
                      <CategoryImage category={category} />
                    </td>
                    <td className="px-4 py-4">
                      <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                        {category.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-surface-500 dark:text-surface-400">
                        ID #{category.id}
                      </p>
                    </td>
                    <td className="max-w-72 px-4 py-4">
                      <p className="line-clamp-2 text-sm text-surface-600 dark:text-surface-300">
                        {category.description || "No description provided"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex h-7 items-center rounded-md bg-surface-100 px-2 text-xs font-semibold text-surface-600 dark:bg-surface-900 dark:text-surface-300">
                        {category.parent?.name ?? "Root Category"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ProductsBadge count={category.productsCount} />
                    </td>
                    <td className="px-4 py-4 text-sm text-surface-600 dark:text-surface-300">
                      {formatDate(category.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div onClick={(event) => event.stopPropagation()}>
                        <CategoryActions category={category} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

type CategoryDetailsPanelProps = {
  category: Category;
  childCategories: Category[];
  onSelectCategory: (category: Category) => void;
};

const CategoryDetailsPanel = ({
  category,
  childCategories,
  onSelectCategory,
}: CategoryDetailsPanelProps) => {
  const isRoot = category.parent === null;

  return (
    <aside className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <CategoryImage category={category} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">
              Selected category
            </p>
            <h2 className="mt-1 truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
              {category.name}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            size="icon"
            variant="secondary"
            aria-label={`Edit ${category.name}`}
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label={`Delete ${category.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-md border border-surface-200 p-3 dark:border-surface-900">
          <p className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">
            Parent
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
            {category.parent?.name ?? "Root Category"}
          </p>
        </div>
        <div className="rounded-md border border-surface-200 p-3 dark:border-surface-900">
          <p className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">
            Products
          </p>
          <p className="mt-2 text-sm font-semibold text-surface-900 dark:text-surface-50">
            {category.productsCount}
          </p>
        </div>
        <div className="rounded-md border border-surface-200 p-3 dark:border-surface-900">
          <p className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">
            Created
          </p>
          <p className="mt-2 text-sm font-semibold text-surface-900 dark:text-surface-50">
            {formatDate(category.createdAt)}
          </p>
        </div>
        <div className="rounded-md border border-surface-200 p-3 dark:border-surface-900">
          <p className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">
            Updated
          </p>
          <p className="mt-2 text-sm font-semibold text-surface-900 dark:text-surface-50">
            {formatDate(category.updatedAt)}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-surface-200 p-4 dark:border-surface-900">
        <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">
          Description
        </p>
        <p className="mt-2 text-sm leading-6 text-surface-600 dark:text-surface-300">
          {category.description || "No description provided"}
        </p>
      </div>

      <div className="mt-5 rounded-md border border-surface-200 p-4 dark:border-surface-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">
              {isRoot ? "Child categories" : "Hierarchy"}
            </p>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              {isRoot
                ? "Subcategories linked to this parent"
                : "This child category belongs to its parent category"}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add child
          </Button>
        </div>

        {isRoot ? (
          childCategories.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {childCategories.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => onSelectCategory(child)}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-surface-200 px-3 text-left transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-surface-900 dark:hover:bg-brand-900/20"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                      {child.name}
                    </p>
                    <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                      {child.productsCount} products
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-md bg-surface-100 text-sm text-surface-500 dark:bg-surface-900 dark:text-surface-400">
              No child categories linked yet
            </div>
          )
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-md bg-surface-100 p-3 dark:bg-surface-900">
            <FolderTree className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                {category.parent?.name ?? "Root Category"} - {category.name}
              </p>
              <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                Parent relation is visible without rendering a nested tree.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

const CategoryForm = () => {
  const { formDefaults, parentOptions } = currentVisualizationSpec;

  return (
    <form className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-surface-900 dark:text-surface-50">
          Category Name
        </span>
        <input
          defaultValue={formDefaults.name}
          className="h-10 w-full rounded-md border-2 border-surface-200 bg-transparent px-3 text-sm text-surface-900 outline-none transition-colors focus:border-brand-500 dark:border-surface-900 dark:text-surface-50"
        />
        <span className="mt-1 block text-xs text-surface-500 dark:text-surface-400">
          Required. Validated with Zod.
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-surface-900 dark:text-surface-50">
          Description
        </span>
        <textarea
          defaultValue={formDefaults.description}
          className="min-h-24 w-full resize-none rounded-md border-2 border-surface-200 bg-transparent p-3 text-sm leading-6 text-surface-900 outline-none transition-colors focus:border-brand-500 dark:border-surface-900 dark:text-surface-50"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-surface-900 dark:text-surface-50">
          Category Image URL
        </span>
        <input
          defaultValue={formDefaults.image}
          className="h-10 w-full rounded-md border-2 border-surface-200 bg-transparent px-3 text-sm text-surface-900 outline-none transition-colors focus:border-brand-500 dark:border-surface-900 dark:text-surface-50"
        />
        <span className="mt-1 block text-xs text-surface-500 dark:text-surface-400">
          Optional. Must be a valid URL when provided.
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-surface-900 dark:text-surface-50">
          Parent Category
        </span>
        <select
          defaultValue={String(formDefaults.parentId ?? "")}
          className="h-10 w-full rounded-md border-2 border-surface-200 bg-transparent px-3 text-sm text-surface-900 outline-none transition-colors focus:border-brand-500 dark:border-surface-900 dark:text-surface-50"
        >
          {parentOptions.map((option) => (
            <option key={option.name} value={option.id ?? ""}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-md bg-surface-100 p-3 text-xs leading-5 text-surface-600 dark:bg-surface-900 dark:text-surface-300">
        Submit payload: name, optional description, optional image URL, and
        parentId as number or null.
      </div>
    </form>
  );
};

type CategoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoryDialog = ({ isOpen, onClose }: CategoryDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 p-4 backdrop-blur-sm">
      <section className="w-full max-w-2xl overflow-hidden rounded-md bg-surface-50 shadow-soft dark:bg-surface-800">
        <div className="flex items-start justify-between gap-4 border-b border-surface-200 p-5 dark:border-surface-900">
          <div>
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">
              Add Category
            </h2>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Create a root category or assign it to an existing parent.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-950 dark:text-surface-400 dark:hover:bg-surface-900 dark:hover:text-surface-50"
            aria-label="Close category dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <CategoryForm />
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-surface-200 p-5 dark:border-surface-900 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Create Category</Button>
        </div>
      </section>
    </div>
  );
};

const CategoriesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { categories, stats, subtitle, title } = currentVisualizationSpec;
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id,
  );
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];
  const childCategories = selectedCategory
    ? categories.filter((category) => category.parentId === selectedCategory.id)
    : [];
  const statIcons = [FolderTree, Package, FolderTree, ImageOff];

  return (
    <div className="min-h-dvh bg-surface-200 text-surface-900 dark:bg-surface-900 dark:text-surface-100">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 lg:px-6">
        <AdminPageHeader
          title={title}
          breadcrumbs={[{ label: "Admin" }, { label: "Categories" }]}
          actions={
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setIsDialogOpen(true)}
            >
              Add Category
            </Button>
          }
        />

        <p className="-mt-4 max-w-2xl text-sm text-surface-500 dark:text-surface-400">
          {subtitle}
        </p>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              icon={statIcons[index] ?? FolderTree}
            />
          ))}
        </section>

        <div className="rounded-md border border-info-500/20 bg-info-50 px-4 py-3 text-sm text-info-600 dark:bg-info-500/10 dark:text-info-500">
          Category created successfully. The dialog closes and the categories
          list refreshes after POST /api/admin/categories.
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.75fr)]">
          <CategoriesTable
            categories={categories}
            selectedCategoryId={selectedCategory?.id}
            onSelectCategory={(category) => setSelectedCategoryId(category.id)}
          />

          {selectedCategory && (
            <CategoryDetailsPanel
              category={selectedCategory}
              childCategories={childCategories}
              onSelectCategory={(category) => setSelectedCategoryId(category.id)}
            />
          )}
        </div>

        <CategoryDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </main>
    </div>
  );
};

export default CategoriesPage;
