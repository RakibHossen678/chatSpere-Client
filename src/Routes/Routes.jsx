import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PostsDetails from "../Components/PostsDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Addpost from "../pages/Dashboard/Addpost";
import MyPost from "../pages/Dashboard/MyPost";
import Payment from "../pages/Payment";
import Comments from "../Components/Dashboard/Comments";
import Profile from "../pages/Dashboard/Profile";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ReportedComments from "../pages/Dashboard/ReportedComments";
import Announcement from "../pages/Dashboard/Announcement";

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
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "comments/:postId",
        element: (
          <PrivateRoute>
            <Comments></Comments>
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "addPost",
        element: (
          <PrivateRoute>
            <Addpost></Addpost>
          </PrivateRoute>
        ),
      },
      {
        path: "myPost",
        element: (
          <PrivateRoute>
            <MyPost></MyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "reported-comment",
        element: (
          <PrivateRoute>
            <ReportedComments></ReportedComments>
          </PrivateRoute>
        ),
      },
      {
        path: "announcement",
        element: (
          <PrivateRoute>
            <Announcement></Announcement>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
