import { useState } from "react";
import { loginUser } from "../query/user";
import useLocalStorage from "../lib/useLocalStorage";
import { Input, Form, Container, FormGroup, Label, Button } from "reactstrap";

const Formsignin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useLocalStorage("token", null);
    const [id, setId] = useLocalStorage("id", null);

  function handlePost(event) {
    event.preventDefault();
    console.log(email);
    // eslint-disable-next-line no-console
    loginUser( email, password).then((u) =>
      {
        setToken(u.token);
        setId(u.userId);
        console.log("token1"+u.token)
      }
      
      
    ).catch((e) => setToken(null));
    console.log("tokeen2"+token);
    
  }


  return (
    <Container style={{ marginTop: "80px" }}>
      
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