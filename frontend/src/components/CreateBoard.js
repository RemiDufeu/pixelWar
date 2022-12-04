import React, { useState } from 'react'
import { Container, Form, FormGroup, Label, Button, Input, UncontrolledAlert } from "reactstrap";
import { createBoard } from '../query/pixelboard';
import { FiGrid } from "react-icons/fi";
import { AiOutlinePlusSquare } from "react-icons/ai";

const CreateBoard = () => {

    const [delais, setDelais] = useState(10);

    const [step, setStep] = useState(null);


    const changeDelais = (e) => {
        setDelais(e.target.value);
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
                CreateBoard</h2>
            <Form onSubmit={submitForm}>
                <FormGroup floating>
                    <Input type="text" placeholder="Title"aria-label="name" name='name' required/>
                    <Label for="name">Title</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type="number" min="10" step="1" max="250" placeholder="Width" name='width' aria-label="width" required/>
                    <Label for="width">Width</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type="number" min="10" step="1" max="250" placeholder="Height" aria-label="height" name='height' required/>
                    <Label for="height">Height</Label>
                </FormGroup>
                <FormGroup check>
                    <Input type="checkbox" aria-label="isPublic" name='isPublic'/> 
                    <Label id="ouverture" for="isPublic">{' '} Open to public ? </Label>
                </FormGroup>
                <FormGroup floating>
                    
                    <Input name="mode" type="select">
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
                    <Input name="dateFin" type="date" required />
                    <Label for="dateFin">
                        End Date
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label id="delais" for="delais">
                    Pixel Delay : {delais} secondes
                    </Label>
                    <Input name='delais' type="range" min="10" max="3600" step="1" aria-label="delais" value={delais} onChange={changeDelais} />
                </FormGroup>
                {step === 'success' && <UncontrolledAlert color="success">Le tableau a bien été créé</UncontrolledAlert>}
                {step === 'error' && <UncontrolledAlert color="danger">Une erreur est survenue</UncontrolledAlert>}
                <FormGroup>
                {step === 'loading' ? <Button size="lg" disabled>Chargement...</Button> : <Button color="primary" type="submit" >Create <AiOutlinePlusSquare className='iconbtn'/></Button>}
                </FormGroup>
            </Form>
       </Container>
    )
}

export default CreateBoard
