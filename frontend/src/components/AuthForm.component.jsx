import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { basicColor, textColor } from '../utils/Constants';
import { useAppContext } from '../contexts/ContextProvider';
import NavbarProvider from '../hoc/NavbarProvider';
import Center from './Center.component';
import styles from '../utils/GlobalStyles.module.css';
import Loading from './Loading.component';
import useFetch from '../hoc/useFetch';

const validationsRules = { required: true, warningOnly: true };
const inputWidth = 400;

function AuthForm({ title, type }) 
{
	const navigate = useNavigate();
	const { user: { setUserState }, loading: { loadingState } } = useAppContext(); 
	const { fetchData } = useFetch(); 

	async function handleFormSubmission({ email, password }) 
	{
		const result = await fetchData("post", `/auth/${type}`, { email, password });
		console.log(result.accessToken);
		if (!result) return; 
		
		setUserState(result);
		window.localStorage.setItem("accessToken", result.accessToken);
		window.localStorage.setItem("refreshToken", result.refreshToken);
		navigate('/');
	}

	const form = (
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
						onFinish = {handleFormSubmission}
						autoComplete = "off"
					>
						<Form.Item
							label = {
								<label style = {{ color: textColor }}>
									Email
								</label>
							}
							name = "email"
							style = {{ color: textColor }}
							rules = {[
								{
									...validationsRules,
									message: "Please provide an email!",
									type: "email",
								},
							]}
						>
							<Input
								type = "email"
								style = {{ minWidth: inputWidth }}
							/>
						</Form.Item>

						<Form.Item
							label = {
								<label style = {{ color: textColor }}>
									Password
								</label>
							}
							name = 'password'
							rules = {[
								{
									...validationsRules,
									message: 'Please provide a password!',
								},
							]}
						>
							<Input.Password style = {{ minWidth: inputWidth }} />
						</Form.Item>

						<Form.Item className = {styles.Center}>
							<Button
								type = 'primary'
								htmlType = 'submit'
								className = {styles.Center}
								style = {{
									marginTop: 10,
									padding: 20,
									backgroundColor: basicColor,
								}}
							>
								{title === 'Sign up' ? 'Sign up' : 'Sign in'}
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Center>
		</NavbarProvider>
	);

	return <>{loadingState.loading ? <Loading /> : form}</>;
}

export default AuthForm;
