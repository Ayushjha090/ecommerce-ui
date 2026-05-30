import { type QueryClient } from "@tanstack/react-query";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { AxiosError } from "axios";

import { paths } from "@/config";
import { getCurrentAdmin } from "../api";
import { adminAuthKeys } from "../api/adminAuth.keys";

export const requiresAdminLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const requestPath = `${url.pathname}${url.search}`;

    try {
      await queryClient.fetchQuery({
        queryKey: adminAuthKeys.me(),
        queryFn: getCurrentAdmin,
      });

      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw redirect(paths.admin.auth.login.getHref(requestPath));
        }

        if (error.response?.status === 403) {
          throw redirect(paths.errors.unauthorized.getHref(requestPath));
        }
      }

      throw error;
    }
  };
