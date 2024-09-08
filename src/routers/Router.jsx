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
import PropertyDetail from "../components/Property/PropertyDetail";
<<<<<<< HEAD
// import { ContactOwner } from "../components/Property/ContactOwner";
=======
import { ContactOwner } from "../components/Property/ContactOwner";
import { Amenities } from "../components/Amenities";
>>>>>>> 09acf18a6f587d6b15934f0ed8c5536fb9f0f6c7


const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/signup",
      element: <UserSignup />,
      errorElement: <h1>UserSignin Error 404</h1>
    },
    {
      path: "/",
      element:<ListProperty/>,
      errorElement:<h1>List Property 404</h1>
    },
    {
      path: "/pdetail/:id",
      element: <PropertyDetail />,
      errorElement: <h1>PropertyDetail Error 404</h1>
    },
    {
      path: "/login",
      element: <UserLogin />,
      errorElement: <h1>UserLogin Error 404</h1>,
    },
    {
<<<<<<< HEAD
=======
      path: "/cntowner",
      element:<ContactOwner/>,
      errorElement: <h1>Owner Error</h1>,
    },
    {
      path: "/amenities",
      element:<Amenities/>,
      errorElement: <h1>Ameniites  Error</h1>,
    },
    {
>>>>>>> 09acf18a6f587d6b15934f0ed8c5536fb9f0f6c7
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
