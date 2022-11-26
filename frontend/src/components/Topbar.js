import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

const TopBar = () => {
    
    return (
        <header className="topbar">
            <Link to="/">Home </Link>
            <Link to="/PixelBoard">PixelBoard </Link>
            <Link to="/SignIn">Sign in  </Link>
            <Link to="/SignUp">Sign up </Link>
            <Link to="/Admin">Admin </Link>
            <Link to="/Logout">Logout </Link>
        </header>
    );
};

export default TopBar;