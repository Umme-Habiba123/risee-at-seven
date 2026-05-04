import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children :[
      {
        index:true,
        Component: home
      }
    ]
  },
]);