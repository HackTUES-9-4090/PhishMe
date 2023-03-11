import React from "react";
import { Button, Table } from "antd";
import { textColor } from "../../../utils/Constants";
import Text from "../../../components/Text.component";
import GlobalStyles from "../../../utils/GlobalStyles.module.css";
import useFetch from "../../../hoc/useFetch";

function AttackTable({ attackData }) {
	console.log(attackData);
	const basedColumn = { width: 250, align: "center", render };

	const { fetchData } = useFetch();

	async function onCommenceAttack(attackId) {
		await fetchData("post", `/mail/send/${attackId}`);
	}

	function render(text) {
		return {
			props: {
				style: {
					background: "rgba(20, 66, 114, 0.8)",
					color: textColor,
					borderColor: "#0A2647",
				},
			},
			children: <div>{text}</div>,
		};
	}
	const columns = [
		{ title: "Name", dataIndex: "name", key: "name", ...basedColumn },
		{ title: "Email", dataIndex: "email", key: "email", ...basedColumn },
		{
			title: "Clicked fail",
			dataIndex: "isFailedClick",
			key: "isFailedClick",
			...basedColumn,
		},
		{
			title: "Submit fail",
			dataIndex: "isFailedSubmit",
			key: "isFailedSubmit",
			...basedColumn,
		},
	];

	if (!attackData) return null;

	return (
		<>
			<div
				className="attackTitle"
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingRight: 50,
				}}
			>
				<Text text={attackData.name} style={{ fontSize: 20 }} />
				<Button
					onClick={() => onCommenceAttack(attackData.id)}
					ghost={true}
				>
					Commence Attack
				</Button>
			</div>

			<div
				className={GlobalStyles.centeredRow}
				style={{ justifyContent: "space-between" }}
			>
				<Text
					text={"Communication type: " + attackData.communicationType}
					style={{ fontSize: 20 }}
				/>
				<Text
					text={"Send from: " + attackData.fromName}
					style={{ fontSize: 20 }}
				/>
				<Text
					text={
						"Sending time: " +
						new Date(attackData.createdAt).toUTCString()
					}
					style={{ fontSize: 20 }}
				/>
			</div>

			<div style={{ flex: 0.5, flexWrap: "wrap" }}>
				<Text text={attackData.generatedEmailContent} />
			</div>

			<Table
				dataSource={attackData.data}
				columns={columns}
				pagination={false}
				expandable={{
					expandedRowRender: (record) => (
						<p style={{ margin: 0 }}>
							{record.generatedEmailContent}
						</p>
					),
					rowExpandable: (record) => record.generatedEmailContent,
				}}
			/>
		</>
	);
}

export default AttackTable;
