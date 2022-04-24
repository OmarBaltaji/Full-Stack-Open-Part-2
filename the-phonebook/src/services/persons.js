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


const personsService = { getAll, create, deletePerson };

export default personsService;