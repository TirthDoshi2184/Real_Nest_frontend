import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";
import { UserDashboard } from "../components/user/UserDashboard";

const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/",
      element: <h1>Hello</h1>,
      errorElement: <h1>404</h1>,
    },
    {
      path: "/user",
      element: <UserSideBar />,
      errorElement: <h1>404</h1>,
      children:[
        {
            path: "dashboard",
            element: <UserDashboard/>,
            errorElement: <h1>404</h1>,
        }
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
