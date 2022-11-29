import { useState,useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import {getUser, updateUser} from "../query/user";
import Loading from "./Loading";

const FormUpdate = ({redirectUrl = "/SignIn"}) => {
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        getUser(params.id).then((json) => {
                setEmail(json.data.email);
                setNom(json.data.nom);
                setPrenom(json.data.prenom);
            }
        );

    }, []);
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
            console.log(e);
            setLoading(false);
        });
    }
    return (
        <Container style={{ marginTop: "80px" }}>
            <Form>
                Update User
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

                {loading ? <Loading></Loading> : <Button onClick={handleUpdate} size="lg" color="primary" style={{marginTop: 30,textAlign: "center", margin: "auto", display: "flex"}}>Submit</Button>}
            </Form>
        </Container>
    );
};

export default FormUpdate;