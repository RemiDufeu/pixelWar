import { useEffect } from "react";
import useLocalStorage from "../lib/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Logout = ({redirectUrl = "/SignIn"}) => {
    const [, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();
    
    useEffect(() => {
        setToken(null);
        navigate(redirectUrl);
    }, []);

}

export default Logout;