import React, { useEffect, useState } from "react";
import { Layout, Button, Select, Space, Modal } from "antd";
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
  const [select, useSelect] = useState(false)
  const [modal, setModal] = useState(false) 
  const {crypto} = useCrypto()
  useEffect(() => {
    const keypress = event => {
      if(event.key === '/') {
        useSelect(prev => !prev)
      }
    }
    window.addEventListener('keypress', keypress)
    return () => {
      window.removeEventListener('keypress', keypress)
    }
  }, [])

  const handleSelect = (value) => {
    setModal(true)
  }
  return <Layout.Header style={headerStyle}><Select
  style={{
    width: 250,
  }}
  value='press / to open'
  open={select}
  optionLabelProp="label"
  onSelect={handleSelect}
  onClick={() => useSelect(prev => !prev)}
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
  <Modal  open={modal} onCancel={() => setModal(false)} footer={null} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
</Layout.Header>;
}

export default AppHeader;
