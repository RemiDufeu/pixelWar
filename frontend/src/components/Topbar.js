import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams 
  } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const TopBar = () => {
    const [id, setId] = useState([]);

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
            <Link to="/SignIn">Sign in  </Link>
            <Link to="/SignUp">Sign up </Link>
            <Link to="/Admin">Admin </Link>
            <Link to={"/UserDetails/"+id}>UserDetails </Link>
            <Link to="/Logout">Logout </Link>
        </header>
    );
};

export default TopBar;


