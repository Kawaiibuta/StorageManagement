import { Routes, Route } from "react-router-dom";

import Dashboard from "../../pages/Dashboard";
import InBound from "../../pages/Inbound";
import Outbound from "../../pages/Outbound";
import Inventory from "../../pages/Inventory";
import GoodsList from "../../pages/GoodsList";
import Partner from "../../pages/Partner";
import Staff from "../../pages/Staff";
import WarehouseInterconnection from "../../pages/WarehouseInterconnection";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inbound" element={<InBound />}></Route>
      <Route path="/outbound" element={<Outbound />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/goods-list" element={<GoodsList />}></Route>
      <Route path="/partner" element={<Partner />}></Route>
      <Route path="/staff" element={<Staff />}></Route>
      <Route
        path="/warehouse-interconnection"
        element={<WarehouseInterconnection />}
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
