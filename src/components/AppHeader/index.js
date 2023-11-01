import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Space } from "antd";

function AppHeader() {
  return (
    <div className="AppHeader">
      <AiOutlineMenu style={{ fontSize: 24 }} onClick={() => {}} />
      <Space>
        <FaUserCircle style={{ fontSize: 24 }} />
        <IoMdArrowDropdown style={{ fontSize: 24 }} />
      </Space>
    </div>
  );
}

export default AppHeader;
