import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { loginTokenUser} from "../query/user"

function useUser() {
    const [token, setToken] = useLocalStorage("token", null);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
        } else {
            loginTokenUser(token)
            .then((res) => {
                setUser(res.user);
                setLoading(false);
            })
            .catch((error) => {
                setUser(null);
                setLoading(false);
            });
        }
    }, []);

    return [loading , user ];
}

export { useUser };