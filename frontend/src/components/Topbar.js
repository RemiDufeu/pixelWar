import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useUser} from "../lib/useUser";
//import { keepTheme } from '../theme/theme';


//import { setTheme } from '../components/Formsignin'
import '../theme/theme.css';
import { setTheme } from '../theme/theme';

const TopBar = () => {

    const [loading, user] = useUser();
    const [toggle, setToggle] = useState('dark');
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
                <Link to="/">Home </Link>
                <Link to="/PixelBoard">PixelBoard </Link>
                {user.userRole === 'admin' && <Link to="/Admin">Admin </Link> && <Link to="/UserList">UserList </Link>}
                {user.userRole === 'valideur' && <Link to="/Admin">Todo valideur</Link>}
                <Link to={"/UserDetails/" + user.userId}>Profile </Link>
                <Link to="/Logout">Logout</Link>
                <p style={{color: "green"}}>Welcome, You are connected {user.userId}</p>
                <div className="container--toggle">
                        {
                            toggle === "light" ?
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
                            :
                            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
                        }
                        <label htmlFor="toggle" className="toggle--label">
                            <span className="toggle--label-background"></span>
                        </label>
                    </div>
            </> 
            )
    }

    const TopBarNotConnected = () => {
        return (<>
                <Link to="/">Home </Link>
                <Link to="/SignUp">Sign up </Link>
                <Link to="/SignIn">Login</Link>
                <p style={{color: "red"}}>Welcome, You are not connected</p>
            </>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (user) {
        return <TopBarConnected/>;
    } else {
        return <TopBarNotConnected/>;
    }
};

export default TopBar;


