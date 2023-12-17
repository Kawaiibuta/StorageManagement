import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";

function AppTabs() {
  return (
    <Tabs
      className="AppTabs"
      defaultActiveKey="2"
      style={{ backgroundColor: "red" }}
      items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
        const id = String(i + 1);
        return {
          label: (
            <span>
              <Icon />
              Tab {id}
            </span>
          ),
          key: id,
          children: `Tab ${id}`,
        };
      })}
    />
  );
}

export default AppTabs;
