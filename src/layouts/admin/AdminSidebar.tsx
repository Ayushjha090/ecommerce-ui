import { LogOut, UserCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate, useLocation } from "react-router";

import { adminLogout } from "@/features/auth/api";
import { adminAuthKeys } from "@/features/auth/api/adminAuth.keys";
import { removeAccessToken } from "@/lib/storage/tokenStorage";
import { paths, themeConfig } from "@/config";
import { adminNavigationItems } from "./adminNavigation.config";
import type { AdminUser } from "@/features/auth/types";

export default function AdminSidebar() {
  const { logoUrl, templateName } = themeConfig;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const admin = queryClient.getQueryData<AdminUser>(adminAuthKeys.me());

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      removeAccessToken("admin");

      queryClient.removeQueries({
        queryKey: adminAuthKeys.all,
      });

      navigate(paths.admin.auth.login.getHref(), {
        replace: true,
      });
    }
  };

  const handleHomeRedirection = () => {
    const currentPathName = location.pathname;
    if(currentPathName && currentPathName === paths.admin.dashboard.getHref()) {
        return;
    }

    navigate(paths.admin.dashboard.getHref());
  }

  return (
    <aside className="m-5 hidden h-[calc(100dvh-2.5rem)] min-h-0 w-64 shrink-0 flex-col rounded-md bg-surface-50 shadow-2xl dark:bg-surface-800 lg:sticky lg:top-5 lg:flex">
      <div className="flex h-16 shrink-0 items-center justify-center px-6">
        <div className="flex items-center justify-center cursor-pointer" onClick={handleHomeRedirection}>
          <img src={logoUrl} alt="ecommerce-logo" className="w-10 h-10 mr-2" />
          <h1 className="text-xl font-bold text-brand-600 dark:text-brand-500">
            {templateName}
          </h1>
        </div>
      </div>

      <div className="scrollbar-admin min-h-0 flex-1 overflow-auto pr-2">
        <nav className="">
          {adminNavigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "w-56 flex items-center gap-3 rounded-r-full px-5 py-2 my-1 text-sm font-medium transition-colors",
                  isActive
                    ? "text-warning-600 dark:text-brand-400 bg-warning-500/15"
                    : "text-surface-700 hover:text-surface-950 hover:bg-surface-200/70 dark:text-surface-300 dark:hover:text-surface-50 dark:hover:bg-surface-900/30",
                ].join(" ")
              }
            >
              <item.icon className="h-6 w-8" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="h-28 shrink-0 px-5 pb-5 pt-5">
        <div className="flex h-full items-center justify-between rounded-md bg-surface-100 px-3 dark:bg-surface-900">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-50">
              <UserCircle className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                {admin?.name ?? "Admin User"}
              </p>

              <p className="mt-0.5 truncate text-xs text-surface-500 dark:text-surface-400">
                {admin?.role ?? "ADMIN"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-200 hover:text-error-600 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-error-500"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
