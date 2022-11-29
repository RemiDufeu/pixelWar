/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import UserDetails from './pages/UserPage';
import Logout from './components/Logout';
import UserUpdateDetails from "./pages/UserUpdatePage";


const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage />,
	},{
	  path: "/PixelBoard/:id",
	  element: <BoardPage />,
	},{
	  path: "/SignUp",
	  element: <SignUp />,
	},{
	  path: "/SignIn",
	  element: <SignIn />,
	}, {
	  path : '/Admin',
	  element : <AdminPage />,

	}, {
		path : '/UserDetails/:id',
		element : <UserDetails />,
	}, {
		path : '/Logout',
		element : <Logout />,
	}, {
		path : '/UserUpdateDetails/:id',
		element : <UserUpdateDetails />,
	}


  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
