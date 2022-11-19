/* eslint-disable linebreak-style */
const { REACT_APP_API_URL } = process.env;
const USER_API_PATH = '/users';

export const getAllUsers = async () => {
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to get users');
};

export const postUser = async (name) => {
	const resp = await fetch(`${REACT_APP_API_URL}${USER_API_PATH}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',

			},
			body: name,

		});
	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to post user');
};
