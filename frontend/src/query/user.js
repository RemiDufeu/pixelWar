
/* eslint-disable linebreak-style */
const { REACT_APP_API_URL } = process.env;
const USER_API_PATH = '/auth';
const USER_ALL = '/all';
const USER = '/user';
const USER_UPDATE_PATH = '/userUpdate';
const USER_UPDATE_PASSWORD_PATH = '/passwordUpdate';
const USER_UPDATE_ROLE_PATH = '/role';
const USER_SIGNUP_PATH = '/signUp';
const USER_LOGIN_PATH = '/signIn';
const USER_LOGIN_TOKEN_PATH = '/signInToken';
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
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
		
	}
};
export const getUser = async (id) => {
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER}/${id}`,
	
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			params:id
			
		},
		);

		
	if (resp.ok) {
		return resp.json();
	}
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	}
};

export const updateUser = async (id,email,nom,prenom) => {
	const body = JSON.stringify({
		email,
		nom,
		prenom
	});
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_UPDATE_PATH}/${id}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			params:id,
			body:body
		}
	);

	if (resp.ok) {
		return resp.json();
	}
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	}
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
	
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
		
	}

	
	if (resp.ok) {
		return resp.json();
	}
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
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
		
	}
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
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
		
	}
}

export const updateRole = async (id,role) => {
	const body = JSON.stringify({
		role
	});
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_UPDATE_ROLE_PATH}/${id}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			params:id,
			body:body
		}
	);

	console.log("RESPONSE"+resp);
	console.log("RESPONSE"+resp.ok);
	console.log("RESPONSE"+resp.status);
	if (resp.ok) {
		return resp.json();
	}
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	}
};

export const deleteUser = async (id) => {
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}/${id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			params:id
		}
	);

	if (resp.ok) {
		return resp.json();
	}
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	}
}
export const updatePassword = async (id,password,newPassword,passwordConfirm) => {
	const body = JSON.stringify({
		password,
		newPassword,
		passwordConfirm
	});
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}${USER_UPDATE_PASSWORD_PATH}/${id}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			params:id,
			body:body
		}
	);

	if (resp.ok) {
		return resp.json();
	}
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	}
};