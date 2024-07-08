
import { Layout, Menu } from "antd";

import { AdminSidebarItems } from "../../routes/admin.routes";
import { FacultySidebarItems } from "../../routes/faculty.routes";
import { StudentSidebarItems } from "../../routes/student.routes";

const { Sider } = Layout;

const userRoles = {
    ADMIN: 'admin',
    FACULTY : 'faculty',
    STUDENT : 'student'
}


const SideBar = () => {

    const role = userRoles.ADMIN

    let sidebarItems;


    switch (role) {
        case userRoles.ADMIN:
            sidebarItems = AdminSidebarItems
            break;
        case userRoles.FACULTY:
            sidebarItems = FacultySidebarItems
            break;
        case userRoles.STUDENT:
            sidebarItems = StudentSidebarItems
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