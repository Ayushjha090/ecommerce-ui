import { Outlet } from "react-router";
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-200 dark:bg-surface-900 text-surface-900 dark:text-surface-100">
      <div className="flex min-h-screen">
        {isMobileSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 animate-[adminBackdropFade_180ms_ease-out] bg-surface-900/60 backdrop-blur-sm lg:hidden"
            aria-label="Close admin navigation"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <AdminSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

          <main className="flex-1 px-6 py-6">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
