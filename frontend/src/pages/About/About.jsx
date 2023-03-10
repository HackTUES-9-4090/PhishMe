import React from "react";
import { Card, Row } from "antd";
import Center from "../../components/Center";
import NavbarProvider from "../../hoc/NavbarProvider";

export default function About() {
	return (
		<NavbarProvider>
			<Center>
				<Card style={{ background: "none" }} title="About">
					<Row>
						<h1>HAS</h1>
						<h1>HAS</h1>
						<h1>HAS</h1>
					</Row>
				</Card>
			</Center>
		</NavbarProvider>
	);
}
