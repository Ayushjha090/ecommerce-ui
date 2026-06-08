import { Outlet } from "react-router";
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-200 text-surface-900 dark:bg-surface-900 dark:text-surface-100">
      <div className="flex min-h-dvh">
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
          <div className="sticky top-0 z-20 bg-transparent px-4 pt-4 pb-3 lg:px-6 lg:pt-5">
            <div className="mx-auto w-full max-w-7xl">
              <AdminTopbar onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
            </div>
          </div>

          <main className="flex-1 px-4 lg:px-6">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
