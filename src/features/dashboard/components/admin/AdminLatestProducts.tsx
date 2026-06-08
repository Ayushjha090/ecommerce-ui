import { ImageOff } from "lucide-react";

import type { DashboardProduct } from "../../types/adminDashboard.types";
import {
  formatProductPrice,
  getPrimaryProductImage,
} from "../../utils/adminDashboard.utils";

type AdminLatestProductsProps = {
  products: DashboardProduct[];
  isLoading?: boolean;
};

export const AdminLatestProducts = ({
  products,
  isLoading = false,
}: AdminLatestProductsProps) => {
  return (
    <section className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
            Latest Products
          </h2>
          <p className="mt-1 truncate text-sm text-surface-500 dark:text-surface-400">
            Recently added catalog items
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-surface-200 dark:border-surface-900">
        <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_7rem_6rem] items-center bg-surface-100 px-4 text-xs font-semibold uppercase text-surface-500 dark:bg-surface-900 dark:text-surface-400">
          <span>Product</span>
          <span>Price</span>
          <span>Status</span>
        </div>

        {isLoading ? (
          <div className="flex min-h-44 items-center justify-center text-sm text-surface-500 dark:text-surface-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-44 items-center justify-center text-sm text-surface-500 dark:text-surface-400">
            No products found
          </div>
        ) : (
          <div className="divide-y divide-surface-200 dark:divide-surface-900">
            {products.map((product) => {
              const imageUrl = getPrimaryProductImage(product);

              return (
                <div
                  key={product.id}
                  className="grid min-h-18 grid-cols-[minmax(0,1fr)_7rem_6rem] items-center gap-3 px-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-100 text-surface-400 dark:bg-surface-900">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageOff className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                        {product.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-surface-500 dark:text-surface-400">
                        {product.category?.name ?? "Uncategorized"}
                      </p>
                    </div>
                  </div>

                  <p className="truncate text-sm font-medium text-surface-700 dark:text-surface-200">
                    {formatProductPrice(product.price)}
                  </p>

                  <span
                    className={[
                      "inline-flex h-7 w-fit items-center rounded-md px-2 text-xs font-semibold",
                      product.isActive
                        ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                        : "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
                    ].join(" ")}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
