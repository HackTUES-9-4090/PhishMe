import React, { useState, useEffect } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import NavbarProvider from "../../hoc/NavbarProvider";
import Text from "../../components/Text.component";
import styles from "./styles/DashBoard.module.css";
import AttackTable from "./components/AttackTable.component";
import useFetch from "../../hoc/useFetch";
import { textColor } from "../../utils/Constants";

export default function DashBoard() {
	const [attackIndex, setAttackIndex] = useState(0);
	const [attackData, setAttackData] = useState({});
	const { fetchData } = useFetch();

	const passed = <CheckOutlined style = {{ color: textColor, fontSize: 20}} />
	const failed = <CloseOutlined style = {{ color: textColor, fontSize: 20 }} />;

	useEffect(() => {
		async function getAttacks() 
		{
			let result, dataRows = {}, index = 0;

			result = await fetchData("get", "/attack");

			if (!result) return; 

			for (index in result) {
				const { name, communicationType, fromName, createdAt, targets } = result[index];
		
				dataRows[index] = 
				{ 
					createdAt, name, communicationType, 
					fromName, data: [], 
				};

				targets.forEach(
					({ name, email, isFailedClick, isFailedSubmit, generatedEmailContent }) => 
					{
						console.log(generatedEmailContent, '------');
						dataRows[index].data = [
							...dataRows[index].data,
							{
								key: index.toString(), name, email,
								isFailedClick: !isFailedClick ? passed : failed,
								isFailedSubmit: !isFailedSubmit ? passed: failed,
								generatedEmailContent
							},
						];
					}
				);
			}

			setAttackData({ ...dataRows });
		}

		getAttacks();
	}, []);
	
	return (
		<NavbarProvider>
			<div className={styles.container}>
				<div className={styles.centered} style = {{ flex: 0.7 }}>
					{Object.keys(attackData).map((element, index) => {
						return (
							<Text
								key = {index}
								className = {styles.hover}
								text = {attackData[element].name}
								onClick = {() => setAttackIndex(index)}
							/>
						);
					})}
				</div>

				<div estyle={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
					<AttackTable attackData = {attackData[attackIndex]} />
				</div>
			</div>
		</NavbarProvider>
	);
}
