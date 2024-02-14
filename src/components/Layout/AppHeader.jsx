import React from "react";
import { Layout, Button, Select, Space } from "antd";
import { useCrypto } from "./AppContent";

const headerStyle = {
  width: '100%',
  textAlign: "center",
  color: "#fff",
  height: 60,
  backgroundColor: "#4096ff",
  display: "flex",
  justifyContext: 'space-beetween',
  alignItems: 'center'
};
 
function AppHeader(props) {
  const {crypto} = useCrypto()
  return <Layout.Header style={headerStyle}><Select
  style={{
    width: 250,
  }}
  value='press / to open'
  optionLabelProp="label"
  options={crypto.map(coin => ({
    label: coin.name,
    icon: coin.icon,
    value: coin.id
  }))}
  optionRender={(option) => (
    <Space>
      <img style={{width: 20}} src={option.data.icon} atl={option.data.label}/> 
      {option.data.label}
    </Space>
  )}/>
  <Button type="primary">Primary Button</Button>
</Layout.Header>;
}

export default AppHeader;
