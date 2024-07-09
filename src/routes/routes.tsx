import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Register from "../pages/Register";

import { AdminRoutes } from "./admin.routes";
import { FacultyRoutes } from "./faculty.routes";
import { StudentRoutes } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: AdminRoutes,
  },
  {
    path: "/faculty",
    element: <App />,
    children: FacultyRoutes,
  },
  {
    path: "/student",
    element: <App />,
    children: StudentRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
