/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    UncontrolledDropdown,
    DropdownItem,
    ButtonGroup,
    DropdownToggle,
    DropdownMenu,
    Container
} from 'reactstrap';
import { getAllUsers, deleteUser} from '../query/user';
import { TbUsers } from "react-icons/tb";
import { TiEdit,TiTrash } from "react-icons/ti";
export const UserList = () => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		getAllUsers().then((u) => setUser(u.data));
	}, []);

	return (
        <Container>
            <h2 className="titre" style={{color:'#1562c2'}}><TbUsers className='icon'/>
                List of users</h2>
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
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
                                <Button color="primary" href={"/#/UserSuperUpdateDetails/" + u._id}>
                                    <TiEdit className='iconbtn'/>
                                </Button>
                                <Button color="danger" onClick={() => {
                                    deleteUser(u._id);
                                    window.location.reload();
                                }}>
                                    <TiTrash className='iconbtn'/>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

        </Container>
    );
};