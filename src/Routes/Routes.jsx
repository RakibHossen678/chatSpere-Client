import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PostsDetails from "../Components/PostsDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import Addpost from "../pages/Dashboard/Addpost";
import MyPost from "../pages/Dashboard/MyPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/post/:id",
        element: <PostsDetails></PostsDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addPost",
        element: <Addpost></Addpost>,
      },
      {
        path: "myPost",
        element: <MyPost></MyPost>,
      },
    ],
  },
]);
export default router;
