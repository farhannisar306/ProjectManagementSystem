/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";
import Cookies from "js-cookie";
import { useHttp } from "../hooks/useHTTP";

type AuthContextType = {
    authenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
};


const AuthenticationContext = createContext<AuthContextType>({
    authenticated: false,
    setAuthenticated: () => { },
});

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
    //const { data, loading, error, statusCode, sendRequest } = useHttp();
    const { sendRequest } = useHttp();
    const [authenticated, setAuthenticated] = useState(false);

    const checkToken = () => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            setAuthenticated(true);
        } else {
            sendRequest(`auth/refresh`, 'GET', {}, {
                withCredentials: true,
            }).then((success) => {
                if (success) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            })
        }
        //setAuthenticated(!!accessToken);
    };

    useEffect(() => {
        checkToken();

        const interval = setInterval(() => {
            checkToken();
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticationContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuth = () => useContext(AuthenticationContext);
