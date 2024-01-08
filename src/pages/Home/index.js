import React, { useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import PageContent from "../../components/PageContent";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [collapsed, setCollapsed] = useState(false);
  const onSetCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <SideMenu collapsed={collapsed} />
        <Layout>
          <AppHeader
            setIsLogin={setIsLogin}
            collapsed={collapsed}
            setCollapsed={onSetCollapsed}
          />
          <Outlet />
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
