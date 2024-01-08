import "./App.css";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import SideMenu from "./components/SideMenu";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AppRoutes from "./components/Routes";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onSetCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return <AppRoutes />;
}
export default App;
