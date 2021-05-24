import axios from 'axios';
import config from '../config';

export default {
    async getRecommendedGroceries(token){
        return new Promise(async function(resolve, reject){
            var resp = {}
            try{
                    resp = await axios.get(`${config.api}/customer/get_recommended_groceries`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            catch(err){
                console.log(err);
                reject(resp.data);
            }
            

            if (resp.status == 200){
                return resolve(resp.data);
            }
            else{
                reject(resp.data);
            }
        });
    },
    async getFeaturedItems(){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_groceries/get_featured_items`);

            if (resp.status == 200){
                return resolve(resp.data);
            }
            else{
                reject(resp.data);
            }
        });
    }
}