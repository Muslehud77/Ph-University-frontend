

import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";
import { generateRoutes } from "../utils/routesGenerator";
import { sideNavbarItemsGenerator } from "../utils/sideNavbarItemsGenerator";

const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Courses",
    path: "/student/offered-course",
    element: <OfferedCourse />,
  },
 
];

export const StudentRoutes = generateRoutes(studentPaths);

export const StudentSidebarItems = sideNavbarItemsGenerator(studentPaths);
