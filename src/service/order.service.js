import axios from 'axios';
import config from '../config';
const HTTP_STATUS_OK = 200;

export default {
    async getOrders(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/customer/get_my_orders`, {
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
    },
    async createOrder(token, payload){
        return new Promise(async(resolve, reject)=>{
            const resp = await axios.post(`${config.api}/customer/create_order`,payload, {
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
    async cancelOrder(token, orderId){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/customer/cancel_order/${orderId}`, {
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
    },
    async getDeliveryTimeslots(token){
        return new Promise(async function(resolve, reject){
            const resp = await axios.get(`${config.api}/customer/get_delivery_timeslots`, {
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
    },
    async getOrderPreview(token, body){
        return new Promise(async function(resolve, reject){ 
            const resp = await axios.get(`${config.api}/customer/get_order_preview`,body, {
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
                return reject(resp.data);
            }
        });
    },
    async setDeliveryLocation(token, orderId, body){
        return new Promise(async function(resolve, reject){
            const resp = await axios.post(`${config.api}/customer/set_delivery_location/${orderId}`,body, {
                headers:{
                    'Content-Type': 'application/json',
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