import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const navigate = useNavigate();

    const [token, setToken] = useState("");

    const isLoged = () => {
        let token = localStorage.getItem("token");
        const currentPath = window.location.pathname;

        console.log(token);
    
        if (token && (currentPath === "/" || currentPath === "/sign-up")) {
            // Usuário já tem um token e está tentando acessar a página de login ou cadastro
            navigate("/timeline"); // Substitua com a URL da página principal
        } else if (token) {
            // Usuário autenticado, permitir acesso normal
            axios.defaults.headers.common['Authorization'] = token;
            setToken(token);
        } else {
            navigate("/");
        }
    }

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("url");
    localStorage.removeItem("userid");
    axios.defaults.headers.common['Authorization'] = "";
    navigate("/");
}

    return (
        <LoginContext.Provider value={{ isLoged, logout, token, setToken}}>
            {children}
        </LoginContext.Provider>
    )
}
