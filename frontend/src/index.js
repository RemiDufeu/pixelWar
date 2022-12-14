/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	createHashRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { keepTheme } from './theme/theme';
import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import UserDetails from './pages/UserPage';
import Logout from './components/Logout';
import UserUpdateDetails from "./pages/UserUpdatePage";
import AdminUserListPage from "./pages/AdminUserListPage";
import UserSuperUpdatePage from "./pages/UserSuperUpdatePage";
import ContributionPage from "./pages/ContributionsPage";
import UpdateBoardPage from './pages/UpdateBoardPage';


const router = createHashRouter([
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
	}, {
		path : '/UserList',
		element : <AdminUserListPage />,
	}, {
		path : '/UserSuperUpdateDetails/:id',
		element : <UserSuperUpdatePage />,
	}, {
		path : '/Contributions/:id',
		element : <ContributionPage />,
	}, {
		path : '/UpdateBoard/:id',
		element : <UpdateBoardPage />,
	}


  ]);
 
  function App() {
	useEffect(() => {
		keepTheme();
	})
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	
	<React.StrictMode>
		<RouterProvider router={router}/>
		<App/>
	</React.StrictMode>,
	
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
