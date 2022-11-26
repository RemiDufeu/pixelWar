import { useState } from "react";
import { loginUser } from "../query/user";
import useLocalStorage from "../lib/useLocalStorage";
import { Input, Form, Container, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Formsignin = ({ redirectUrl = "/PixelBoard"}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useLocalStorage("token", null);
    const [errormessage, setError] = useState(null);
    const navigate = useNavigate();

  function handlePost(event) {
    event.preventDefault();
    console.log(email);
    // eslint-disable-next-line no-console
    loginUser(email, password).then((u) =>{
      console.log(redirectUrl);
      setToken(u.token);
      navigate(redirectUrl);
    }
    ).catch((e) => {setToken(null); setError(e.message);});
    console.log(token);

  }

  if (token) {
    navigate(redirectUrl);
  }

  let err = null;
  if (errormessage) {
    err =  <div>{errormessage}</div>;
  }
  

  return (
    <Container style={{ marginTop: "80px" }}>
    <p style={{color: "red"}}>{err}</p>
    <Form>
        <FormGroup floating>
        <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="email"
      />
      <Label for="email">Email</Label>
      </FormGroup>
      <FormGroup floating>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        aria-label="password"
      />
      <Label for="password">Password</Label>
      </FormGroup>
      <Button onClick={handlePost} size="lg" color="primary" style={{marginTop: 30,textAlign: "center", margin: "auto", display: "flex"}}>Submit</Button>
    </Form>
    </Container>
  );
};

export default Formsignin;