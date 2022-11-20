import { useState } from "react";
import { loginUser } from "../query/user";
import useLocalStorage from "../lib/useLocalStorage";

const Formsignin = () => {
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("email");
    const [token, setToken] = useLocalStorage("token", null);

  function handlePost(event) {
    event.preventDefault();
    console.log(email);
    // eslint-disable-next-line no-console
    loginUser( email, password).then((u) =>
      setToken(u.token)
    ).catch((e) => setToken(null));
    console.log(token);
  }


  return (
    <form>
        <p>Sign in</p>
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        aria-label="password"
      />
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Token"
        aria-label="token"
      />

      
      <input type="submit" value="Submit" onClick={handlePost} /> 
    </form>
  );
};

export default Formsignin;