import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./styles/Controls.css";

export default function Controls() {
	return (
		<div className="Controls">
			<Link to="/sign-in" style={{ marginRight: "20px" }}>
				<Button ghost={true}>Sign In</Button>
			</Link>

			<Link to="/sign-up">
				<Button ghost={true}>Sign Up</Button>
			</Link>
		</div>
	);
}
