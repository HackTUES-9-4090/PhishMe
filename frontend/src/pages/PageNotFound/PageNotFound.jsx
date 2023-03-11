import React from "react";
import { Typography } from "antd";
import { textColor } from "../../utils/Constants";
import Center from "../../components/Center.component";
import NavbarProvider from "../../hoc/NavbarProvider";

export default function PageNotFound() {
	return (
		<NavbarProvider>
			<Center>
				<Typography>
					<Typography.Title style = {{ color: textColor }} level = {1}>
						404 Found
					</Typography.Title>
				</Typography>
			</Center>
		</NavbarProvider>
	);
}
