import type { AdminUser } from "../types";

export const USER_ROLE_LABEL: Record<AdminUser["role"] | "CUSTOMER", string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};
