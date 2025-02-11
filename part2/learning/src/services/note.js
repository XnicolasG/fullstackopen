import axios from 'axios'
const url = '/api/notes';

let token;

const setToken = newToken => {
    token = `Bearer ${newToken}`
    console.log('Token set:', token)
}

const getAll = () => {
    try {
        const request = axios.get(url);
        return request.then(resp => resp.data)
    } catch (error) {
        console.log('error in getAll', error);
    }
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(url, newObject, config)
    return response.data
}

const update = (id, newObj) => {
    const request = axios.put(`${url}/${id}`, newObj)
    return request.then(resp => resp.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}