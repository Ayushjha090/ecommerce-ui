import { ArrowLeft, ChevronRight } from "lucide-react";
import { type ReactNode } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/Button";

type AdminBreadcrumbItem = {
  label: string;
};

type AdminPageHeaderProps = {
  title: string;
  breadcrumbs?: AdminBreadcrumbItem[];
  actions?: ReactNode;
  showBackButton?: boolean;
};

export default function AdminPageHeader({
  title,
  breadcrumbs = [],
  actions,
  showBackButton = true,
}: AdminPageHeaderProps) {
  const navigate = useNavigate();
  const pageBreadcrumbs =
    breadcrumbs.length > 0 ? breadcrumbs : [{ label: title }];

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {showBackButton && (
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="secondary"
            size="icon"
            className="shrink-0 bg-surface-50 text-surface-600 shadow-soft hover:bg-surface-100 hover:text-surface-950 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-200 dark:hover:text-surface-900"
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="min-w-0">
          <nav
            className="flex min-w-0 items-center gap-1 text-xs font-medium text-surface-500 dark:text-surface-400"
            aria-label="Breadcrumb"
          >
            {pageBreadcrumbs.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="flex min-w-0 items-center gap-1"
              >
                {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                <span className="truncate">{item.label}</span>
              </span>
            ))}
          </nav>

          <h1 className="mt-1 truncate text-2xl font-bold text-surface-900 dark:text-surface-50 sm:text-3xl">
            {title}
          </h1>
        </div>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </section>
  );
}
