import React from "react";
import { Layout } from "antd";
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
function AppSideBar(props) {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      Sider
    </Layout.Sider>
  );
}

export default AppSideBar;
