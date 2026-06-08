import { Link } from "react-router";

import { ADMIN_DASHBOARD_QUICK_ACTIONS } from "../../constants/adminDashboard.constants";

export const AdminDashboardQuickActions = () => {
  return (
    <section className="rounded-md bg-surface-50 p-5 shadow-soft dark:bg-surface-800">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
            Quick Actions
          </h2>
          <p className="mt-1 truncate text-sm text-surface-500 dark:text-surface-400">
            Common catalog tasks
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_DASHBOARD_QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className="group flex min-h-24 items-center gap-4 rounded-md border border-surface-200 bg-white p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-surface-900 dark:bg-surface-900 dark:hover:border-brand-500 dark:hover:bg-brand-900/30"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-900 dark:text-brand-50">
              <action.icon className="h-5 w-5" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                {action.label}
              </span>
              <span className="mt-1 block truncate text-xs text-surface-500 dark:text-surface-400">
                {action.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
