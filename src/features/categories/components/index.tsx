import { type FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import AdminPageHeader from "@/layouts/admin/AdminPageHeader";

import { getCategories } from "../api/categories.api";
import { categoriesKey } from "../api/categories.key";

const CategoriesDashboard: FC = () => {
  const categoriesQuery = useQuery({
    queryKey: categoriesKey.list(),
    queryFn: getCategories,
  });

  const categories = categoriesQuery.data ?? [];

  return (
    <div className="w-full space-y-6 py-2">
      <AdminPageHeader
        title="Categories"
        breadcrumbs={[{ label: "Admin" }, { label: "Categories" }]}
        actions={
          <Button
            variant="primary"
            onClick={() => {}}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            className="shrink-0"
          >
            Refresh
          </Button>
        }
      />

      {categoriesQuery.isError && (
        <p className="text-sm text-error-500">Failed to load categories.</p>
      )}

      <div>
        {categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
