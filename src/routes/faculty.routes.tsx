
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";
import { generateRoutes } from "../utils/routesGenerator";
import { sideNavbarItemsGenerator } from "../utils/sideNavbarItemsGenerator";

const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
 {
  name:"My Courses",
  path:"/faculty/courses",
  element:<MyCourses/>
 },
 {
  
  path:"/faculty/:registerSemesterId/:courseId",
  element:<MyStudents/>
 }
];

export const FacultyRoutes = generateRoutes(facultyPaths);

export const FacultySidebarItems = sideNavbarItemsGenerator(facultyPaths);
