// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Welcome from "../../pages/Welcome";
import OrderPage from "../../pages/Order";
import Inventory from "../../pages/Inventory";
import Login from "../Auth/Login";
import Authentication from "../../pages/Authentication";

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/auth/login" />} />

      <Route path="/" element={<Home />}>
        <Route index element={<Welcome />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>
      <Route path="auth" element={<Authentication />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
