import { useState,useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import {getUser, updateUser, updateRole, deleteUser} from "../query/user";
import Loading from "./Loading";
import {TiTrash} from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import React from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
const FormSuperUpdate = ({redirectUrl = "/UserList"}) => {
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [role , setRole] = useState("");
    const [errormessage, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        getUser(params.id).then((json) => {
            console.log(json);
                setEmail(json.data.email);
                setNom(json.data.nom);
                setPrenom(json.data.prenom);
                setRole(json.data.role);
            }
        );

    }, []);

    const handleDelete = () => {
        setLoading(true);
        deleteUser(params.id).then((json) => {
            setLoading(false);
            if (json.error) {
                setError(json.error);
            } else {
                navigate(redirectUrl);
            }
        });
    };


    let buttActive = (role) => {
        if (role === "admin") {
            return <Button color="primary" active>Admin</Button>
        } else if (role === "user") {
            return <Button color="primary" active>User</Button>
        } else {
            return <Button color="primary" active>Valideur</Button>
        }
    };

    let buttOther = (role) => {
        if (role === "admin") {
            return <Button color="primary" onClick={() => 
            {
                updateRole(params.id, "user");
                window.location.reload();
            }
            }>User</Button>
        } else {
            return <Button color="primary" onClick={() =>
            {
                updateRole(params.id, "admin");
                window.location.reload();
            }
            }>Admin</Button>
        }
    };

    async function handleUpdate(event) {
        event.preventDefault();
        setLoading(true);
        updateUser(params.id,email,nom,prenom).then((u) =>
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
            <h2 className="titre" style={{color:'#1562c2'}}><AiOutlineUserSwitch className='icon'/>
                Update User</h2>
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
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Last Name"
                        aria-label="Last Name"
                    />
                    <Label for="Last Name">Last Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="First Name"
                        aria-label="First Name"
                    />
                    <Label for="First Name">First Name</Label>
                </FormGroup>
                <ButtonGroup style={{marginRight :'5px'}}>
                    {buttActive(role)}
                    {buttOther(role)}
                </ButtonGroup>
                <Button color="danger" onClick={handleDelete}><TiTrash className='iconbtn'/> </Button>
                {loading ? <Loading></Loading> : <Button onClick={handleUpdate} color="primary" style={{marginTop: 30,textAlign: "center", margin: "auto", display: "flex"}}>Submit  <AiFillEdit className='iconbtn'/></Button>}
            </Form>
        </Container>
    );
};

export default FormSuperUpdate;