import React, { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { textColor } from "../utils/Constants";
import Text from "./Text.component";
import styles from "./styles/UserAttacks.module.css";
import GlobalStyles from "../utils/GlobalStyles.module.css";
import UserAttacksDetails from "../pages/DashBoard/components/UserAttacksDetails.component";

function UserAttacks({ employeeName = "Danail Yordanov", phishingsCount = 1 }) {
	const [seeMore, setSeeMore] = useState(false);

	return (
		<div className={styles.userAttackContainer}>
			<div className={styles.userData}>
				<Text text={employeeName} style={{ fontSize: 25 }} />

				<div
					className={styles.phishings}
					style={{
						backgroundColor:
							phishingsCount > 0 ? "#F0706A" : "#88D453",
					}}
				>
					<Text text={phishingsCount} />
				</div>
			</div>

			{seeMore && <UserAttacksDetails />}

			<div className={GlobalStyles.Center}>
				<div className={GlobalStyles.centeredRow}>
					<Text
						onClick={() => setSeeMore(!seeMore)}
						text={seeMore ? "Close details" : "Open details"}
						style={{ fontSize: 17 }}
					/>

					{seeMore ? (
						<UpOutlined
							className={GlobalStyles.sideText}
							style={{ color: textColor }}
						/>
					) : (
						<DownOutlined
							className={GlobalStyles.sideText}
							style={{ color: textColor }}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default UserAttacks;
