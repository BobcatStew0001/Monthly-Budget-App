import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Income } from "./pages/Income";
import { Expenses } from "./pages/Expenses";
import { Savings } from "./pages/Savings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: "income", Component: Income },
      { path: "expenses", Component: Expenses },
      { path: "savings", Component: Savings },
    ],
  },
]);
