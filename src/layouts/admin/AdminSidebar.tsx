import { ChevronLeft, ChevronRight, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate, useLocation } from "react-router";

import { adminLogout } from "@/features/auth/api";
import { adminAuthKeys } from "@/features/auth/api/adminAuth.keys";
import { removeAccessToken } from "@/lib/storage/tokenStorage";
import { paths, themeConfig } from "@/config";
import { adminNavigationItems } from "./adminNavigation.config";
import type { AdminUser } from "@/features/auth/types";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    if (
      currentPathName &&
      currentPathName === paths.admin.dashboard.getHref()
    ) {
      return;
    }

    navigate(paths.admin.dashboard.getHref());
  };

  return (
    <aside
      className={[
        "relative m-5 hidden h-[calc(100dvh-2.5rem)] min-h-80 shrink-0 flex-col rounded-md bg-surface-50 shadow-2xl transition-[width] duration-300 dark:bg-surface-800 lg:sticky lg:top-5 lg:flex",
        isCollapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed((current) => !current)}
        className="absolute right-0 top-5 z-20 flex translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-surface-200 p-1.5 transition-colors dark:bg-surface-900"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600">
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600">
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
        )}
      </button>

      <div className="flex h-16 shrink-0 items-center justify-center px-4">
        <div
          className="flex cursor-pointer items-center justify-center"
          onClick={handleHomeRedirection}
        >
          <img
            src={logoUrl}
            alt="ecommerce-logo"
            className={["h-10 w-10 shrink-0", isCollapsed ? "" : "mr-2"].join(
              " ",
            )}
          />
          <h1
            className={[
              "truncate text-xl font-bold text-brand-600 transition-opacity dark:text-brand-500",
              isCollapsed ? "hidden" : "block",
            ].join(" ")}
          >
            {templateName}
          </h1>
        </div>
      </div>

      <div className="scrollbar-admin min-h-0 flex-1 overflow-auto pr-2">
        <nav className={["space-y-1", isCollapsed ? "px-3" : "px-4"].join(" ")}>
          {adminNavigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  "flex h-11 items-center rounded-lg text-sm font-medium transition-colors",
                  isCollapsed
                    ? "relative w-11 justify-center px-0"
                    : "relative w-full justify-start gap-3 px-4",
                  isActive
                    ? "bg-brand-500 text-brand-50 after:absolute after:-right-6 after:top-0 after:bottom-0 after:w-1 after:rounded-l-full after:bg-brand-500 dark:bg-brand-500 dark:text-brand-50"
                    : "text-surface-700 hover:text-surface-950 hover:bg-surface-200/70 dark:text-surface-300 dark:hover:text-surface-50 dark:hover:bg-surface-900/30",
                ].join(" ")
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={["shrink-0", isCollapsed ? "px-3 py-4" : "px-5 py-5"].join(
          " ",
        )}
      >
        <div
          className={[
            "flex rounded-md bg-surface-100 dark:bg-surface-900",
            isCollapsed
              ? "min-h-20 flex-col items-center justify-center gap-2 px-0 py-2"
              : "min-h-16 items-center justify-between gap-3 px-3 py-2",
          ].join(" ")}
        >
          <div
            className={[
              "flex min-w-0 items-center",
              isCollapsed ? "justify-center" : "gap-3",
            ].join(" ")}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-50">
              <UserCircle className="h-6 w-6" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                  {admin?.name ?? "Admin User"}
                </p>

                <p className="mt-0.5 truncate text-xs text-surface-500 dark:text-surface-400">
                  {admin?.role ?? "ADMIN"}
                </p>
              </div>
            )}
          </div>

          {isCollapsed ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-200 hover:text-error-600 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-error-500"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-200 hover:text-error-600 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-error-500"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
