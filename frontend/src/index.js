/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage />,
	},{
	  path: "/PixelBoard",
	  element: <BoardPage />,
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
