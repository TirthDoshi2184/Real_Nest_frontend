import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";
import { UserDashboard } from "../components/user/UserDashboard";
import UserLogin from "../components/user/UserLogin";
import UserSignup from "../components/user/UserSignup";

const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/",
      element: <UserSignup />,
      errorElement: <h1>Login Error 404</h1>
    },
    {
      path: "/login",
      element: <UserLogin />,
      errorElement: <h1>Login Error 404</h1>
    },
    {
      path: "user",
      element: <UserSideBar />,
      errorElement: <h1>404</h1>,
      children: [
        {
          path: "dashboard",
          element: <UserDashboard />,
          errorElement: <h1>404</h1>,
        },

      ]
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={routesData}>{children}</RouterProvider>
    </React.Fragment>
  );
};

export default MainRouter;
