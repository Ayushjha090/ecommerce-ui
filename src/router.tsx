import { createBrowserRouter, type RouteObject } from "react-router";

// Admin pages
import Login from "./pages/admin/auth/Login";

import Home from "./components/Home";
import ThemeDemo from "./ThemeDemo";

// Error pages
import NotFoundPage from "./pages/errors/NotFoundPage";
import InternalServerErrorPage from "./pages/errors/InternalServerErrorPage";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";
import MaintenancePage from "./pages/errors/MaintenancePage";
import WorkInProgressPage from "./pages/errors/WorkInProgressPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
];

// Conditionally add routes
if (import.meta.env.DEV) {
  routes.push(
    { path: "/theme-demo", element: <ThemeDemo /> },
    // Add these temporary dev routes!
    { path: "/test-500", element: <InternalServerErrorPage /> },
    { path: "/test-401", element: <UnauthorizedPage /> },
    { path: "/test-maintenance", element: <MaintenancePage /> },
    { path: "/test-wip", element: <WorkInProgressPage /> },
  );
}

// Add the Catch-All route for bad URLs at the very end
routes.push({
  path: "*",
  element: <NotFoundPage />,
});

export const router = createBrowserRouter(routes);
