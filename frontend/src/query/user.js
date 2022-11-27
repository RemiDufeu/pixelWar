import { createPath } from "react-router-dom";

/* eslint-disable linebreak-style */
const { REACT_APP_API_URL } = process.env;
const USER_API_PATH = '/auth';
const USER_ALL = '/all';
//Tempo
const USER = '/user/637a5d65ff0b7b7b0d89a78';
const USER_SIGNUP_PATH = '/signUp';
const USER_LOGIN_PATH = '/signIn';
const USER_LOGIN_TOKEN_PATH = '/signInToken';
const USER_LOGOUT_PATH = '/logout';
const USER_PROFILE_PATH = '/profile';
const USER_PROFILE_UPDATE_PATH = '/profile/update';
const USER_PROFILE_DELETE_PATH = '/profile/delete';


export const getAllUsers = async () => {
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_ALL}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	if (resp.ok) {
		return resp.json();
	}
	if (resp.status === 401) {
		console.log(resp.body);
		console.log(resp);
		console.log('401');
	}
	throw new Error('Unable to get users');
};
export const getUser = async (id) => {
	console.log("TOKEN AVANT"+localStorage.getItem('token'));
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER}`,
	
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			params:id
			
		},
		);
		
		console.log("TOKEN APRES"+localStorage.getItem('token'));
		console.log(" VRAI TOKTEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgyMDdjZjhhYzQ5OGVkYWI3N2JiZjMiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2Njk0OTEwNzgsImV4cCI6MTY3MjA4MzA3OH0.v3tr5kMQFHHsm8VId5DM-E8FLm4S9gusBD0bYuO7aRw")

		
	if (resp.ok) {
		console.log("OOKKKKKKKK RESPONSE");
		return resp.json();
	}
	if (resp.status === 401) {
		console.log(resp.body);
		console.log(resp);
		console.log('401');
	}
	throw new Error('Unable to get user');
};

export const postUser = async (nom, prenom, password, passwordConfirm, email) => {
	console.log(`${REACT_APP_API_URL}${USER_API_PATH}${USER_SIGNUP_PATH}`);
	const body = JSON.stringify({
		nom,
		prenom,
		password,
		passwordConfirm,
		email,
	});
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_SIGNUP_PATH}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		
			body: body,

		});
	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to post user');
};

export const loginUser = async (email, password) => {
	const body = JSON.stringify({
		email,
		password,
	});
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_LOGIN_PATH}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: body,
		});
	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to login user');
}

export const loginTokenUser = async (token) => {
	
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_LOGIN_TOKEN_PATH}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization' : 'Bearer '+ token
		},
	})

	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to login user');
}
