import { type QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router";

import { paths } from "@/config";
import { getCurrentAdmin } from "../api/adminAuth.api";
import { adminAuthKeys } from "../api/adminAuth.keys";

export const adminLoginLoader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.fetchQuery({
      queryKey: adminAuthKeys.me(),
      queryFn: getCurrentAdmin,
    });

    throw redirect(paths.admin.dashboard.getHref());
  } catch {
    return null;
  }
};