import axios from "axios";
import { loginError, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://warehousemanagement.onrender.com/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    // navigate("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch(loginError());
  }
};
