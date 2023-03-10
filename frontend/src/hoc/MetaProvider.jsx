import React from "react";
import Errors from "../components/Errors";
import Loading from "../components/Loading";
import { useAppContext } from "../contexts/ContextProvider";

export default function MetaProvider({ children }) {
	const {
		loading: {
			loadingState: { loading },
		},
		error: {
			errorState: { errors },
		},
	} = useAppContext();

	return (
		<>
			{loading ? <Loading /> : null}
			{children}
			{errors ? <Errors errors={errors} /> : null}
		</>
	);
}
