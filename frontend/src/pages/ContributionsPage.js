import React from 'react'
import TopBar from '../components/Topbar'
import PixelBoards from "../components/PixelBoards";
import {useEffect, useState} from "react";
import {getAllPixelBoardsByUser, getNbPixelsByUser} from "../query/pixel";
import {useParams} from "react-router-dom";
import {Alert, Card, CardBody} from "reactstrap";

const ContributionPage = () => {
    const params = useParams();
    const [pixelBoards, setPixelBoards] = useState([]);
    const [nbPixels, setNbPixels] = useState(0);
    const [nb, setNb] = useState(0);


    useEffect(() => {
        getAllPixelBoardsByUser(params.id).then(res => {
            setPixelBoards(res.boardTab);
            setNb(res.boardTab.length)
        })
    }, [])
    useEffect(() => {
        getNbPixelsByUser(params.id).then(res => {
            setNbPixels(res.nbPixels)
        })
    }, [])

    return (
        <>

            <TopBar/>
            <h1>Your Contributions</h1>

            <div className="flexAround">
                <Card style={{marginBottom: '30px'}}>
                    <CardBody style={{textAlign: 'center', width: '325px'}}>
                        <h5>Added Pixels</h5>
                        <h2>{nbPixels}</h2>
                    </CardBody>
                </Card>
                <Card style={{marginBottom: '30px'}}>
                    <CardBody style={{textAlign: 'center', width: '325px'}}>
                        <h5>PixelBoards</h5>
                        <h2>{nb}</h2>
                    </CardBody>
                </Card>
            </div>
            {nb !== 0 ? <PixelBoards pixelBoards={pixelBoards}/> :
                <div style={{width: '30%', marginLeft: '35%'}}>
                    <Alert style={{textAlign: 'center'}} color="danger">You have not contribute in any pixelboard
                        ! </Alert>
                </div>
            }


        </>
    )
}

export default ContributionPage