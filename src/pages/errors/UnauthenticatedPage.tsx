import { Home, LogIn, ShieldAlert } from "lucide-react";
import { useSearchParams } from "react-router";

import { paths } from "@/config";
import ErrorPage from "../../components/error/ErrorPage";

export default function UnauthenticatedPage() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const isAdminRoute = from?.startsWith(paths.admin.root.getHref()) ?? false;

  return (
    <ErrorPage
      code="401"
      title="Authentication Required"
      message="Please log in before continuing to this page."
      intent="info"
      icon={ShieldAlert}
      primaryAction={{
        label: isAdminRoute ? "Admin Login" : "Log In",
        to: isAdminRoute ? paths.admin.auth.login.getHref(from) : "/login",
        icon: LogIn,
      }}
      secondaryAction={{
        label: "Go Home",
        to: isAdminRoute ? paths.admin.root.getHref() : "/",
        icon: Home,
      }}
    />
  );
}
