import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Container, UncontrolledAlert } from 'reactstrap'
import { useUser } from '../lib/useUser';
import { deleteBoard } from '../query/pixelboard';
import Loading from './Loading';
import PreviewBoard from './PreviewBoard';

const PixelBoards = ({pixelBoards, nameTab}) => {
  const [loading, user ] = useUser();
  
  const [error, setError] = useState(null);
  

  if (loading)
    return <Loading></Loading>


  const PixelBoard = ({ pixelBoard }) => {
    return (<Card>
        <CardHeader>
          mode {pixelBoard.mode}
        </CardHeader>
        <CardBody style={{textAlign : 'center'}}>
          <PreviewBoard pixelBoard={pixelBoard} width={200}></PreviewBoard>
          <CardTitle tag="h5">
            {pixelBoard.name}
          </CardTitle>
          <CardSubtitle> date de fin : {new Date(pixelBoard.dateFin).toLocaleDateString()}</CardSubtitle>
          <br></br>
          {(pixelBoard.isPublic || user) ?
            <Button color="primary" href={`/PixelBoard/${pixelBoard._id}`}>Participer</Button> :
            <Button color='secondary' disabled>Privé</Button>
          }
          {user && user.userRole === 'admin' && <Button color="danger" onClick={() => deleteBoard(pixelBoard._id).then(() => window.location.reload())}>Supprimer</Button>}

        </CardBody>
        <CardFooter>
            {pixelBoard.isPublic ? 'public' : 'privé'}
        </CardFooter>
    </Card>
    )
  }

  return (
    <Container>
      { !user && <Alert color="info">Pour accéder à l'ensemble des Pixel Board tu peux créer un compte !</Alert>}
      {error && <UncontrolledAlert color="danger">{error}</UncontrolledAlert>}
      <div className='grid4'>
        {pixelBoards.map((pixelBoard) => <PixelBoard key={pixelBoard._id} pixelBoard={pixelBoard} />)}
      </div>
    </Container>
  )
}

export default PixelBoards
