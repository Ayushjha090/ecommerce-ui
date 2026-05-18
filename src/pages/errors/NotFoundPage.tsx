import { Search } from "lucide-react";
import ErrorPage from "../../components/error/ErrorPage";

export default function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Oops! Page Not Found"
      message="The page you're looking for has wandered off. Don't worry, we have plenty of amazing products waiting for you!"
      intent="brand"
      icon={Search}
      showProducts={true}
    />
  );
}
