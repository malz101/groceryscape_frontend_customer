import axios from 'axios';
import config from '../config';
const HTTP_STATUS_OK = 200;

export default {
    async getPublicKey(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_customer_account/get_pay_key`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if (resp.status == HTTP_STATUS_OK){
                return resolve(resp.data);
            }
            else{
                reject(resp.data);
            }
        });
    },
    makePayment(token, body){
        return new Promise(async function(resolve, reject){
            const resp = await axios.post(`${config.api}/manage_customer_account/pay`,body, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (resp.status == HTTP_STATUS_OK){
                return resolve(resp.data);
            }
            else{
                reject(resp.data);
            }
        });
    }
}