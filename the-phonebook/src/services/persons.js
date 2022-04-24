import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj);
    return request.then(res => res.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(res => res.status);
}

const update = (id, newPersonObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonObj);
    return request.then(res => res.data);
}


const personsService = { getAll, create, deletePerson, update };

export default personsService;