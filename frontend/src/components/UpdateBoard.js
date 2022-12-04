import React, { useEffect, useState } from 'react'
import { Container, Form, FormGroup, Label, Button, Input, UncontrolledAlert } from "reactstrap";
import { createBoard, getPixelBoard } from '../query/pixelboard';
import { FiGrid } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import Loading from './Loading';


const UpdateBoard = () => {
    // on utilise useParam permet de récupérer l'id du board
    const params = useParams();
    const [delais, setDelais] = useState(10);

    const [step, setStep] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataBoard, setDataBoard] = useState(null);


    const changeDelais = (e) => {
        setDelais(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        if (dataBoard === null) {
            getPixelBoard(params.id)
                .then((res) => {
                    console.log(res);
                    setDataBoard(res);
                })
        }else{
            setLoading(false);
        }
    }, [dataBoard, params.id])

    if (loading) {
        return (
            <Loading/>
        )
    }

    const submitForm = (e) => {
        e.preventDefault();
        const formDatas = new FormData(e.target);
        const data = Object.fromEntries(formDatas.entries());
        data.isPublic = data.isPublic === "on" ? true : false;
        setStep('loading');
        createBoard(data).then((res) => {
            setStep('success');
        }).catch((error) => {
            setStep('error');
        });
    }

    return (
        <Container>
            <h2 className="titre" style={{color:'#1562c2'}}><FiGrid className='icon'/>
                Update Board</h2>
            <Form onSubmit={submitForm}>
                <FormGroup floating>
                    <Input type="text" placeholder="Titre"aria-label="name" name='name' required defaultValue={dataBoard.name} />
                    <Label for="name">Titre</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type="number" min="10" step="1" max="250" placeholder="Largeur" name='width' aria-label="width" required defaultValue={dataBoard.width} />
                    <Label for="width">Largeur</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type="number" min="10" step="1" max="250" placeholder="Hauteur" aria-label="height" name='height' required defaultValue={dataBoard.height} />
                    <Label for="height">Hauteur</Label>
                </FormGroup>
                <FormGroup check>
                    <Input type="checkbox" aria-label="isPublic" name='isPublic' id="isPublic" defaultChecked={dataBoard.isPublic} />
                    <Label for="isPublic">{' '} Ouvert au publique</Label>
                </FormGroup>
                <FormGroup floating>
                    
                    <Input name="mode" type="select" defaultValue={dataBoard.mode}>
                        <option>
                         infinite
                        </option>
                        <option>
                        onePixel
                        </option>
                    </Input>
                    <Label
                    for="mode"
                    sm={2}
                    >
                    Mode
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input name="dateFin" type="date" required value={dataBoard.dateFin.split('T')[0]}/>
                    <Label for="dateFin">
                    Date de fin
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="delais">
                    Delais d'un pixel : {dataBoard.delais} secondes
                    </Label>
                    <Input name='delais' type="range" min="10" max="3600" step="1" aria-label="delais" onChange={changeDelais} defaultValue={dataBoard.delais} />
                </FormGroup>
                {step === 'success' && <UncontrolledAlert color="success">Le tableau a bien été créé</UncontrolledAlert>}
                {step === 'error' && <UncontrolledAlert color="danger">Une erreur est survenue</UncontrolledAlert>}
                <FormGroup>
                {step === 'loading' ? <Button size="lg" disabled>Chargement...</Button> : <Button color="primary" type="submit" size="lg" >Modifier</Button>}
                </FormGroup>
            </Form>
       </Container>
    )
}

export default UpdateBoard
