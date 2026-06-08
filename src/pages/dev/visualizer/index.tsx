import {
  Archive,
  ArrowDownUp,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Download,
  Edit3,
  Eye,
  FileSpreadsheet,
  Filter,
  MoreHorizontal,
  PackagePlus,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

import {
  currentVisualizationSpec,
  type ProductStatus,
  type VisualizationSpec,
} from "./visualizationSpec";

const statToneClasses: Record<
  VisualizationSpec["stats"][number]["tone"],
  string
> = {
  accent: "bg-accent-50 text-accent-600 border-accent-500/20",
  brand: "bg-brand-50 text-brand-900 border-brand-500/20",
  success: "bg-success-50 text-success-600 border-success-500/20",
  warning: "bg-warning-50 text-warning-600 border-warning-500/20",
};

const statusClasses: Record<ProductStatus, string> = {
  Active: "bg-success-50 text-success-600 border-success-500/20",
  Archived: "bg-surface-100 text-surface-800 border-surface-200",
  Draft: "bg-accent-50 text-accent-600 border-accent-500/20",
  "Low stock": "bg-warning-50 text-warning-600 border-warning-500/20",
};

const VisualizerPage = () => {
  const spec = currentVisualizationSpec;

  return (
    <div className="min-h-screen bg-surface-200 text-surface-900">
      <main className="mx-auto w-full max-w-7xl space-y-5 px-4 py-6 lg:px-6">
        <section className="rounded-lg border border-surface-200 bg-white shadow-soft">
          <div className="flex flex-col gap-5 border-b border-surface-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-600 text-white">
                <Boxes className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-surface-400">
                  Admin catalog
                </p>
                <h1 className="mt-1 font-heading text-2xl font-bold text-brand-900">
                  {spec.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-surface-800">
                  {spec.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                leftIcon={<FileSpreadsheet className="h-4 w-4" />}
              >
                Import CSV / Excel
              </Button>
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Add product
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
            {spec.stats.map((stat) => (
              <div
                key={stat.label}
                className={cn("rounded-lg border p-4", statToneClasses[stat.tone])}
              >
                <p className="text-xs font-semibold uppercase opacity-75">
                  {stat.label}
                </p>
                <p className="mt-2 font-heading text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm opacity-80">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-surface-200 pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-surface-400">
                    Views
                  </p>
                  <h2 className="font-heading text-lg font-bold">
                    Product status
                  </h2>
                </div>
                <Filter className="h-5 w-5 text-brand-600" />
              </div>

              <div className="mt-3 space-y-1">
                {spec.filters.map((filter, index) => (
                  <button
                    key={filter.label}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                      index === 0
                        ? "bg-brand-50 text-brand-900"
                        : "text-surface-800 hover:bg-surface-100",
                    )}
                  >
                    <span>{filter.label}</span>
                    <span className="text-xs text-surface-400">
                      {filter.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-2 text-brand-600">
                <Upload className="h-5 w-5" />
                <h2 className="font-heading text-lg font-bold text-surface-900">
                  Bulk import
                </h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-surface-800">
                Upload a CSV or Excel sheet to add products, update prices, and
                refresh stock in bulk.
              </p>
              <div className="mt-4 rounded-md border border-dashed border-brand-500 bg-brand-50 p-4 text-center">
                <FileSpreadsheet className="mx-auto h-8 w-8 text-brand-600" />
                <p className="mt-2 text-sm font-semibold text-brand-900">
                  CSV, XLS, XLSX
                </p>
                <p className="text-xs text-surface-800">Preview before import</p>
              </div>
              <Button
                fullWidth
                variant="secondary"
                className="mt-4"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download template
              </Button>
            </div>
          </aside>

          <section className="min-w-0 rounded-lg border border-surface-200 bg-white shadow-soft">
            <div className="flex flex-col gap-4 border-b border-surface-200 p-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-surface-900">
                  Catalog list
                </h2>
                <p className="mt-1 text-sm text-surface-800">{spec.intent}</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative min-w-0 sm:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                  <input
                    aria-label="Search products"
                    className="h-10 w-full rounded-md border-2 border-surface-300 bg-transparent pl-9 pr-3 text-sm text-surface-900 outline-none transition-colors placeholder:text-surface-400 focus:border-brand-500"
                    placeholder="Search name, SKU, category"
                  />
                </div>
                <Button
                  variant="secondary"
                  leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                >
                  Filters
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<ArrowDownUp className="h-4 w-4" />}
                >
                  Sort
                </Button>
              </div>
            </div>

            <div className="scrollbar-admin overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-surface-200 bg-surface-50 text-xs font-semibold uppercase text-surface-400">
                    <th className="w-12 px-4 py-3">
                      <input
                        aria-label="Select all products"
                        type="checkbox"
                        className="h-4 w-4 rounded border-surface-300 accent-brand-600"
                      />
                    </th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {spec.products.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-surface-50"
                    >
                      <td className="px-4 py-4">
                        <input
                          aria-label={`Select ${product.name}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-surface-300 accent-brand-600"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                            <PackagePlus className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-heading font-semibold text-surface-900">
                              {product.name}
                            </p>
                            <p className="mt-1 text-sm text-surface-800">
                              {product.category} · {product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-surface-800">
                        {product.sku}
                      </td>
                      <td className="px-4 py-4 font-heading font-semibold text-brand-900">
                        {product.price}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-surface-900">
                            {product.stock}
                          </span>
                          {product.stock > 0 && product.stock < 20 ? (
                            <span className="rounded-md bg-warning-50 px-2 py-1 text-xs font-semibold text-warning-600">
                              Reorder
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-bold",
                            statusClasses[product.status],
                          )}
                        >
                          {product.status === "Active" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : null}
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-surface-800">
                        {product.updatedAt}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`View ${product.name}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Archive ${product.name}`}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`More actions for ${product.name}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default VisualizerPage;
