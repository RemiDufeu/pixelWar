/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Table, Button, UncontrolledDropdown, DropdownItem, ButtonGroup, DropdownToggle, DropdownMenu } from 'reactstrap';
import { getAllUsers } from '../query/user';
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
                                <Button color="primary">
                                    Edit
                                </Button>
                                <ButtonGroup>
                                    <UncontrolledDropdown>
                                    <DropdownToggle caret color="primary">
                                        Role
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => {}}>
                                        User
                                        </DropdownItem>
                                        <DropdownItem>
                                        Admin
                                        </DropdownItem>
                                    </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ButtonGroup>
                                <Button color="danger">
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