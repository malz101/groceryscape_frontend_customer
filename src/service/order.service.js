import axios from 'axios';
import config from '../config';
const HTTP_STATUS_OK = 200;

export default {
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
    setDeliveryLocation(token, orderId, body){
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