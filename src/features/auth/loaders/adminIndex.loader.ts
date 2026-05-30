import { type QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router";
import { AxiosError } from "axios";

import { paths } from "@/config";
import { getCurrentAdmin } from "../api";
import { adminAuthKeys } from "../api/adminAuth.keys";

export const adminIndexLoader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.fetchQuery({
      queryKey: adminAuthKeys.me(),
      queryFn: getCurrentAdmin,
    });

    throw redirect(paths.admin.dashboard.getHref());
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw redirect(
          paths.admin.auth.login.getHref(paths.admin.dashboard.getHref()),
        );
      }

      if (error.response?.status === 403) {
        throw redirect(
          paths.errors.unauthorized.getHref(paths.admin.root.getHref()),
        );
      }
    }

    throw error;
  }
};
