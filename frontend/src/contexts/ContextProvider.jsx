import React from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

function useAppContext() {
	return useContext(Context);
}

function ContextProvider({ children }) {
	const [userState, setUserState] = useState({
		accessToken: window.localStorage.getItem("accessToken"),
		refreshToken: window.localStorage.getItem("refreshToken"),
	});

	const [loadingState, setLoadingState] = useState({ loading: false });

	const [errorState, setErrorState] = useState({ errors: [] });

	return (
		<Context.Provider
			value={{
				user: { userState, setUserState },
				loading: { loadingState, setLoadingState },
				error: { errorState, setErrorState },
			}}
		>
			{children}
		</Context.Provider>
	);
}

export { ContextProvider, useAppContext };
