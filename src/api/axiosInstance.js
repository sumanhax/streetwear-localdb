import axios from "axios";
import {base_url} from '../api/URL'


const axiosInstance=axios.create({
    baseURL:base_url
})

axiosInstance.interceptors.request.use(
    async function (config) {
       const token=sessionStorage.getItem("token");
       if(token){
        config.headers["x-access-token"]=token;
        // config.headers.Authorization=token
        // config.headers.Authorization=`Bear ${token}`
       } 
       return config;
    },
    function(err){
        return Promise.reject(err)
    }
    
)

export default axiosInstance