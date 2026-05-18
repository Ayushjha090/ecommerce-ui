import { Lock, LogIn, Home } from "lucide-react";
import ErrorPage from "../../components/error/ErrorPage";

export default function UnauthorizedPage() {
  return (
    <ErrorPage
      code="401"
      title="Access Denied"
      message="You don't have permission to access this page. Please log in with an authorized account."
      intent="warning"
      icon={Lock}
      primaryAction={{
        label: "Log In",
        to: "/login",
        icon: LogIn
      }}
      secondaryAction={{
        label: "Go Home",
        to: "/",
        icon: Home
      }}
    />
  );
}
