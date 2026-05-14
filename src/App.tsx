import { createBrowserRouter, RouterProvider } from "react-router";

import ThemeDemo from "./ThemeDemo";

function Root() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Hello World!</h1>
      {import.meta.env.DEV && (
        <a href="/theme-demo" className="text-brand-600 hover:underline">
          Go to Theme Demo &rarr;
        </a>
      )}
    </div>
  );
}

const routes = [
  {
    path: "/",
    Component: Root,
  },
];

// Only add the ThemeDemo route if running in development mode
if (import.meta.env.DEV) {
  routes.push({
    path: "/theme-demo",
    Component: ThemeDemo,
  });
}

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
