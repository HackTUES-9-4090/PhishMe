import { Button, Card, Input, Form, Select, Typography } from "antd";
import { basicColor, textColor } from "../../utils/Constants";
import Center from "../../components/Center";
import { useAppContext } from "../../contexts/ContextProvider";
import NavbarProvider from "../../hoc/NavbarProvider";

import styles from "../../utils/GlobalStyles.module.css";
import "./CreateAttack.css";
import { useState } from "react";
import { getTargets } from "../../utils/targets";
import request from "../../utils/requests";

function generateArray(count) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push("");
  }
  return array;
}

const validationRules = { required: true };

export default function CreateAttack(props) {
  const {
    loading: { setLoadingState },
    error: { setErrorState },
  } = useAppContext();

  const [count, setCount] = useState(1);

  const incrementAttackCount = () => {
    setCount(count + 1);
  };

  async function handleFormSubmission(values) {
    setLoadingState({ loading: true });
    const data = {
      communicationType: values.communicationType,
      name: values.name,
      relation: values.relation,
      scrapeUrl: values.scrapeUrl,
      sender: values.sender,
      theme: values.theme,
      targets: getTargets(values),
    };

    const { isSuccessful, errors } = await request("post", "/attack", data);

    if (!isSuccessful) {
      setErrorState({ errors });
    }

    setLoadingState({ loading: false });
  }

  return (
    <NavbarProvider>
      <Center>
        <Card
          title="Create Attack"
          style={{
            width: "clamp(200px, 50vw, 500px)",
            background: "none",
            color: "white !important",
          }}
        >
          <Center>
            <Form
              layout="vertical"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              style={{ maxWidth: 500 }}
              onFinish={handleFormSubmission}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <label htmlFor="name" style={{ color: textColor }}>
                    Name
                  </label>
                }
                name="name"
                rules={[
                  { ...validationRules, message: "Please provide a name!" },
                ]}
              >
                <Input
                  name="name"
                  id="name"
                  type="text"
                  style={{ minWidth: "20px" }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label
                    htmlFor="communicationType"
                    style={{ color: textColor }}
                  >
                    Type
                  </label>
                }
                name="communicationType"
                rules={[
                  {
                    ...validationRules,
                    message: "Please provide a communication type!",
                  },
                ]}
              >
                <Select
                  id="communicationType"
                  style={{ width: 120 }}
                  options={[
                    { value: "formal", label: "Formal" },
                    { value: "informal", label: "Informal" },
                    { value: "direct", label: "Direct" },
                    { value: "indirect", label: "Indirect" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label htmlFor="theme" style={{ color: textColor }}>
                    Theme
                  </label>
                }
                name="theme"
                rules={[
                  { ...validationRules, message: "Please provide a theme" },
                ]}
              >
                <Input
                  name="theme"
                  id="theme"
                  type="text"
                  style={{ minWidth: "20px" }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label htmlFor="scrapeUrl" style={{ color: textColor }}>
                    Scrape URL
                  </label>
                }
                name="scrapeUrl"
                rules={[
                  {
                    ...validationRules,
                    message: "Please provide a scrape url",
                  },
                ]}
              >
                <Input
                  name="scrapeUrl"
                  id="scrapeUrl"
                  type="text"
                  style={{ minWidth: "20px" }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label htmlFor="sender" style={{ color: textColor }}>
                    Sender
                  </label>
                }
                name="sender"
                rules={[
                  { ...validationRules, message: "Please provide a sender!" },
                ]}
              >
                <Input
                  name="sender"
                  id="sender"
                  type="text"
                  style={{ minWidth: "20px" }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label htmlFor="relation" style={{ color: textColor }}>
                    Relation
                  </label>
                }
                name="relation"
                rules={[
                  { ...validationRules, message: "Please provide a relation!" },
                ]}
              >
                <Input
                  name="relation"
                  id="relation"
                  type="text"
                  style={{ minWidth: "20px" }}
                />
              </Form.Item>

              <Card style={{ background: "none" }} title="Targets">
                {generateArray(count).map((_, index) => (
                  <div key={index}>
                    <Typography>
                      <Typography.Title
                        level={5}
                        style={{ color: "white", marginTop: 20 }}
                      >
                        Target №{index + 1}
                      </Typography.Title>
                    </Typography>
                    <Form.Item
                      label={
                        <label
                          htmlFor={`email:target:${index}`}
                          style={{ color: textColor }}
                        >
                          Email
                        </label>
                      }
                      name={`email:target:${index}`}
                      style={{ color: textColor }}
                      rules={[
                        {
                          ...validationRules,
                          message: "Please provide an email!",
                          type: "email",
                        },
                      ]}
                    >
                      <Input type="email" id={`email:target:${index}`} />
                    </Form.Item>
                    <Form.Item
                      label={
                        <label
                          htmlFor={`name:target:${index}`}
                          style={{ color: textColor }}
                        >
                          Target Name
                        </label>
                      }
                      name={`name:target:${index}`}
                      rules={[
                        {
                          ...validationRules,
                          message: "Please provide a name for the target!",
                        },
                      ]}
                    >
                      <Input
                        name={`name:target:${index}`}
                        id={`name:target:${index}`}
                        type="text"
                        style={{ minWidth: "20px" }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <label
                          htmlFor={`fromMessages:target:${index}`}
                          style={{ color: textColor }}
                        >
                          From Messages
                        </label>
                      }
                      name={`fromMessages:target:${index}`}
                      rules={[
                        {
                          ...validationRules,
                          message: "Please provide some messages",
                        },
                      ]}
                    >
                      <Input.TextArea
                        name={`fromMessages:target:${index}`}
                        id={`fromMessages:target:${index}`}
                        type="text"
                        style={{ minWidth: "20px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <label
                          htmlFor={`toMessages:target:${index}`}
                          style={{ color: textColor }}
                        >
                          Outward Messages
                        </label>
                      }
                      name={`toMessages:target:${index}`}
                      rules={[
                        {
                          ...validationRules,
                          message: "Please provide some messages",
                        },
                      ]}
                    >
                      <Input.TextArea
                        name={`toMessages:target:${index}`}
                        id={`toMessages:target:${index}`}
                        type="text"
                        style={{ minWidth: "20px" }}
                      />
                    </Form.Item>
                  </div>
                ))}

                <Center>
                  <Button onClick={incrementAttackCount} ghost={true}>
                    Add Target
                  </Button>
                </Center>
              </Card>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.AlignItems}
                  style={{
                    marginTop: 10,
                    padding: 20,
                    backgroundColor: basicColor,
                  }}
                >
                  Create Attack
                </Button>
              </Form.Item>
            </Form>
          </Center>
        </Card>
      </Center>
    </NavbarProvider>
  );
}
