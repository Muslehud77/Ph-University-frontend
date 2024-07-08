import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { AdminRoutes } from "./admin.routes";
import { FacultyRoutes } from "./faculty.routes";
import { StudentRoutes } from "./student.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
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
