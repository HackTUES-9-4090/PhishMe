import { createContext, useContext, useState } from "react";

const Context = createContext();

function useAppContext() {
  return useContext(Context);
}

function ContextProvider({ children }) {
  const [userState, setUserState] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const [loadingState, setLoadingState] = useState({
    loading: false,
  });

  const [errorState, setErrorState] = useState({
    errors: [],
  });

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
