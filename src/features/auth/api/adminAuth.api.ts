import { adminAxios } from "@/lib/axios/adminAxios";

import type { LoginFormValues as AdminLoginPayload } from "../schema/admin/login.schema";
import type { AdminLoginResponse, AdminMeResponse } from "../types";

export const adminLogin = async (payload: AdminLoginPayload) => {
  const response = await adminAxios.post<AdminLoginResponse>(
    "/admins/login",
    payload,
  );

  return response?.data?.data ?? {};
};

export const getCurrentAdmin = async () => {
  const response = await adminAxios.get<AdminMeResponse>("/admins/me", {
    requiresAuth: true,
  });

  return response?.data?.data ?? {};
};

export const adminLogout = async () => {
  await adminAxios.post("/admins/logout", {}, { requiresAuth: true });
};
