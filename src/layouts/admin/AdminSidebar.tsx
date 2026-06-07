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

type AdminSidebarProps = {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function AdminSidebar({
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logoUrl, templateName } = themeConfig;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const admin = queryClient.getQueryData<AdminUser>(adminAuthKeys.me());
  const isSidebarCollapsed = !isMobileOpen && isCollapsed;

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
    onMobileClose?.();
  };

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-40 m-0 flex h-dvh min-h-0 w-64 shrink-0 transform-gpu flex-col rounded-r-md bg-surface-50 shadow-2xl transition-[transform,opacity,width] duration-300 ease-out dark:bg-surface-800 lg:sticky lg:top-5 lg:z-auto lg:m-5 lg:h-[calc(100dvh-2.5rem)] lg:min-h-80 lg:rounded-md lg:opacity-100",
        isMobileOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 lg:translate-x-0",
        isSidebarCollapsed ? "lg:w-20" : "lg:w-64",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed((current) => !current)}
        className="absolute right-0 top-5 z-20 hidden translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-surface-200 p-1.5 transition-colors dark:bg-surface-900 lg:flex"
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? (
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
            className={[
              "h-10 w-10 shrink-0",
              isSidebarCollapsed ? "" : "mr-2",
            ].join(" ")}
          />
          <h1
            className={[
              "truncate text-xl font-bold text-brand-600 transition-opacity dark:text-brand-500",
              isSidebarCollapsed ? "hidden" : "block",
            ].join(" ")}
          >
            {templateName}
          </h1>
        </div>
      </div>

      <div className="scrollbar-admin min-h-0 flex-1 overflow-auto pr-2">
        <nav
          className={[
            "space-y-1",
            isSidebarCollapsed ? "px-3" : "px-4",
          ].join(" ")}
        >
          {adminNavigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={isSidebarCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  "flex h-11 items-center rounded-lg text-sm font-medium transition-colors",
                  isSidebarCollapsed
                    ? "relative lg:w-11 lg:justify-center lg:px-0"
                    : "relative w-full justify-start gap-3 px-4",
                  isActive
                    ? "bg-brand-500 text-brand-50 after:absolute after:-right-6 after:top-0 after:bottom-0 after:w-1 after:rounded-l-full after:bg-brand-500 dark:bg-brand-500 dark:text-brand-50"
                    : "text-surface-700 hover:text-surface-950 hover:bg-surface-200/70 dark:text-surface-300 dark:hover:text-surface-50 dark:hover:bg-surface-900/30",
                ].join(" ")
              }
              onClick={onMobileClose}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={[
          "shrink-0",
          isSidebarCollapsed ? "px-3 py-4" : "px-5 py-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex rounded-md bg-surface-100 dark:bg-surface-900",
            isSidebarCollapsed
              ? "min-h-20 flex-col items-center justify-center gap-2 px-0 py-2"
              : "min-h-16 items-center justify-between gap-3 px-3 py-2",
          ].join(" ")}
        >
          <div
            className={[
              "flex min-w-0 items-center",
              isSidebarCollapsed ? "justify-center" : "gap-3",
            ].join(" ")}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-50">
              <UserCircle className="h-6 w-6" />
            </div>

            {!isSidebarCollapsed && (
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

          {isSidebarCollapsed ? (
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
