import React, { useContext } from "react";
import { Layout } from "antd";
import CryptoContext from "../../Context/crypto-context";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};
function AppContent(props) {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}

export default AppContent;

export function useCrypto() {
  return useContext(CryptoContext)
}