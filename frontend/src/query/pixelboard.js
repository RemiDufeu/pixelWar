const { REACT_APP_API_URL } = process.env;
const PIXELBOARD_API_PATH = '/pixelboard';

export const getAllBoards = async () => {
	const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	if (resp.ok) {
		return resp.json();
	} else {
        throw resp.json();
    }
};

export const getAllPublicPixelBoards = async () => {
	const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}/public`);

	if (resp.ok) {
		return resp.json();
	} else {
        throw resp.json();
    }
};

export const getAllActifsBoards = async () => {
	const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}/actif`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	if (resp.ok) {
		return resp.json();
	} else {
        throw resp.json();
    }
};


export const createBoard = async (board) => {
    const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(board),
        });
    if (resp.ok) {
        return resp.json();
    } else {
        throw resp.json();
    }
}

export const getPixelBoard = async (id) => {
	const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}/${id}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	if (resp.ok) {
		return resp.json();
	} else {
        throw resp.json();
    }
};

export const putPixel = async (id, color, x, y) => {
	const resp = await fetch(`${REACT_APP_API_URL}${PIXELBOARD_API_PATH}/pixel/${id}`,
	{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ color, x, y }),
	});
	if (!resp.ok){
		try {
			const error = await resp.json();
			throw new Error(error.error);
		} catch (e) {
			throw new Error(e.message);
		}
	} else {
		return resp.json();
	}
}
