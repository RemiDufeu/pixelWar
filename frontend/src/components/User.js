/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../query/user';
//import { TopBar} from '../components/Topbar';

// import PropTypes from 'prop-types';

 const User = () => {
    const params = useParams();
    console.log(params)
	/*const [id, setId] = useState([]);
// temporairement jusqu'a trouver un moyen de faire passer l'id depuis topbar
    useEffect(() => {
    const id= JSON.parse(localStorage.getItem('id'));
    if (id) {
        setId(id);
    }
    }, []);*/

	const [user, setUser] = useState([]);
	useEffect(() => {
		getUser(params.id).then((json) => 
        setUser(json.data),
        );
        
	}, []);

	return (
		<section>
			<h1>User details</h1>
			<ul>
                    <li>{user._id}</li>
                    <li>{user.nom}</li>
                    <li>{user.prenom}</li>
                    <li>{user.email}</li>
                    <li>{user.role}</li>
			</ul>
		</section>
	);
};
export default User;

