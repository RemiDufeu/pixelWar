import { useEffect } from "react";
import useLocalStorage from "../lib/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../theme/theme";

const Logout = ({redirectUrl = "/SignIn"}) => {
    const [, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();
    
    useEffect(() => {
        setToken(null);
        setTheme('theme-light');
        navigate(redirectUrl);
    }, []);

}

export default Logout;