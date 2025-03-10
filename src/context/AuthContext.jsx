import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const local = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const [isAuth, setIsAuth] = useState(!!local);
    console.log(local);

    const setUser = () => {
        navigate("/")
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.clear()
        navigate("/login")
        setIsAuth(false)
    }

    useEffect(() => {
        if (!!local && local.length > 0) {
            setUser()
        }
    }, [local]);

    return (
        <AuthContext.Provider value={{ isAuth, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider