import React, { useState }  from "react";
import { Button, Card, Form, Typography } from "antd";
import { basicColor } from "../../utils/Constants";
import Center from "../../components/Center.component";
import NavbarProvider from "../../hoc/NavbarProvider";
import styles from "../../utils/GlobalStyles.module.css";
import "./styles/CreateAttack.css";
import { getTargets } from "../../utils/targets";
import useFetch from "../../hoc/useFetch";
import FormItem from "../../components/FormItem.component";

function generateArray(count) 
{
	const array = [];
	for (let i = 0; i < count; i++) {
		array.push("");
	}
	return array;
}

export default function CreateAttack() 
{

	const { fetchData } = useFetch();

	const [count, setCount] = useState(1);

	const incrementAttackCount = () => {
		setCount(count + 1);
	};

	async function handleFormSubmission(values) 
	{
		const data = {
			communicationType: values.communicationType,
			name: values.name,
			fromRelationship: values.relation,
			scrapeUrl: values.scrapeUrl,
			fromName: values.sender,
			theme: values.theme,
			targets: getTargets(values),
		};

		await fetchData('post', '/attack', data);
	}

	return (
		<NavbarProvider>
			<Center>
				<Card
					title="Create Attack"
					style={{
						width: "clamp(500px, 60vw, 800px)",
						background: "none",
						color: "white !important",
					}}
				>
					<Center>
						<Form
							layout = "vertical"
							labelCol = {{ span: 10 }}
							wrapperCol = {{ span: 20 }}
							style = {{ maxWidth: 500 }}
							onFinish = {handleFormSubmission}
							initialValues = {{ remember: true }}
							autoComplete = "off"
						>
							<FormItem
								name = {"name"}
								label = {"Name"}
								message = {"Please provide a name!"}
							/>

							<FormItem
								name = {"communicationType"}
								label = {"Type"}
								message = {"Please provide a communication type!"}
								select = {true}
								options = {[
									{ value: "formal", label: "Formal" },
									{ value: "casual", label: "Casual" },
									{ value: "friendly", label: "Friendly" },
									{ value: "direct", label: "Direct" },
									{ value: "indirect", label: "Indirect" },
								]}
							/>

							<FormItem
								name = {'theme'}
								label = {'Theme'}
								message = {'Please provide a theme!'}
							/>

							<FormItem
								name = {"scrapeUrl"}
								label = {"Scrape URL"}
								message = {"Please provide a scrape url"}
							/>

							<FormItem
								name = {"sender"}
								label = {"Sender"}
								message = {"Please provide a sender!"}
							/>

							<FormItem
								name = {"relation"}
								label = {"Relation"}
								message = {"Please provide a relation!"}
							/>

							<Typography>
								<Typography.Title
									level={4}
									style={{ color: "white", marginTop: 20 }}
								>
									Targets
								</Typography.Title>
							</Typography>

							{generateArray(count).map((_, index) => (
								<div key={index}>
									<Typography>
										<Typography.Title
											level = {5}
											style = {{
												color: "white",
												marginTop: 20,
											}}
										>
											Target №{index + 1}
										</Typography.Title>
									</Typography>

									<FormItem
										name = {`email:target:${index}`}
										label = {"Email"}
										message = {"Please provide an email!"}
										validations = {{ type: "email" }}
										type = "email"
									/>

									<FormItem
										name = {`name:target:${index}`}
										label = {"Target name"}
										message = {"Please provide a name for the target!"}
									/>

									<FormItem
										name = {`fromMessages:target:${index}`}
										label = {"From messages"}
										message = {"Please provide some messages"}
									/>

									<FormItem
										name = {`toMessages:target:${index}`}
										label = {'Outward messages'}
										message = { "Please provide some messages" }
									/>
							
								</div>
							))}

							<Center>
								<Button
									onClick={incrementAttackCount}
									ghost={true}
								>
									Add Target
								</Button>
							</Center>
							<Center>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className={styles.AlignItems}
										style={{
											marginTop: 30,
											padding: 20,
											backgroundColor: basicColor,
										}}
									>
										Create Attack
									</Button>
								</Form.Item>
							</Center>
						</Form>
					</Center>
				</Card>
			</Center>
		</NavbarProvider>
	);
}
