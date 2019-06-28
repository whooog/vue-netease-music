import axios from 'axios'

axios.defaults.baseURL ='http://server.talei.me';

let config = {
    withCredentials:true
};

const  _axios = axios.create(config)

export default _axios