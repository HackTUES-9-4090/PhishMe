import React from "react";
import { Button, Form, Input, Typography } from "antd";
import NavbarProvider from "../hoc/NavbarProvider";
import { basicColor, textColor } from "../utils/Constants";
import Center from "./Center";
import styles from "../utils/GlobalStyles.module.css";
import Loading from "./Loading";
import request from "../utils/requests";
import { useAppContext } from "../contexts/ContextProvider";

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 400;

function AuthForm({ title, type }) {
  const {
    user: { setUserState },
    error: { setErrorState },
    loading: {
      loadingState: { loading },
      setLoadingState,
    },
  } = useAppContext();

  async function handleFormSubmission({ email, password }) {
    setLoadingState({ loading: true });
    setErrorState({ errors: [] });
    const { isSuccessful, errors, data } = await request(
      "post",
      `/auth/${type}`,
      { email, password }
    );

    if (isSuccessful) {
      setUserState(data);
    } else {
      setErrorState(errors);
    }

    setLoadingState({ loading: false });
  }

  const form = (
    <NavbarProvider>
      <Center>
        <div>
          <Typography>
            <Typography.Title style={{ color: textColor }} level={1}>
              {title}
            </Typography.Title>
          </Typography>

          <Form
            layout="vertical"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 500 }}
            initialValues={{ remember: true }}
            onFinish={handleFormSubmission}
            autoComplete="off"
          >
            <Form.Item
              label={<label style={{ color: textColor }}>Email</label>}
              name="email"
              style={{ color: textColor }}
              rules={[
                {
                  ...validationsRules,
                  message: "Please provide an email!",
                  type: "email",
                },
              ]}
            >
              <Input type="email" style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: textColor }}>Password</label>}
              name="password"
              rules={[
                { ...validationsRules, message: "Please provide a password!" },
              ]}
            >
              <Input.Password style={{ minWidth: inputWidth }} />
            </Form.Item>

            <Form.Item className={styles.Center}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.Center}
                style={{
                  marginTop: 10,
                  padding: 20,
                  backgroundColor: basicColor,
                }}
              >
                {title === "Sign up" ? "Sign up" : "Sign in"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Center>
    </NavbarProvider>
  );

  return <>{loading ? <Loading /> : form}</>;
}

export default AuthForm;
