import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import AdminDetail from "../pages/admin/userManagement.tsx/AdminDetail";
import AllAdmins from "../pages/admin/userManagement.tsx/AllAdmins";
import AllFaculties from "../pages/admin/userManagement.tsx/AllFaculties";
import AllStudents from "../pages/admin/userManagement.tsx/AllStudents";
import CreateAdmin from "../pages/admin/userManagement.tsx/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement.tsx/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement.tsx/CreateStudent";
import FacultyDetail from "../pages/admin/userManagement.tsx/FacultyDetail";
import StudentDetail from "../pages/admin/userManagement.tsx/StudentDetail";
import { generateRoutes } from "../utils/routesGenerator";
import { sideNavbarItemsGenerator } from "../utils/sideNavbarItemsGenerator";
import RegisteredSemester from './../pages/admin/courseManagement/RegisteredSemester';

const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "/admin/semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "/admin/registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "/admin/create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "/admin/courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "/admin/offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "/admin/offered-courses",
        element: <OfferedCourses />,
      },
    ],
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
        name: "All Admins",
        path: "/admin/admins",
        element: <AllAdmins />,
      },
      {
        name: "All Faculties",
        path: "/admin/faculties",
        element: <AllFaculties />,
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
        path: "/admin/admin-data/:adminId",
        element: <AdminDetail />,
      },
      {
        path: "/admin/faculty-data/:facultyId",
        element: <FacultyDetail />,
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
