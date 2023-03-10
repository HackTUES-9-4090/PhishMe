import React from "react";
import { Table } from "antd";
import { textColor } from "../../../utils/Constants";
import Text from "../../../components/Text.component";
import GlobalStyles from "../../../utils/GlobalStyles.module.css";

function AttackTable({ attackData }) {
	console.log(attackData);
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
		{
			title: "Name",
			width: 300,
			align: "center",
			dataIndex: "name",
			key: "name",
			render,
		},
		{
			title: "Email",
			width: 300,
			align: "center",
			dataIndex: "email",
			key: "email",
			render,
		},
		{
			title: "Clicked fail",
			width: 200,
			align: "center",
			dataIndex: "isFailedClick",
			key: "isFailedClick",
			render,
		},
		{
			title: "Submit fail",
			width: 200,
			align: "center",
			dataIndex: "isFailedSubmit",
			key: "isFailedSubmit",
			render,
		},
	];

	return (
		<>
			<Text text={"Attack "} style={{ fontSize: 20 }} />
			<div
				className={GlobalStyles.centeredRow}
				style={{ justifyContent: "space-around" }}
			>
				<Text text={"Attack name"} style={{ fontSize: 20 }} />
				<Text text={"Attack name"} style={{ fontSize: 20 }} />
				<Text text={"Attack name"} style={{ fontSize: 20 }} />
			</div>
			<Table
				dataSource=  {attackData.data}
				columns = {columns}
				pagination= { false}
			/>
			;
		</>
	);
}

export default AttackTable;
