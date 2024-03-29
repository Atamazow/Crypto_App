import React, { useContext, useEffect } from "react";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils.js";
import cryptoContext from "../../Context/crypto-context.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../../redux/slices/cryptoSlice.js";
const siderStyle = {
  padding: "1rem",
};

function AppSideBar(props) {
  const crypto = useSelector((state) => state.cryptoSlice.crypto);
  const dispatch = useDispatch();
  const getCrypto = () => {
    dispatch(fetchCrypto());
  };
  useEffect(() => {
    getCrypto();
  }, []);
  console.log(crypto);
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {crypto?.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.name)}
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
                      {item?.value?.toFixed(2)} $
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
