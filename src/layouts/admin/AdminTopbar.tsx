import { Bell, LogOut, Menu, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function AdminTopbar() {
  return (
    <header className="sticky top-5 z-20 flex h-16 items-center justify-between px-4 lg:px-6 bg-surface-50 dark:bg-surface-800 rounded-md shadow-2xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-surface-700 hover:bg-surface-100 lg:hidden"
          aria-label="Open admin navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-base font-semibold">
          Admin Panel
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-surface-700 hover:bg-surface-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-surface-700 hover:bg-surface-100"
          aria-label="Admin profile"
        >
          <UserCircle className="h-5 w-5" />
        </button>

        <Button size="sm" variant="outline">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}