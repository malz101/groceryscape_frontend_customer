import axios from 'axios';
import config from '../config';

export default {
    async getRecommendedGroceries(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_customer_account/get_recommended_groceries`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if (resp.status == 200){
                return resolve(resp.data);
            }
            else{
                reject(resp.data);
            }
        });
    }
}