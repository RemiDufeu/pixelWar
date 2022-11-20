import { useState } from "react";
import { postUser } from "../query/user";

const Formsignup = () => {
  const [name, setName] = useState("name");
  const [password, setPassword] = useState("password");
  const [passwordConfirm, setPasswordConfirm] = useState("passwordConfirm");
  const [email, setEmail] = useState("email");
  const [prenom, setPrenom] = useState("prenom");
  function handlePost(event) {
    event.preventDefault();
    console.log(name);
    // eslint-disable-next-line no-console
    postUser(name, prenom, password, passwordConfirm, email).then((u) =>
    console.log(u)
    );
  }


  return (
    <form>
        <p>Sign up</p>
    <input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="Prenom"
        aria-label="prenom"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        aria-label="fullname"
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
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Password Confirm"
        aria-label="passwordConfirm"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="email"
      />
      
      <input type="submit" value="Submit" onClick={handlePost} /> 
    </form>
  );
};

export default Formsignup;