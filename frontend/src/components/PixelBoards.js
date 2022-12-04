import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Container, UncontrolledAlert } from 'reactstrap'
import { useUser } from '../lib/useUser';
import { deleteBoard } from '../query/pixelboard';
import Loading from './Loading';
import PreviewBoard from './PreviewBoard';
import { CiPlay1 } from "react-icons/ci";
import {TiEdit, TiTrash} from "react-icons/ti";

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
          <CardSubtitle> End date : {new Date(pixelBoard.dateFin).toLocaleDateString()}</CardSubtitle>
          <br></br>
          {(pixelBoard.isPublic || user) ?
            <Button color="light" href={`/PixelBoard/${pixelBoard._id}`} style={{marginBottom:'10px'}}>Participate <CiPlay1 className='iconbtn'/></Button> :
            <Button color='secondary' disabled>Private</Button>
          }
          <br/>
            {user && user.userRole === 'admin' && <Button color="secondary" href={`/UpdateBoard/${pixelBoard._id}`}> <TiEdit className='iconbtn'/></Button>}
            {user && user.userRole === 'admin' && <Button color="danger" onClick={() => deleteBoard(pixelBoard._id).then(() => window.location.reload())}>
                <TiTrash className='iconbtn'/>
            </Button>}



        </CardBody>
        <CardFooter>
            {pixelBoard.isPublic ? 'public' : 'private'}
        </CardFooter>
    </Card>
    )
  }

  return (
    <Container>
      { !user && <Alert color="info">You have to create an account to access to all pixelboards !</Alert>}
      {error && <UncontrolledAlert color="danger">{error}</UncontrolledAlert>}
      <div className='grid4'>
        {pixelBoards.map((pixelBoard) => <PixelBoard key={pixelBoard._id} pixelBoard={pixelBoard} />)}
      </div>
    </Container>
  )
}

export default PixelBoards
