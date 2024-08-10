import { Layout, Menu } from "antd";

import { AdminSidebarItems } from "../../routes/admin.routes";
import { FacultySidebarItems } from "../../routes/faculty.routes";
import { StudentSidebarItems } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks/reduxHooks";
import {
  selectAuthToken,
  selectAuthUser,
} from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRoles = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const SideBar = () => {
  const user = useAppSelector(selectAuthUser);

  let sidebarItems;

  switch (user!.role) {
    case userRoles.ADMIN:
      sidebarItems = AdminSidebarItems;
      break;
    case userRoles.FACULTY:
      sidebarItems = FacultySidebarItems;
      break;
    case userRoles.STUDENT:
      sidebarItems = StudentSidebarItems;
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div style={{ color: "white", fontSize: "1.2rem", padding: "0.8rem" }}>
        <h3>Ph Uni</h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
