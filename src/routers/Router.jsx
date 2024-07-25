import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";
import { UserDashboard } from "../components/user/UserDashboard";
import UserLogin from "../components/user/UserLogin";
import UserSignup from "../components/user/UserSignup";
import { SellerDashboard } from "../components/Dashboard/SellerDashboard";
import { BuyerDashboard } from "../components/Dashboard/BuyerDashboard";
import AddProperty from "../components/Property/AddProperty";
import  ListProperty  from "../components/Property/ListProperty";

const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/signup",
      element: <UserSignup />,
      errorElement: <h1>Login Error 404</h1>
    },
    {
      path: "/",
      element:<ListProperty/>,
      errorElement:<h1>404</h1>
    },
    {
      path: "/login",
      element: <UserLogin />,
      errorElement: <h1>Login Error 404</h1>,
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
        {
          path: "/user/addproperty",
          element:<AddProperty/>,
          errorElement:<h1>404</h1>
        },
        {
          path: "sellerdashboard",
          element:<SellerDashboard/>,
          errorElement:<h1>404</h1>
        },
        {
          path: "buyerdashboard",
          element:<BuyerDashboard/>,
          errorElement:<h1>404</h1>
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
