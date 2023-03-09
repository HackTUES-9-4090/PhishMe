import React from "react";
import { Button, Form, Input, Typography } from "antd";
import NavbarProvider from "../hoc/NavbarProvider/NavbarProvider";
import { basicColor, textColor } from "../assets/Constants";
import Center from "./Center";
import styles from '../assets/GlobalStyles.module.css';

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 400;

function AuthForm({ title }) {
  return (
    <NavbarProvider>
      <Center>
        <div>
          <Typography>
            <Typography.Title 
              style = {{ color: textColor }}
              level = {1}
            >
                {title}
            </Typography.Title>
          </Typography>

          <Form
            layout = "vertical"
            labelCol = {{ span: 10 }}
            wrapperCol = {{ span: 20 }}
            style = {{ maxWidth: 500 }}
            initialValues = {{ remember: true }}
            onFinish = {null}
            autoComplete = "off"
          >
            <Form.Item
              label = {<label style={{ color: textColor }}>Email</label>}
              name = "email"
              style = {{ color: textColor }}
              rules = {[
                { ...validationsRules, message: "Please enter username!" },
              ]}
            >
              <Input style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item
              label = {<label style={{ color: textColor }}>Password</label>}
              name = "password"
              rules = {[
                { ...validationsRules, message: "Please enter password!" },
              ]}
            >
              <Input.Password style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item className = {styles.Center}>
              <Button 
                type = "primary" 
                htmlType = "submit"
                className = {styles.Center}
                style = {{ marginTop: 10, padding: 20, backgroundColor: basicColor }}
              >
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
