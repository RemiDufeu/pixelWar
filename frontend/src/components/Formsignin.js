import { useState } from "react";
import { loginUser } from "../query/user";
import useLocalStorage from "../lib/useLocalStorage";
import { Input, Form, Container, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { setTheme } from "../theme/theme";

const Formsignin = ({ redirectUrl = "/"}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useLocalStorage("token", null);
    const [id, setId] = useLocalStorage("id", null);
    const [errormessage, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handlePost(event) {
        event.preventDefault();
        setLoading(true);
        loginUser(email, password)
        .then((res) => {
            setToken(res.token);
            setTheme('theme-light')
            setLoading(false);
            navigate(redirectUrl);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }


  if (token) {
    navigate(redirectUrl);
  }

  let err = null;
  if (errormessage) {
    err =  <p style={{color: "red"}}>{errormessage}</p>;
  }
  

  return (
    <div>
    <Container style={{ marginTop: "80px" }}>
    {err}
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
    {loading ? <Loading /> : <Button onClick={handlePost} size="lg" color="primary" style={{marginTop: 30,textAlign: "center", margin: "auto", display: "flex"}}>Submit</Button>}
    </Form>
    </Container>
    </div>
  );
};

export default Formsignin;