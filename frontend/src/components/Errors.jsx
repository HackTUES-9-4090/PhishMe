import React from "react";
import { List, Typography } from "antd";
import Center from "./Center";
import "./styles/Errors.css";

export default function Errors({ errors }) {
	return (
		<Center>
			<List>
				{errors.map((error, index) => (
					<li className="Error" key={index}>
						<Typography>
							<Typography.Text style={{ color: "red" }}>
								{error}
							</Typography.Text>
						</Typography>
					</li>
				))}
			</List>
		</Center>
	);
}
