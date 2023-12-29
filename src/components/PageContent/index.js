import AppRoutes from "../Routes";
import { Layout, theme } from "antd";
const { Content } = Layout;

function PageContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: "24px 16px",
        // paddingTop: ,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <AppRoutes />
      {/* Content */}
    </Content>
  );
}

export default PageContent;
