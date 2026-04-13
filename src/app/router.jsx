import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import { HomePage } from "../pages/HomePage";
import { ListingsPage } from "../pages/ListingsPage";
import { PropertyDetailsPage } from "../pages/PropertyDetailsPage";
import { PostPropertyPage } from "../pages/PostPropertyPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AdminPage } from "../pages/AdminPage";
import { AuthPage } from "../pages/AuthPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "listings", element: <ListingsPage /> },
      { path: "property/:id", element: <PropertyDetailsPage /> },
      { path: "post-property", element: <PostPropertyPage /> },
      { path: "auth", element: <AuthPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PortalLayout title="User Dashboard" />,
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
  {
    path: "/admin",
    element: <PortalLayout title="Admin Panel" />,
    children: [
      { index: true, element: <AdminPage /> },
    ],
  },
  {
    path: "/start",
    element: <Navigate to="/post-property" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
