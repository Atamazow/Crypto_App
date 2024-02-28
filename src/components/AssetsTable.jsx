import React from "react";
import { Table } from "antd";
import { useCrypto } from "../Context/crypto-context.jsx";
const columns = [
  {
    title: "Name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
    dataIndex: "name",
  },

  {
    title: "Price, $",
    defaultSortOrder: "descend",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",

    sorter: (a, b) => a.amount - b.amount,
  },
];

function AssetsTable(props) {
  const { assets } = useCrypto();
  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }));
  return <Table columns={columns} dataSource={data} />;
}

export default AssetsTable;
