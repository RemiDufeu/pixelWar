import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardFooter,
} from "reactstrap";
import {getUser, updatePassword, updateUser} from "../query/user";
import Loading from "./Loading";
import React from "react";

const FormUpdate = ({redirectUrl = "/SignIn"}) => {
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errormessage, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingPass, setLoadingPass] = useState(false);
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
        updateUser(params.id, email, nom, prenom).then((u) => {
                console.log(u);
                navigate(redirectUrl);
                setLoading(false);
            }
        ).catch((e) => {
            console.log(e);
            setLoading(false);
        });
    }
    async function handleUpdatePassword(event) {
        event.preventDefault();
        setLoadingPass(true);
        updatePassword(params.id, password, newPassword, passwordConfirm).then((u) => {
                console.log(u);
                navigate(redirectUrl);
                setLoadingPass(false);
            }
        ).catch((e) => {
            setError(e.message);
            console.log(e);
            setLoadingPass(false);
        });
    }
    let err = null;
    if (errormessage) {
        err =  <p style={{color: "red"}}>{errormessage}</p>;
    }
    return (
        <Container style={{marginTop: "80px"}}>
            <Card
                color="light"
                outline
                style={{
                    width: '40rem',
                    margin: '0 auto',
                    float: 'none',
                    marginBottom: '50px',
                    boxShadow:'8px 8px 10px 0 rgb(211,211,211)',

                }}>
                <CardHeader>
                    Profile
                </CardHeader>
                <CardBody>
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

                        {loading ? <Loading></Loading> : <Button onClick={handleUpdate} size="lg" color="primary"
                                                                 style={{
                                                                     margin: "auto",
                                                                     height: "30px",
                                                                     display: "flex",
                                                                     fontSize: "16px",
                                                                     padding: "0px 10px 0px 10px",
                                                                     textAlign: "center"
                                                                 }}>Save changes</Button>}
                    </Form>

                </CardBody>
            </Card>
            <Card
                color="light"
                outline
                style={{
                    width: '40rem',
                    margin: '0 auto',
                    float: 'none',
                    marginBottom: '50px',
                    boxShadow:'8px 8px 10px 0 rgb(211,211,211)',
                }}>
                <CardHeader>
                    Password
                </CardHeader>
                <CardBody>
                    {err}
                    <Form>
                        <FormGroup floating>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Current Password"
                                aria-label="CurrentPassword"
                            />
                            <Label for="password">Current Password</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                aria-label="newPassword"
                            />
                            <Label for="newPassword">New Password</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Password Confirm"
                                aria-label="passwordConfirm"
                            />
                            <Label for="passwordConfirm">Password Confirm</Label>
                        </FormGroup>

                        {loadingPass ? <Loading></Loading> : <Button onClick={handleUpdatePassword} size="lg" color="primary"
                                                                 style={{
                                                                     margin: "auto",
                                                                     height: "30px",
                                                                     display: "flex",
                                                                     fontSize: "16px",
                                                                     padding: "0px 10px 0px 10px",
                                                                     textAlign: "center"
                                                                 }}>Save changes</Button>}
                    </Form>

                </CardBody>
            </Card>

        </Container>
    );
};

export default FormUpdate;