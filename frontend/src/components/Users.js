/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../query/user';
// import PropTypes from 'prop-types';

export const Users = () => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		getAllUsers().then((u) => setUser(u.data));
	}, []);

	return (
		<section>
			<h1>User List</h1>
			<ul>
				{ user.map((u) => (
					<li key={u.id}>
						{u.nom}
						<br />
						{u.prenom}
						<br />
						{u.email}
					</li>
				))}
			</ul>
		</section>
	);
};

// User.propTypes = {

// };
