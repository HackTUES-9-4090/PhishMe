import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import AuthForm from "../components/AuthForm.component";
import DashBoard from "../pages/DashBoard/DashBoard";
import { useAppContext } from "../contexts/ContextProvider";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import CreateAttack from "../pages/CreateAttack/CreateAttack";

function Router() {
	const {
		user: {
			userState: { accessToken },
		},
	} = useAppContext();

	return (
		<BrowserRouter>
			<Routes>
				{!accessToken ? (
					<>
						<Route
							path="/sign-in"
							element={
								<AuthForm type="signin" title={"Sign in"} />
							}
						/>
						<Route
							path="/sign-up"
							element={
								<AuthForm type="signup" title={"Sign up"} />
							}
						/>
					</>
				) : null}
				{!accessToken ? (
					<Route path="/create-attack" element={<CreateAttack />} />
				) : null}
				<Route
					path="/"
					element={
						!accessToken ? (
							<DashBoard />
						) : (
							<AuthForm type="signin" title={"Sign in"} />
						)
					}
				/>
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
