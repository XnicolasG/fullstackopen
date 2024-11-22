import axios from 'axios'
const url = '/api/notes';

const getAll = () => {
    try {
        const request = axios.get(url);
        return request.then(resp => resp.data)
    } catch (error) {
        console.log('error in getAll');
    }
};

const create = newObj => {
    const request = axios.post(url, newObj);
    return request.then(resp => resp.data)
};

const update = (id, newObj) => {
    const request = axios.put(`${url}/${id}`, newObj)
    return request.then(resp => resp.data)
}

export default {
    getAll,
    create,
    update
}