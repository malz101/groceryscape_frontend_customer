import axios from 'axios';
import config from '../config';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

export default {
    async login(body){
        return new Promise(async(resolve, reject)=>{
            try{
                const resp = await axios.post(`${config.api}/manage_customer_account/login`, body);

                if(resp.status==HTTP_STATUS_OK){
                    return resolve(resp.data);
                }
                return reject(resp.data);
            }
            catch{
                return reject({status:500})
            }
        });
    },
    async register(body){
        return new Promise(async(resolve, reject)=>{
            try{
                const resp = await axios.post(`${config.api}/manage_customer_account/signup`, body);

                if(resp.status==HTTP_STATUS_CREATED){
                    return resolve(resp.data);
                }
                return reject(resp.data);
            }
            catch{
                return reject({status:500})
            }
        })
    },
    async logout(token){
        return new Promise(async(resolve, reject)=>{
            try{
                const resp = await axios.get(`${config.api}/manage_customer_account/logout`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });

                if(resp.status==200){
                    return resolve(resp.data);
                }
                return reject(resp.data);
            }
            catch{
                return reject({status:500})
            }
        })
    },
    async getCustomer(token){
        return new Promise(async(resolve, reject)=>{
            try{
                const resp = await axios.get(`${config.api}/manage_customer_account/get_customer`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });

                if(resp.status==200){
                    return resolve(resp.data);
                }
                return reject(resp.data);
            }
            catch{
                return reject({status:500})
            }
        })
    }
}