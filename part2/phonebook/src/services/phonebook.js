import axios from 'axios'
const url = '/api/persons'

const getData = () => {
    const request = axios.get(url)
    return request.then(resp => resp.data)
}
const addData = newObj => {
    const request = axios.post(url, newObj);
    return request.then(resp => resp.data)
}
const deleteData = id => {
    console.log(id);
    const request = axios.delete(`${url}/${id}`)
    return request.then(resp => resp.data)    
}
const updateData = (id,newObj) => {
    const request = axios.put(`${url}/${id}`, newObj);
    return request.then(resp => resp.data)
}
export default {
    getData,
    addData,
    deleteData,
    updateData
}