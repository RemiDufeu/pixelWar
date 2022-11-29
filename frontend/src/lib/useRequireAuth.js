import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { loginTokenUser} from "../query/user"

function useRequireAuth(redirectUrl = "/SignIn") {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
        setLoading(false);
        navigate(redirectUrl);
    } else {
        loginTokenUser(token)
        .then((res) => {
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            navigate(redirectUrl);
        });
    }
  }, []);
  return loading;
}
export { useRequireAuth };