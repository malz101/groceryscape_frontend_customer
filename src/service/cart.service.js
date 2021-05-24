import axios from 'axios';
import config from '../config';

export default{
    async getCart(token){
        return new Promise(async (resolve, reject)=>{
            let resp = {};
            try {
                resp = await axios.get(`${config.api}/manage_cart/get_cart_items`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                if(resp.status==200){
                    return resolve(resp.data);
                }
                else{
                    return reject(resp.data);
                }
            } catch (error) {
                console.log(error);
            }
            
        })
    },
    async addToCart(token, body){
        return new Promise(async(resolve, reject)=>{
            const resp = await axios.post(`${config.api}/manage_cart/addToCart`, body, {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(resp.status==201){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        })
    },
    async emptyCart(token){
        return new Promise(async(resolve, reject)=>{
            const resp = await axios.get(`${config.api}/manage_cart/empty_cart`, {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(resp.status==200){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        });
    },
    async removeItemFromCart(token, groceryId){
        return new Promise(async(resolve, reject)=>{
            const resp = await axios.get(`${config.api}/manage_cart/removeFromCart/${groceryId}`, {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(resp.status==200){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        });
    },
    async updateCart(token, body){
        return new Promise(async(resolve, reject)=>{
            const resp = await axios.post(`${config.api}/manage_cart/update_cart`, body, {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(resp.status==200){
                return resolve(resp.data);
            }
            else{
                return reject(resp.data);
            }
        })
    },
}