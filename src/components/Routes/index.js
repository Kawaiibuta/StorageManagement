import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../../pages/Dashboard";
import InBound from "../../pages/Inbound";
import Inventory from "../../pages/Inventory";
import GoodsList from "../../pages/GoodsList";
import Partner from "../../pages/Partner";
import Staff from "../../pages/Staff";
import Authentication from "../../pages/Authentication";

import Home from "../../pages/Home";
import ForgotPassword from "../Auth/ForgotPassword";
import Login from "../Auth/Login";
import ResetPassword from "../Auth/ResetPasswordForm";
import Welcome from "../../pages/Welcome";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="*" element={<Navigate to="/auth/login" />} /> */}
      <Route path="/" element={<Home />}>
        <Route index element={<Welcome />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/inbound" element={<InBound />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/goods-list" element={<GoodsList />}></Route>
        <Route path="/partner" element={<Partner />}></Route>
        <Route path="/staff" element={<Staff />}></Route>
      </Route>
      <Route path="auth" element={<Authentication />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="forgot" element={<ForgotPassword />}></Route>
        <Route path="reset/:id" element={<ResetPassword />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
