import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { loginTokenUser} from "../query/user"

function useRequireRole(role = "admin", redirectUrl = "/SignIn") {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token", null);

    const [loading, setLoading] = useState(true);
    const [roleUser, setRoleUser] = useState(null);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            navigate(redirectUrl);
        } else {
            loginTokenUser(token)
            .then((res) => {
                setRoleUser(res.user.userRole);
                return res.user.userRole
            })
            .then((roleRes) => {
                setLoading(false);
                if (roleRes !== role) {
                    navigate(redirectUrl);
            }})
            .catch((error) => {
                setLoading(false);
                navigate(redirectUrl);
            });
        }
    }, []);
    return [loading, roleUser];
}

export { useRequireRole };