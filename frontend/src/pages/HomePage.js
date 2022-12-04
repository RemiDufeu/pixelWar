import { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, Container } from "reactstrap";
import PixelBoards from "../components/PixelBoards";
import TopBar from "../components/Topbar";
import { getPublicStats } from "../query/pixelboard";
import logo from "../assets/logo.png"

const HomePage = () => {

    const [pixelBoards, setPixelBoards] = useState([]);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [pixelBoardCount, setPixelBoardCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tab , setTab] = useState(0);

    const deleteError = () => {
        setError(null);
    }

    useEffect(() => {
        getPublicStats().then(res => {
            setUserCount(res.userCount);
            setPixelBoardCount(res.pixelBoardCount);
            setPixelBoards(res.pixelBoards);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [])

    const pixelBoardActifs = pixelBoards.filter((pixelBoard) => {
        if (pixelBoard.mode === 'onePixel' && pixelBoard.status !== 'actif') {
            return false;
        } 

        if (new Date(pixelBoard.dateFin) <= Date.now()) {
            return false;
        }

        return true;
    }
    );

    const pixelBoardInactif = pixelBoards.filter((pixelBoard) => {
        if (pixelBoard.mode === 'onePixel' && pixelBoard.status !== 'actif') {
            return true;
        } 

        if (new Date(pixelBoard.dateFin) <= Date.now()) {
            return true;
        }

        return false;
    }
    );

    return (<>
    <TopBar/>
        <Container>
        <div className="flexAround">
            <Card style={{marginBottom : '30px'}}>
                <CardBody style={{textAlign : 'center',width : '325px'}} className="bodycard">
                    <h4 id="nb">Number of Pixelers</h4>
                    <h2>{ loading ? "-" : userCount} </h2>
                </CardBody>
            </Card>
            <img src={logo} className="logo"/>
            <Card style={{marginBottom : '30px'}}>
                <CardBody style={{textAlign : 'center',width : '325px'}} className="bodycard">
                    <h4 id="nb">Number of PixelBoards</h4>
                    <h2>{ loading ? "-" : pixelBoardCount}</h2>
                </CardBody>
            </Card>
        </div>
        <div></div>
        <TabBtn tab={tab} setTab={setTab} index={0} name="Active Pixelboards"></TabBtn>
        <TabBtn tab={tab} setTab={setTab} index={2} name="Completed Pixelboards"></TabBtn>
        <hr></hr>
        {tab === 0 ? <PixelBoards pixelBoards={pixelBoardActifs}/> : <PixelBoards pixelBoards={pixelBoardInactif}/>}
    </Container>
    <div style={{ position : 'fixed', zIndex : 1, top : 0, left : 0, width : '100%',padding : '5px'}}>
        <Alert color="danger" isOpen={error} toggle={deleteError}>{error}</Alert>
    </div>
    </>);
};

const TabBtn = ({name, tab, index, setTab}) => {
    let color = index !== tab ? 'primary' : 'secondary';
    return (
        <Button style={{borderRadius:0}} disabled={tab == index} onClick={() => setTab(index)} color={color} size="lg">{name}</Button>
    )
}

export default HomePage;