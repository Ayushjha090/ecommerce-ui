import type { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

function Root() {
  return <h1 className="text-3xl font-bold">Hello World!</h1>;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
