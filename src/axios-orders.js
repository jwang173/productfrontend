import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8081/ProductBackend_war_exploded/helloproducts'
    // baseURL: 'http://127.0.0.1:8086/'
})

export default instance;