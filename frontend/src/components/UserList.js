/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Table, Button, UncontrolledDropdown, DropdownItem, ButtonGroup, DropdownToggle, DropdownMenu } from 'reactstrap';
import { getAllUsers, deleteUser} from '../query/user';
// import PropTypes from 'prop-types';

export const UserList = () => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		getAllUsers().then((u) => setUser(u.data));
	}, []);

	return (
		<Table striped>
			<thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                { user.map((u) => (
                    <tr key={u._id}>
                        <td>{u._id}</td>
                        <td>{u.nom}</td>
                        <td>{u.prenom}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                            <ButtonGroup>
                                <Button color="primary" href={"/UserSuperUpdateDetails/" + u._id}>
                                    Edit
                                </Button>
                                <Button color="danger" onClick={() => {
                                    deleteUser(u._id);
                                    window.location.reload();
                                }}>
                                    Delete
                                </Button>
                                </ButtonGroup>
                            </td>
                    </tr>
                ))}
            </tbody>
            </Table>
    );
};