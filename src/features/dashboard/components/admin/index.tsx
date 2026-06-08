import { RefreshCw } from "lucide-react";
import { type FC } from "react";

import { Button } from "@/components/ui/Button";
import AdminPageHeader from "@/layouts/admin/AdminPageHeader";

import { useAdminDashboard } from "../../hooks/useAdminDashboard";

import { AdminCategoryOverview } from "./AdminCategoryOverview";
import { AdminDashboardQuickActions } from "./AdminDashboardQuickActions";
import { AdminDashboardStatGrid } from "./AdminDashboardStatGrid";
import { AdminLatestProducts } from "./AdminLatestProducts";

const AdminDashboard: FC = () => {
  const { stats, latestProducts, categories, isLoading, isError, refetch } =
    useAdminDashboard();

  return (
    <div className="w-full space-y-6 py-2">
      <AdminPageHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
        actions={
          <Button
            variant="primary"
            onClick={refetch}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            className="shrink-0"
          >
            Refresh
          </Button>
        }
      />

      {isError && (
        <div className="rounded-md border border-error-500/30 bg-error-50 px-4 py-3 text-sm font-medium text-error-600 dark:bg-error-500/10 dark:text-error-500">
          Could not load dashboard data.
        </div>
      )}

      <AdminDashboardStatGrid stats={stats} isLoading={isLoading} />

      <AdminDashboardQuickActions />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.8fr)]">
        <AdminLatestProducts products={latestProducts} isLoading={isLoading} />
        <AdminCategoryOverview categories={categories} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AdminDashboard;
