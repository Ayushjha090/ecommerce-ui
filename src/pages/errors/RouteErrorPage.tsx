import { useRouteError, isRouteErrorResponse } from "react-router";
import NotFoundPage from "./NotFoundPage";
import InternalServerErrorPage from "./InternalServerErrorPage";
import UnauthenticatedPage from "./UnauthenticatedPage";
import UnauthorizedPage from "./UnauthorizedPage";

export default function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <UnauthenticatedPage />;
    }
    if (error.status === 403) {
      return <UnauthorizedPage />;
    }
    if (error.status === 404) {
      return <NotFoundPage />;
    }
    if (error.status === 500) {
      return <InternalServerErrorPage />;
    }
  }

  // Fallback for any other errors
  return <InternalServerErrorPage />;
}
