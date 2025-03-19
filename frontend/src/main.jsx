import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AboutPage from "./pages/About.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DashboardCoursePage from "./pages/DashboardCoursePage.jsx";
import DashboardIndexPage from "./pages/DashboardIndexPage.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import DashboardUserPage from "./pages/DashboardUserPage.jsx";
import DashboardUsersPage from "./pages/DashboardUsersPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import Layout from "./pages/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ResetPasswordPage from "./pages/ResetConfirmationPage.jsx";
import UserSettingsPage from "./pages/UserSettingsPage.jsx";

const router = createBrowserRouter([
  {
    // Main public layout
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <PasswordResetRequestPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    // Dashboard layout
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/courses", // /dashboard
        element: <DashboardCoursePage />,
      },
      {
        path: "", // /dashboard
        element: <DashboardIndexPage />,
      },
      {
        path: "/dashboard/users", // /dashboard
        element: <DashboardUsersPage />,
      },
      {
        path: "/dashboard/users/:userId", // /dashboard
        element: <DashboardUserPage />,
      },
      {
        path: "/dashboard/settings", // /dashboard
        element: <UserSettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
