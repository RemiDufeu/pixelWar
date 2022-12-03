import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useUser} from "../lib/useUser";

const TopBar = () => {

    const [loading, user] = useUser();

    const TopBarConnected = () => {
        return (
            <>
                <Link to="/">Home </Link>
                <Link to="/PixelBoard">PixelBoard </Link>
                {user.userRole === 'admin' && <Link to="/Admin">Admin </Link>}
                {user.userRole === 'admin' && <Link to="/UserList">UserList </Link>}
                {user.userRole === 'valideur' && <Link to="/Admin">Todo valideur</Link>}
                <Link to={"/UserDetails/" + user.userId}>Profile </Link>
                <Link to="/Logout">Logout</Link>
                <p style={{color: "green"}}>Welcome, You are connected {user.userId}</p>
            </>)
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


