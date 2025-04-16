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
        console.error('Error in getAll', error);
        return [];
    }
};

const createBlog = async newBlog => {
    console.log(token);
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(url, newBlog, config)
    return response.data
}

export default {
    getAll,
    setToken,
    createBlog
};