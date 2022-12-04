import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { postUser } from "../query/user";
import Loading from "./Loading";
import {FiUserPlus} from "react-icons/fi";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

const Formsignup = ({redirectUrl = "/SignIn"}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [errormessage, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handlePost(event) {
    event.preventDefault();
    setLoading(true);
    console.log(name);
    // eslint-disable-next-line no-console
    postUser(name, prenom, password, passwordConfirm, email).then((u) =>
    {
      console.log(u);
      navigate(redirectUrl);
      setLoading(false);
    }
    ).catch((e) => {
      setError(e.message);
      console.log(e);
      setLoading(false);
    });
      
  }
  let err = null;
  if (errormessage) {
    err =  <p style={{color: "red"}}>{errormessage}</p>;
  }
  return (
    <Container style={{ marginTop: "80px" }}>
      {err}
      <Form>
        <h2 className="titre" style={{color:'#1562c2'}}><FiUserPlus className='icon'/>
          Sign Up</h2>
        <FormGroup floating>
        <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        aria-label="Nom" 
      />
      <Label for="Nom">Nom</Label>
        </FormGroup>
        <FormGroup floating>
        <Input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="Prenom"
        aria-label="Prenom"
      />
      <Label for="Prenom">Prenom</Label>
        </FormGroup>
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
        <FormGroup floating>
        <Input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="PasswordConfirm"
        aria-label="passwordConfirm"
      />
      <Label for="passwordConfirm">PasswordConfirm</Label>
        </FormGroup>
        {loading ? <Loading></Loading> : <Button onClick={handlePost} color="primary" style={{marginTop: 30,textAlign: "center", margin: "auto", display: "flex"}}>Submit
        <AiFillCaretRight className='iconbtn'/>
        </Button>}
    </Form>
    </Container>
  );
};

export default Formsignup;