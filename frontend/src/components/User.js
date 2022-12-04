/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {deleteUser, getUser} from '../query/user';
import { Container,ButtonGroup, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle } from 'reactstrap';
import {AiFillSecurityScan} from "react-icons/ai";
import { RiPencilLine } from "react-icons/ri";
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
		<Container>
			<h2 className="titre" style={{color:'#1562c2'}}><AiFillSecurityScan className='icon'/>
				Personal Informations</h2>
		<Card style={{
			width: '40rem',
			margin: '0 auto',
			float: 'none',
			marginBottom: '50px',
			boxShadow: '8px 8px 10px 0 rgb(211,211,211)',

		}}>
        <CardHeader>
		Profile Info
        </CardHeader>
        <CardBody className="infos">
          <CardSubtitle> Lastname: {user.nom}</CardSubtitle>
		  <CardSubtitle> Name: {user.prenom}</CardSubtitle>
		  <CardSubtitle> Email: {user.email}</CardSubtitle>
		  <CardSubtitle> Role: {user.role}</CardSubtitle>
          
        </CardBody>
        <CardFooter>
		<ButtonGroup>
		   <Button color="primary" href={"/#/UserUpdateDetails/" + user._id}>
			   Edit profile <RiPencilLine className='iconbtn'/>
		   </Button>
	   </ButtonGroup>
        </CardFooter>
    </Card>
	</Container>
	);
};
export default User;

