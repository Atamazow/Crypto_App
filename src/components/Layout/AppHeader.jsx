import React, { useEffect, useState } from "react";
import { Layout, Button, Select, Space, Modal, Drawer } from "antd";
import { useCrypto } from "./AppContent";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  color: "#fff",
  height: 60,
  display: "flex",
  backgroundColor: "#4096ff",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppHeader(props) {
  const [select, useSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();
  const [drawer, setDrawer] = useState(true);
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        useSelect((prev) => !prev);
      }
    };
    window.addEventListener("keypress", keypress);
    return () => {
      window.removeEventListener("keypress", keypress);
    };
  }, []);

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        value="press / to open"
        open={select}
        optionLabelProp="label"
        onSelect={handleSelect}
        onClick={() => useSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          icon: coin.icon,
          value: coin.id,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              atl={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Primary Button
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Basic Drawer"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
