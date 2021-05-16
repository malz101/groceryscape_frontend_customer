import axios from 'axios';
import config from '../config';
const HTTP_STATUS_OK = 200;

export default {
    async getOrders(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_customer_account/get_my_orders`, {
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
    async getItemRating(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_customer_account/get_item_rating`, {
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
    async getDeliveryTimeslots(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/manage_customer_account/get_delivery_timeslots`, {
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
    async getOrderPreview(token, body){
        return new Promise(async function(resolve, reject){ 
            const resp = await axios.get(`${config.api}/manage_customer_account/get_order_preview`,body, {
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
    async scheduleOrder(token, body){
        return new Promise(async function(resolve, reject){
            const resp = await axios.post(`${config.api}/manage_order/schedule_order`,body, {
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
    async setDeliveryLocation(token, orderId, body){
        return new Promise(async function(resolve, reject){
            const resp = await axios.post(`${config.api}/manage_customer_account/set_delivery_location/${orderId}`,body, {
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