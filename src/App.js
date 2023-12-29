import "./App.css";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import SideMenu from "./components/SideMenu";
import React, { useState } from "react";
import { Layout } from "antd";

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [collapsed, setCollapsed] = useState(false);
  const onSetCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (user) {
    return (
      <Layout style={{ height: "100vh" }}>
        <SideMenu collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} setCollapsed={onSetCollapsed} />
          <PageContent />
        </Layout>
      </Layout>
    );
  }
  return <Authentication></Authentication>;
}
export default App;
