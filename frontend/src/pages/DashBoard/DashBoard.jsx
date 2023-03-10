import React, { useState, useEffect } from "react";
import { textColor } from "../../utils/Constants";
import NavbarProvider from "../../hoc/NavbarProvider";
import Text from "../../components/Text.component";
import styles from "./styles/DashBoard.module.css";
import request from "../../utils/requests";
import AttackTable from "./components/AttackTable.component";
import useFetch from "../../hoc/useFetch";

function render(text, record) {
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

export default function DashBoard({ companyName }) {
	const [attackIndex, setAttackIndex] = useState(0);
	const [attackData, setAttackData] = useState({});
	const { fetchData } = useFetch();

	useEffect(() => {
		async function getAttacks() {
			let result,
				dataRows = {},
				index = 0;

			result = await fetchData("get", "/attack");

			for (index in result) {
				const { name, communicationType, fromName, targets } =
					result[index];

				dataRows[index] = {
					name,
					communicationType,
					fromName,
					data: [],
				};

				targets.forEach(
					({ name, email, isFailedClick, isFailedSubmit }) => {
						dataRows[index].data = [
							...dataRows[index].data,
							{
								key: index.toString(),
								name,
								email,
								isFailedClick,
								isFailedSubmit,
							},
						];
					}
				);
			}

			setAttackData({ ...dataRows });
		}

		getAttacks();
	}, []);
	console.log(attackData);
	return (
		<NavbarProvider>
			<div className={styles.container}>
				<div className={styles.centered}>
					{Object.keys(attackData).map((element, index) => {
						return (
							<Text
								key={index}
								className={styles.hover}
								text={attackData[element].name}
								onClick={() => setAttackIndex(index)}
							/>
						);
					})}
				</div>

				<div style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
					<AttackTable attackData={attackData[attackIndex]} />
				</div>
			</div>
		</NavbarProvider>
	);
}
