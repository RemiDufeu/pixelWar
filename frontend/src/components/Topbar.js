import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams 
  } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const TopBar = () => {
    const [id, setId] = useState([]);

    let welcomeUser =null;
    let log = null;

    if (localStorage.getItem("token") != null && localStorage.getItem('token') !== 'null') {
        
        console.log("token : "+localStorage.getItem('token'));
        welcomeUser = <p style={{color: "green"}}>Welcome, You are connected {id}</p>;
        log = <Link to="/Logout">Logout</Link>;

    }else{
        welcomeUser = <p style={{color: "red"}}>Welcome, You are not connected</p>;
        log = <Link to="/SignIn">Login</Link>;
    }

    useEffect(() => {
    const id= JSON.parse(localStorage.getItem('id'));
    if (id) {
        setId(id);
    }
    }, []);

    return (
        <header className="topbar">
            <Link to="/">Home </Link>
            <Link to="/PixelBoard">PixelBoard </Link>
            <Link to="/SignUp">Sign up </Link>
            <Link to="/Admin">Admin </Link>
            <Link to={"/UserDetails/"+id}>UserDetails </Link>
            {log}
            {welcomeUser}
        </header>
    );
};

export default TopBar;


