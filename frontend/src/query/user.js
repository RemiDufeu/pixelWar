/* eslint-disable linebreak-style */
const { REACT_APP_API_URL } = process.env;
const USER_API_PATH = '/auth';
const USER_ALL = '/all';
const USER_SIGNUP_PATH = '/signUp';
const USER_LOGIN_PATH = '/signIn';
const USER_LOGIN_TOKEN_PATH = '/signInToken';
const USER_LOGOUT_PATH = '/logout';
const USER_PROFILE_PATH = '/profile';
const USER_PROFILE_UPDATE_PATH = '/profile/update';
const USER_PROFILE_DELETE_PATH = '/profile/delete';


export const getAllUsers = async () => {
	console.log(localStorage.getItem('token'))
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
