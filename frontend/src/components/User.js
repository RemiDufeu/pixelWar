/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {deleteUser, getUser} from '../query/user';
import { Container,ButtonGroup, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle } from 'reactstrap';
//import { TopBar} from '../components/Topbar';

// import PropTypes from 'prop-types';

 const User = () => {
    const params = useParams();
    console.log(params)

	const [user, setUser] = useState([]);
	useEffect(() => {
		getUser(params.id).then((json) => 
        setUser(json.data),
        );
        
	}, []);

	return (
		<Container style={{marginTop: "50px", paddingLeft:"10%",paddingRight:"10%"}}>
		<Card>
        <CardHeader>
		Profile Info
        </CardHeader>
        <CardBody style={{textAlign : 'center'}}>
          <CardTitle tag="h5">
           ID:  {user._id}
          </CardTitle>
          <CardSubtitle> Lastname: {user.nom}</CardSubtitle>
		  <CardSubtitle> Name: {user.prenom}</CardSubtitle>
		  <CardSubtitle> Email: {user.email}</CardSubtitle>
		  <CardSubtitle> Role: {user.role}</CardSubtitle>
          <br></br>
          
        </CardBody>
        <CardFooter>
		<ButtonGroup>
		   <Button color="primary" href={"/UserUpdateDetails/" + user._id}>
			   Edit
		   </Button>
	   </ButtonGroup>
        </CardFooter>
    </Card>
	</Container>
	);
};
export default User;

