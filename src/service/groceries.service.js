import axios from 'axios';
import config from '../config';

export default {
    async getGroceries(){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_groceries/get_groceries`);

            if (resp.status == 200){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        });
    },
    async rateGrocery(token, body){
        return new Promise(async function(resolve, reject){
            const resp = await axios.post(`${config.api}/customer/rate_grocery`,body,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });

            if (resp.status == 200){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        });
    },
    async getItemRating(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/customer/get_item_rating`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if (resp.status == HTTP_STATUS_OK){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        });
    }
}