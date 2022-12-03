const { REACT_APP_API_URL } = process.env;
const PIXEL_API_PATH = '/pixel';

export const getUserPixel = async (id,x,y) => {
    const resp = await fetch(`${REACT_APP_API_URL}${PIXEL_API_PATH}/userPixel/${id}/${x}/${y}`,
        {
            method: 'GET'
        });
    if (resp.ok) {
        return resp.json();
    } else {
        throw resp.json();
    }
};
export const getAllPixelBoardsByUser = async (id) => {
    const resp = await fetch(`${REACT_APP_API_URL}${PIXEL_API_PATH}/allPixelBoardsByUser/${id}`,
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

export const getNbPixelsByUser = async (id) => {
    const resp = await fetch(`${REACT_APP_API_URL}${PIXEL_API_PATH}/nbPixelsByUser/${id}`,
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

