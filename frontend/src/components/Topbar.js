import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useUser} from "../lib/useUser";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText, Dropdown,
} from 'reactstrap';
import {getUser} from '../query/user';
//import { keepTheme } from '../theme/theme';


//import { setTheme } from '../components/Formsignin'
import '../theme/theme.css';
import {setTheme} from '../theme/theme';
import {BiUser} from "react-icons/bi";

const TopBar = () => {

    const [loading, user] = useUser();
    const [toggle, setToggle] = useState('dark');
    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);
    const [userInfos, setUserInfos] = useState([]);
    useEffect(() => {
        if (user) {
            getUser(user.userId).then((json) =>
                setUserInfos(json.data),
            );
        }
    }, [user]);

    let theme = localStorage.getItem('theme');
    /* useEffect(() => {
         keepTheme();
     })*/
    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setToggle('light')
        } else {
            setTheme('theme-dark');
            setToggle('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setToggle('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setToggle('light')
        }
    }, [theme])
    const TopBarConnected = () => {
        return (
            <>
                <Navbar fixed="top" container="fluid" color="light" full="false" expand="md">
                    <NavbarBrand href="/">PixelWar</NavbarBrand>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        {user.userRole === 'admin' && <NavItem>
                            <NavLink href={"/Admin"}>Create Pixelboard</NavLink>
                        </NavItem>}
                        {user.userRole === 'admin' && <NavItem>
                            <NavLink href={"/UserList"}>Users List</NavLink>
                        </NavItem>}
                    </Nav>
                    <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <BiUser className='iconuser'/>
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: 'bold'
                                }}>Logged as {userInfos.prenom} {userInfos.nom}   </span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink href={"/UserDetails/" + user.userId}>
                                        Profile
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink href={"/Contributions/" + user.userId}>Contributions</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink className='logout' href={"/Logout"}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <br/>
                <br/>
                <div className="container--toggle">
                    {
                        toggle === "light" ?
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick}
                                   checked/>
                            :
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick}/>
                    }
                    <label htmlFor="toggle" className="toggle--label">
                        <span className="toggle--label-background"></span>
                    </label>
                </div>
            </>
        )
    }

    const TopBarNotConnected = () => {
        return (
            <>
                <Navbar fixed="top" container="fluid" color="light" full="false" expand="md">
                    <NavbarBrand href="/">Pixel War</NavbarBrand>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/SignUp">Sign Up</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='logout' href={"/SignIn"}>Sign In</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <br/>
                <br/>
                <div className="container--toggle">
                    {
                        toggle === "light" ?
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick}
                                   checked/>
                            :
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick}/>
                    }
                    <label htmlFor="toggle" className="toggle--label">
                        <span className="toggle--label-background"></span>
                    </label>
                </div>
            </>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (user) {
        console.log(user)
        return <TopBarConnected/>;
    } else {
        return <TopBarNotConnected/>;
    }
};

export default TopBar;


