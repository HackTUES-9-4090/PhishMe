import { createContext, useContext } from "react";

const UserContext = createContext();

function useUserContext()
{
    return useContext(UserContext);
}

function UserContextProvider({ children })
{
    return (
        <UserContext.Provider value = {{ accessToken: null, refreshToken: null }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, useUserContext };
