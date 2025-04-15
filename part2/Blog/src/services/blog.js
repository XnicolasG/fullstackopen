import axios from 'axios';
const url = '/api/blog';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    try {
        const request = await axios.get(url);
        return request.data;
    } catch (error) {
        console.log('Error in getAll', error);
        return []; 
    }
};

export default {
    getAll,
    setToken
};