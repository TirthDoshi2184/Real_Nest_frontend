import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";
import { UserDashboard } from "../components/user/UserDashboard";
import UserLogin from "../components/user/UserLogin";
import UserSignup from "../components/user/UserSignup";
import { SellerDashboard } from "../components/Dashboard/SellerDashboard";
import { BuyerDashboard } from "../components/Dashboard/BuyerDashboard";
import AddProperty from "../components/Main_pages/AddFlat";
import PropertyDetail from "../components/Main_pages/PropertyDetail";
import HomePage from "../components/Main_pages/Home";
// import { ContactOwner } from "../components/Property/ContactOwner";
// import {AdminDashboard} from "../components/Dashboard/AdminDashboard";
import Flatproperty from "../components/Property/Flatproperty";
import ShopProperty from "../components/Property/Shopproperty";
import PlotsProperty from "../components/Property/Plotsproperty";
import PropertyTypeSelection from "../components/Main_pages/PropertyTypeSelection";
import AddFlat from "../components/Main_pages/AddFlat";
import AddShop from "../components/Main_pages/AddShop";
import AboutPage from "../components/Main_pages/AboutUs";
import { Error } from "@mui/icons-material";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import FlatForm from "../components/Main_pages/FlatForm";
import ShopForm from "../components/Main_pages/ShopForm";
import BunglowDisplay from "../components/Property/BunglowProperty";
import BunglowDetail from "../components/Main_pages/BunglowDetail";
import AddBungalow from "../components/Main_pages/AddBunglow";
import ProfilePage from "../components/Main_pages/ProfilePage";
import MyProperties from "../components/Main_pages/MyProperties";


const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/signup",
      element: <UserSignup />,
      errorElement: <h1>UserSignin Error 404</h1>
    },
    {
      path: "/listproperty",
      element:<Flatproperty/>,
      errorElement:<h1>List Property 404</h1>
    },
    {
      path:"/shopproperty",
      element:<ShopProperty/>,
      errorElement:<h1>Shops Property 404</h1>
    },
    {
      path:"/plotproperty",
      element:<PlotsProperty/>,
      errorElement:<h1>Plots Property 404</h1>
    },
    {
      path:"/bunglowproperty",
      element:<BunglowDisplay/>,
      errorElement:<h1>Bunglow Property 404</h1>

    },
    {
      path: "/pdetail/:id",
      element: <PropertyDetail />,
      errorElement: <h1>PropertyDetail Error 404</h1>
    },
    {
      path:"/bunglow/:id",
      element:<BunglowDetail/>,
      errorElement: <h1>BunglowDetail Error 404</h1>

    },
    {
      path:"/",
      element:<AboutPage/>,
      errorElement: Error
      
    },
    {
      path: "/login",
      element: <UserLogin />,
      errorElement: <h1>UserLogin Error 404</h1>,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
      errorElement: <h1>Profile Page Error 404</h1>,
    },
    {
      path:"/home",
      element:<HomePage/>,
      errorElement: <h1>Home page not found</h1>
    },
    {
      path: "/addproperty", // Main property type selection page
      element: <PropertyTypeSelection />,
      errorElement: <h1>Add Property Error 404</h1>
    },
    {
      path: "/addproperty/flat", // Route for adding a flat
      element: <AddFlat />,
      errorElement: <h1>Add Flat Error 404</h1>
    },
    {
      path: "/addproperty/shop", // Route for adding a shop
      element: <AddShop/>,
      errorElement: <h1>Add Shop Error 404</h1>
    },
    {
      path: "/addproperty/bunglow", // Route for adding a plot
      element: <AddBungalow />,
      errorElement: <h1>Add Plot Error 404</h1>
    },
    {
      path:"/MyProperties",
      element:<MyProperties/>,
      errorElement:<h1>404</h1>
    },
        {
          path: "/dashboard",
          element: <UserDashboard />,
          errorElement: <h1>404</h1>,
        },
        {
          path: "/sellerdashboard",
          element:<SellerDashboard/>,
          errorElement:<h1>404</h1>
        },
        {
          path: "/buyerdashboard",
          element:<BuyerDashboard/>,
          errorElement:<h1>404</h1>
        },
        {
          path: "admindashboard",
          element:<AdminDashboard/>,
          errorElement:<h1>404</h1>
        }

      ]);
  return (
    <React.Fragment>
      <RouterProvider router={routesData}>{children}</RouterProvider>
    </React.Fragment>
  );
};

export default MainRouter;
