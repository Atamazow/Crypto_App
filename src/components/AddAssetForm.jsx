import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Select,
  Space,
  Typography,
  Form,
  InputNumber,
  DatePicker,
} from "antd";
import { useCrypto } from "./Layout/AppContent.jsx";

export default function AddAssetForm() {
  const { crypto } = useCrypto();
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        placeholder="Select coin"
        optionLabelProp="label"
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
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
    );
  }
  const onFinish = (v) => {
    console.log("finish", v);
  };

  function handleChangeAmount(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }
  function handleChangePrice(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  const validateMessage = {
    required: "${label} is required!",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <>
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{
            width: 40,
            marginRight: 10,
          }}
        />
        <Typography.Text label={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Text>
      </Flex>
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
        validateMessage={validateMessage}
      >
        <Form.Item
          label="Amount"
          name="Amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            onChange={handleChangeAmount}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber onChange={handleChangePrice} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Total" name="total">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
