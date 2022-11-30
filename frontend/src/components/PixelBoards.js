import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Container, UncontrolledAlert } from 'reactstrap'
import { useUser } from '../lib/useUser';
import { getAllActifsBoards } from '../query/pixelboard';

const PixelBoards = () => {

  const [pixelBoards, setPixelBoards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, user ] = useUser();

  useEffect(() => {
    getAllActifsBoards()
    .then((res) => {
      setPixelBoards(res);
    })
    .catch((error) => {
      setError(error);
    });
  }, [])


  const PixelBoard = ({ pixelBoard }) => {
    return (<Card>
        <CardHeader>
          mode {pixelBoard.mode}
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">
            {pixelBoard.name}
          </CardTitle>
          <CardSubtitle> date de fin : {new Date(pixelBoard.dateFin).toLocaleDateString()}</CardSubtitle>
          <br></br>
          {(pixelBoard.isPublic || user) ?
            <Button color="primary" href={`/PixelBoard/${pixelBoard._id}`}>Participer</Button> :
            <Button color='secondary' disabled>Privé</Button>
          }
        </CardBody>
        <CardFooter>
            {pixelBoard.isPublic ? 'public' : 'privé'}
        </CardFooter>
    </Card>
    )
  }

  return (
    <Container>
      <h1>PixelBoards</h1>
      { !user && <Alert color="info">Pour accéder à l'ensemble des Pixel Board tu peux créer un compte !</Alert>}
      {error && <UncontrolledAlert color="danger">{error}</UncontrolledAlert>}
      <div className='grid4'>
        {pixelBoards.map((pixelBoard) => <PixelBoard key={pixelBoard._id} pixelBoard={pixelBoard} />)}
      </div>
    </Container>
  )
}

export default PixelBoards