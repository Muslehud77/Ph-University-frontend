
import { Layout, Menu, MenuProps, theme } from "antd";
import { Outlet } from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;

const items : MenuProps['items'] = [
  { key: "1", label: "Dashboard" },
  { key: "2", label: "Profile" },
  {
    key: "3",
    label: "User Management",
    children: [
      { key: "11", label: "Create Admin" },
      { key: "21", label: "Create Student" },
    ],
  },
];

const MainLayout = () => {

     const {
       token: { colorBgContainer, borderRadiusLG },
     } = theme.useToken();

  return (
    <Layout style={{height:'100vh'}}>
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
        <div style={{color:'white',fontSize:'1.2rem', padding:"0.8rem"}}>
          <h3>Ph Uni</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <h1>Hello</h1>
           <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
