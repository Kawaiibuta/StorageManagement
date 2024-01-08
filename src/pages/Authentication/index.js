import { Outlet } from "react-router-dom";
import Login from "../../components/Auth/Login";

function Authentication() {
  return (
    <div className="background">
      <Outlet />
    </div>
  );
}

export default Authentication;
