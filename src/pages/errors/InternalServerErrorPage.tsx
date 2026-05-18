import { AlertCircle, RefreshCw, HelpCircle } from "lucide-react";
import ErrorPage from "../../components/error/ErrorPage";

export default function InternalServerErrorPage() {
  return (
    <ErrorPage
      code="500"
      title="Internal Server Error"
      message="We're experiencing some technical difficulties on our end. Our team has been notified and is working on it."
      intent="error"
      icon={AlertCircle}
      primaryAction={{
        label: "Try Again",
        to: "/",
        icon: RefreshCw
      }}
      secondaryAction={{
        label: "Get Support",
        to: "/support",
        icon: HelpCircle
      }}
    />
  );
}
