import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import Center from "../../components/Center";

export default function SignIn() {
  const [state, set] = useState({ email: "", password: "" });

  const setState = (obj) => {
    set(...state, obj);
  };

  const signIn = async () => {};

  return (
    <Center>
      <div>
        <Typography>
          <Typography>
            <Typography.Title level={1}>Sign In</Typography.Title>
          </Typography>
        </Typography>
        <Form
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{ remember: true }}
          onFinish={signIn}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                warningOnly: true,
              },
            ]}
          >
            <Input
              style={{
                minWidth: 500,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                warningOnly: true,
              },
            ]}
          >
            <Input.Password
              style={{
                minWidth: 500,
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Center>
  );
}
