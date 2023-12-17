import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Dropdown, Space } from "antd";
import { logoutUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";

function AppHeader() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const id = user?._id;
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          // target="_blank"
          // rel="noopener noreferrer"
          onClick={() => {
            try {
              logoutUser(id, accessToken, dispatch, axiosJWT);
            } catch (e) {
              console.log(e);
            }
          }}
          // href={() => {
          //   logoutUser(id, accessToken, dispatch);
          // }}
        >
          Logout
        </a>
      ),
      danger: true,
    },
  ];
  return (
    <div className="AppHeader">
      <AiOutlineMenu style={{ fontSize: 24 }} onClick={() => {}} />
      <Space>
        <FaUserCircle style={{ fontSize: 24 }} />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          {/* <Button  ghost icon={<IoMdArrowDropdown fontSize={24} />}></Button> */}
          <IoMdArrowDropdown fontSize={24} />
        </Dropdown>
      </Space>
    </div>
  );
}

export default AppHeader;
