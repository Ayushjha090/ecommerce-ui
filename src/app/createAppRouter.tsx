import { type QueryClient } from "@tanstack/react-query";
import { type ComponentType } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";

import { paths } from "@/config";

type ClientLoader = NonNullable<RouteObject["loader"]>;
type ClientAction = NonNullable<RouteObject["action"]>;

type LazyRouteModule = {
  default: ComponentType;
  clientAction?: (queryClient: QueryClient) => ClientAction;
  clientLoader?: (queryClient: QueryClient) => ClientLoader;
};

const convert = (queryClient: QueryClient) => (module: LazyRouteModule) => {
  const { clientAction, clientLoader, default: Component } = module;

  return {
    Component,
    ...(clientAction ? { action: clientAction(queryClient) } : {}),
    ...(clientLoader ? { loader: clientLoader(queryClient) } : {}),
  };
};

export const createAppRouter = (queryClient: QueryClient) => {
  const routes: RouteObject[] = [
    {
      path: paths.home.path,
      lazy: () => import("../components/Home").then(convert(queryClient)),
    },
    {
      path: paths.admin.root.path,
      children: [
        {
          path: paths.admin.auth.login.path,
          lazy: () =>
            import("../pages/admin/auth/Login").then(convert(queryClient)),
        },
        {
          path: paths.admin.dashboard.path,
          lazy: () =>
            import("../pages/admin/dashboard").then(convert(queryClient)),
        },
      ],
    },
  ];

  if (import.meta.env.DEV) {
    routes.push(
      {
        path: paths.dev.themeDemo.path,
        lazy: () => import("../ThemeDemo").then(convert(queryClient)),
      },
      {
        path: paths.dev.internalServerError.path,
        lazy: () =>
          import("../pages/errors/InternalServerErrorPage").then(
            convert(queryClient),
          ),
      },
      {
        path: paths.dev.unauthorized.path,
        lazy: () =>
          import("../pages/errors/UnauthorizedPage").then(convert(queryClient)),
      },
      {
        path: paths.dev.maintenance.path,
        lazy: () =>
          import("../pages/errors/MaintenancePage").then(convert(queryClient)),
      },
      {
        path: paths.dev.workInProgress.path,
        lazy: () =>
          import("../pages/errors/WorkInProgressPage").then(
            convert(queryClient),
          ),
      },
    );
  }

  routes.push({
    path: paths.notFound.path,
    lazy: () => import("../pages/errors/NotFoundPage").then(convert(queryClient)),
  });

  return createBrowserRouter(routes);
};
