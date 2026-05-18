import { createBrowserRouter, type RouteObject } from "react-router";
import Home from "./components/Home";
import ThemeDemo from "./ThemeDemo";
import RouteErrorPage from "./pages/errors/RouteErrorPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import InternalServerErrorPage from "./pages/errors/InternalServerErrorPage";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";
import MaintenancePage from "./pages/errors/MaintenancePage";
import WorkInProgressPage from "./pages/errors/WorkInProgressPage";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
    errorElement: <RouteErrorPage />,
  },
];

// Conditionally add routes
if (import.meta.env.DEV) {
  routes.push(
    { path: "/theme-demo", Component: ThemeDemo },
    // Add these temporary dev routes!
    { path: "/test-500", Component: InternalServerErrorPage },
    { path: "/test-401", Component: UnauthorizedPage },
    { path: "/test-maintenance", Component: MaintenancePage },
    { path: "/test-wip", Component: WorkInProgressPage },
  );
}

// Add the Catch-All route for bad URLs at the very end
routes.push({
  path: "*",
  element: <NotFoundPage />,
});

export const router = createBrowserRouter(routes);
