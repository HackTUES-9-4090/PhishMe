import React, { useState } from 'react';
import { Button, Form, Input, Typography } from "antd";
import Lottie from "lottie-react";
import Center from "./Center";
import Security from '../assets/security.json';

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 500;

function AuthForm({ title })
{
    const [data, setData] = useState({ email: '', password: ''});
    
    return (
        <Center>
            <Lottie animationData = {Security} style = {{ width: 260 }}/>
            <div>
                <Typography>
                    <Typography.Title level = {1}>{title}</Typography.Title>
                </Typography>

                <Form
                    layout = 'vertical'
                    labelCol = {{ span: 10 }}
                    wrapperCol = {{ span: 20 }}
                    style = {{ maxWidth: 500 }}
                    initialValues = {{ remember: true }}
                    onFinish = {null}
                    autoComplete = 'off'
                >

                    <Form.Item
                        label = 'Email'
                        name = 'email'
                        rules={[{ ...validationsRules, message: 'Please enter username!' }]}
                    >
                        <Input style = {{ minWidth: inputWidth }}/>
                    </Form.Item>

                    <Form.Item
                        label = 'Password'
                        name = 'password'
                        rules={[{ ...validationsRules, message: 'Please enter password!' }]}
                        >
                        <Input.Password style={{ minWidth: inputWidth }}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {title == 'Sign up' ? 'Sign up' : 'Sign in'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Center>
    )
}

export default AuthForm;