import type { LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

import { formatDashboardNumber } from "../../utils/adminDashboard.utils";

type DashboardStat = {
  label: string;
  value: number;
  description: string;
  tone: "brand" | "success" | "warning" | "info";
  icon: LucideIcon;
};

type AdminDashboardStatGridProps = {
  stats: DashboardStat[];
  isLoading?: boolean;
};

const toneClasses: Record<DashboardStat["tone"], string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-50",
  success:
    "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500",
  info: "bg-info-50 text-info-600 dark:bg-info-500/15 dark:text-info-500",
};

export const AdminDashboardStatGrid = ({
  stats,
  isLoading = false,
}: AdminDashboardStatGridProps) => {
  return (
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
                {isLoading ? "..." : formatDashboardNumber(stat.value)}
              </p>
            </div>

            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
                toneClasses[stat.tone],
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
  );
};
