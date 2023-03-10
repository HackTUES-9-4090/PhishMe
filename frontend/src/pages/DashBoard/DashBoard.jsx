import React, { useState, useEffect } from "react";
import NavbarProvider from "../../hoc/NavbarProvider";
import Text from "../../components/Text.component";
import styles from "./styles/DashBoard.module.css";
import AttackTable from "./components/AttackTable.component";
import useFetch from "../../hoc/useFetch";

export default function DashBoard() {
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
