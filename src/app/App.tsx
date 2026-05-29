import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query/react-query";
import { AppRouter } from "@/app/router";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
