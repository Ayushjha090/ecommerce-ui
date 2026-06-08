export type DashboardProductImage = {
  id?: number;
  url: string;
  isPrimary?: boolean;
  productId?: number;
};

export type DashboardCategory = {
  id: number;
  name: string;
  parentId?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type DashboardProduct = {
  id: number;
  name: string;
  description?: string | null;
  price: string | number;
  isActive: boolean;
  categoryId: number;
  category?: {
    name: string;
  };
  images?: DashboardProductImage[];
  createdAt?: string;
  updatedAt?: string;
};

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiCollectionResponse<TData> = {
  error: boolean;
  message: string;
  data: TData;
  meta?: ApiMeta;
};

export type AdminDashboardStat = {
  label: string;
  value: number;
  description: string;
  tone: "brand" | "success" | "warning" | "info";
};
