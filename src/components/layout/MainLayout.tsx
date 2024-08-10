import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useAppDispatch } from "../../redux/hooks/reduxHooks";
import { logout } from "../../redux/features/auth/authSlice";


const { Header, Content } = Layout;



const MainLayout = () => {

  const dispatch = useAppDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout >
      <SideBar/>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
     
      </Layout>
    </Layout>
  );
};

export default MainLayout;
