import React, { useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const onSetCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <SideMenu className="responsive-SideMenu" collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} setCollapsed={onSetCollapsed} />
          <Outlet />
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
