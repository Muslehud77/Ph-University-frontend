import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllStudents from "../pages/admin/userManagement.tsx/AllStudents";
import CreateAdmin from "../pages/admin/userManagement.tsx/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement.tsx/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement.tsx/CreateStudent";
import StudentDetail from "../pages/admin/userManagement.tsx/StudentDetail";
import { generateRoutes } from "../utils/routesGenerator";
import { sideNavbarItemsGenerator } from "../utils/sideNavbarItemsGenerator";

const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "/admin/academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Semester",
        path: "/admin/create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "/admin/academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Faculty",
        path: "/admin/create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "/admin/academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create A. Department",
        path: "/admin/create-academic-department",
        element: <CreateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "All Students",
        path: "/admin/students",
        element: <AllStudents />,
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: <CreateStudent />,
      },
      {
        path: "/admin/student-data/:studentId",
        element: <StudentDetail />,
      },
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];

export const AdminRoutes = generateRoutes(adminPaths);

export const AdminSidebarItems = sideNavbarItemsGenerator(adminPaths);
