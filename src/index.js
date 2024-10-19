import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./store/store"; // Import the Redux store
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./protectedRoutes/userProtected"; // Import the PrivateRoute component
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CourseDetials from "./pages/CourseDetials";
import CategoryCourse from "./pages/CategoryCourse";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Teacher from "./pages/Teacher";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Logout from "./pages/Logout";
import TeacherPosts from "./pages/TeacherPosts";
import Dashboard from "./pages/Dashboard";
import DragAndDrop from "./pages/DragAndDrop";
import PricePage from "./pages/PricePage";
import DashboardPage from "./pages/admin/dashboardPage";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import VideocallManagement from "./pages/admin/VideocallManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import IntroductionPage from './IntroductionPage/IntroductionPage'
import AdminLogin from "./pages/admin/AdminLogin";
import BuyedCourses from './pages/BuyedCourses';
import AdminProtectedRoutes from "./protectedRoutes/adminProtectedRoutes";
import RoomPage from './RoomPage/RoomPage'
import JoinRoom from './JoinRoomPage/JoinRoomPage'



const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Layout: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "course/:id",
        element: (
          <PrivateRoute>
            <CourseDetials />
          </PrivateRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "profile/:id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "teacher",
        element: (
          <PrivateRoute>
            <Teacher />
          </PrivateRoute>
        ),
      },
      {
        path: "create",
        element: (
          <PrivateRoute>
            <CreateCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "course/categories/:category",
        element: (
          <PrivateRoute>
            <CategoryCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "mycourse/:id",
        element: (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        ),
      },
      {
        path: "course/users/:id",
        element: (
          <PrivateRoute>
            <TeacherPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "course/:id/edit",
        element: (
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        ),
      },
      { path: "logout", element: <Logout /> },
      {
        path: "drag",
        element: (
          <PrivateRoute>
            <DragAndDrop />
          </PrivateRoute>
        ),
      },
      {
        path: "purchase/:id",
        element: (
          <PrivateRoute>
            <PricePage />
          </PrivateRoute>
        ),
      },
     
      {
        path: "buyedCourses/:id",
        element: (
          <PrivateRoute>
            <BuyedCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/login",
        element: (
          <PrivateRoute>
            <AdminLogin />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/login",
        element: (
         
            <AdminLogin />
       
        ),
      },
      {
        path: "admin",
        element: (
          <AdminProtectedRoutes>
            <DashboardPage />{" "}
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "admin/userManagement",
        element: (
          <AdminProtectedRoutes>
            <UserManagement />{" "}
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "admin/courseManagement",
        element: (
          <AdminProtectedRoutes>
            <CourseManagement />{" "}
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "admin/videocallManagement",
        element: (
          <AdminProtectedRoutes>
            <VideocallManagement />{" "}
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "admin/categoryManagement",
        element: (
          <AdminProtectedRoutes>
            <CategoryManagement />
          </AdminProtectedRoutes>
        ),
      },
      {
        path: "introduction",
        element: (
          
            <IntroductionPage />
      
        ),
      },
      {
        path: "room",
        element: (
          
            <RoomPage />
      
        ),
      },
      {
        path: "join-room",
        element: (
          
            <JoinRoom />
      
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
