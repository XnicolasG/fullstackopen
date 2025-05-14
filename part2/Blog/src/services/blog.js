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
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(url, newBlog, config)
    return response.data
}

const updateBlog = async (id, newObj) =>{
    const request = await axios.put(`${url}/${id}`, newObj)
    return request.data
}

const deleteBlog = async (id) => {
    console.warn(token);
    
    const config = {
        headers: { Authorization: token },
    }
    console.log('config: ', config.headers.Authorization);
    
    const response = await axios.delete(`${url}/${id}`, config);
    if (response.status === 204) return true; 
    
    throw new Error("Failed to delete blog");
};

export default {
    getAll,
    setToken,
    createBlog,
    updateBlog,
    deleteBlog
};