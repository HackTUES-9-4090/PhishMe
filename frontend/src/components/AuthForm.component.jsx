import React, { useState } from 'react';
import { Button, Form, Input, Typography } from "antd";
import Lottie from "lottie-react";
import Center from "./Center";
import Security from '../assets/security.json';
import { basicColor, primaryColor, textColor } from '../assets/Constants';

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 400;

function AuthForm({ title })
{
    const [data, setData] = useState({ email: '', password: ''});
    
    return (
        <Center>
            <Lottie animationData = {Security} style = {{ width: 300 }}/>
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
                    layout = 'vertical'
                    labelCol = {{ span: 10 }}
                    wrapperCol = {{ span: 20 }}
                    style = {{ maxWidth: 500 }}
                    initialValues = {{ remember: true }}
                    onFinish = {null}
                    autoComplete = 'off'
                >

                    <Form.Item
                        label = {<label style={{ color: textColor }}>Username</label>}
                        name = 'email'
                        rules = {[{ ...validationsRules, message: 'Please enter username!' }]}
                    >
                        <Input style = {{ minWidth: inputWidth, color: primaryColor }}/>
                    </Form.Item>

                    <Form.Item
                        label = {<label style={{ color: textColor }}>Password</label>}
                        name = 'password'
                        rules = {[{ ...validationsRules, message: 'Please enter password!' }]}
                    >
                        <Input.Password style={{ minWidth: inputWidth }}/>
                    </Form.Item>

                    <Form.Item style = {{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style = {{display: 'flex', alignItems: 'center', backgroundColor: basicColor, padding: 20, }}
                        >
                            {title == 'Sign up' ? 'Sign up' : 'Sign in'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Center>
    )
}

export default AuthForm;