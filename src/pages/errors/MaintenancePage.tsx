import { Wrench, RefreshCw, Home } from "lucide-react";
import ErrorPage from "../../components/error/ErrorPage";

export default function MaintenancePage() {
  return (
    <ErrorPage
      title="Under Maintenance"
      message="We are currently performing scheduled maintenance to improve your experience. We'll be back shortly!"
      intent="info"
      icon={Wrench}
      primaryAction={{
        label: "Refresh Page",
        to: ".",
        icon: RefreshCw
      }}
      secondaryAction={{
        label: "Go Home",
        to: "/",
        icon: Home
      }}
    />
  );
}
