import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { fakeFetchCrypto, FetchAssets } from "../../api";
import { percentDifference, capitalize } from "../../utils.js";
const siderStyle = {
  padding: "1rem",
};

function AppSideBar(props) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  useEffect(() => {
    async function preLoad() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await FetchAssets();
      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setCrypto(result);
      setLoading(false);
    }
    preLoad();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "#cf1322",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
              // { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)} $
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
      {/*<Card>*/}
      {/*  <Statistic*/}
      {/*    title="Idle"*/}
      {/*    value={9.3}*/}
      {/*    precision={2}*/}
      {/*    valueStyle={{*/}
      {/*      color: "#cf1322",*/}
      {/*    }}*/}
      {/*    prefix={<ArrowDownOutlined />}*/}
      {/*    suffix="%"*/}
      {/*  />*/}
      {/*</Card>{" "}*/}
    </Layout.Sider>
  );
}

export default AppSideBar;
