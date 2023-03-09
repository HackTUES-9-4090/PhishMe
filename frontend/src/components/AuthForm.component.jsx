import React from "react";
import { Button, Form, Input, Typography } from "antd";
import Center from "./Center";
import NavbarProvider from "../hoc/NavbarProvider/NavbarProvider";

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 400;

function AuthForm({ title }) {
  return (
    <NavbarProvider>
      <Center>
        <div>
          <Typography>
            <Typography.Title level={1}>{title}</Typography.Title>
          </Typography>

          <Form
            layout="vertical"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 500 }}
            initialValues={{ remember: true }}
            onFinish={null}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { ...validationsRules, message: "Please enter username!" },
              ]}
            >
              <Input style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { ...validationsRules, message: "Please enter password!" },
              ]}
            >
              <Input.Password style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {title === "Sign up" ? "Sign up" : "Sign in"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Center>
    </NavbarProvider>
  );
}

export default AuthForm;
