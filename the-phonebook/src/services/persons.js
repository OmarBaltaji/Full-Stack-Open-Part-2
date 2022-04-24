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


const personsService = { getAll, create };

export default personsService;