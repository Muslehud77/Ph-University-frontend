import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement.tsx/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement.tsx/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement.tsx/CreateStudent";
import { generateRoutes } from "../utils/routesGenerator";
import { sideNavbarItemsGenerator } from "../utils/sideNavbarItemsGenerator";

const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Dropdown",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];

export const FacultyRoutes = generateRoutes(facultyPaths);

export const FacultySidebarItems = sideNavbarItemsGenerator(facultyPaths);
