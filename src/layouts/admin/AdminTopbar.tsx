import {
  LogOut,
  Mail,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { paths } from "@/config";
import { adminLogout } from "@/features/auth/api";
import { adminAuthKeys } from "@/features/auth/api/adminAuth.keys";
import type { AdminUser } from "@/features/auth/types";
import { removeAccessToken } from "@/lib/storage/tokenStorage";
import { USER_ROLE_LABEL } from "@/features/auth/constants/userRole.constants";
import { useTheme } from "@/hooks/useTheme";

type DropdownItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  onClick: () => void;
};

type AdminTopbarProps = {
  onOpenSidebar?: () => void;
};

export default function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const admin = queryClient.getQueryData<AdminUser>(adminAuthKeys.me());
  const adminRoleLabel = admin?.role ? USER_ROLE_LABEL[admin.role] : "Admin";
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

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

  const dropdownItems: DropdownItem[] = [
    {
      label: "My Profile",
      description: "Account settings",
      icon: WalletCards,
      iconClassName: "bg-info-500/15 text-info-500",
      onClick: () => setIsProfileOpen(false),
    },
  ];

  return (
    <header className="flex h-16 items-center justify-between rounded-md bg-surface-50/90 px-4 shadow-soft backdrop-blur-md backdrop-saturate-150 dark:bg-surface-800/85 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-900 lg:hidden"
          aria-label="Open admin navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3 text-surface-500 dark:text-surface-400">
          <Search className="h-5 w-5 shrink-0" />
          <input
            type="search"
            placeholder="Search [CTRL + K]"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-surface-900 outline-none placeholder:text-surface-500 dark:text-surface-50 dark:placeholder:text-surface-400"
            aria-label="Search admin"
          />
        </div>
      </div>

      <div
        className="relative flex shrink-0 items-center gap-2"
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-950 dark:text-surface-300 dark:hover:bg-surface-900 dark:hover:text-surface-50"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Enable notifications later and re-add Bell to the lucide-react import.
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-950 dark:text-surface-300 dark:hover:bg-surface-900 dark:hover:text-surface-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500" />
        </button>
        */}

        <button
          type="button"
          onClick={() => setIsProfileOpen((current) => !current)}
          className="inline-flex min-w-0 cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-surface-100 dark:hover:bg-surface-900"
          aria-label="Admin profile"
          aria-expanded={isProfileOpen}
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-50">
            <UserCircle className="h-7 w-7" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-surface-50 bg-success-500 dark:border-surface-800" />
          </span>

          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
              {admin?.name ?? "Admin User"}
            </span>
            <span className="mt-0.5 block truncate text-xs text-surface-500 dark:text-surface-400">
              {adminRoleLabel}
            </span>
          </span>
        </button>

        {isProfileOpen && (
          <div className="fixed left-1/2 top-20 w-[calc(100vw-2rem)] max-w-88 -translate-x-1/2 overflow-hidden rounded-lg bg-surface-50 p-5 shadow-soft dark:bg-surface-900 sm:absolute sm:right-0 sm:left-auto sm:top-12 sm:w-88 sm:max-w-none sm:translate-x-0">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">
              User Profile
            </h2>

            <div className="mt-5 flex items-center gap-5 border-b border-surface-200 pb-5 dark:border-surface-800">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface-200 text-brand-600 dark:bg-surface-800 dark:text-brand-400">
                <UserCircle className="h-14 w-14" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-surface-900 dark:text-surface-50">
                  {admin?.name ?? "Admin User"}
                </p>
                <p className="mt-0.5 truncate text-sm text-surface-500 dark:text-surface-400">
                  {adminRoleLabel}
                </p>
                <p className="mt-1 flex min-w-0 items-center gap-2 truncate text-sm text-surface-500 dark:text-surface-400">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {admin?.email ?? "admin@example.com"}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4 py-6">
              {dropdownItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-md text-left transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  <span
                    className={[
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
                      item.iconClassName,
                    ].join(" ")}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-surface-900 dark:text-surface-50">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-surface-500 dark:text-surface-400">
                      {item.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-info-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-info-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
