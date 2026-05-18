import { HardHat, Home, ShoppingBag } from "lucide-react";
import ErrorPage from "../../components/error/ErrorPage";

export default function WorkInProgressPage() {
  return (
    <ErrorPage
      title="Work In Progress"
      message="This feature is currently under construction. Check back later for updates!"
      intent="accent"
      icon={HardHat}
      primaryAction={{
        label: "Back to Home",
        to: "/",
        icon: Home
      }}
      secondaryAction={{
        label: "Browse Products",
        to: "/products",
        icon: ShoppingBag
      }}
    />
  );
}
