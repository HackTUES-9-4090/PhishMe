import React from "react";
import Center from "./Center.component";
import Logo from "./Logo.component";
import VerticalCenter from "./VerticalCenter.component";
import "./styles/Loading.css";

export default function Loading() 
{
	return (
		<Center>
			<div className = "LoadingWrapper">
				<VerticalCenter>
					<div className = "Loading">
						<Logo size = {{ height: 80, width: 80 }} />
					</div>
				</VerticalCenter>
			</div>
		</Center>
	);
}
