<template>
  <div class="checkout">
    <div class="checkout-header">
      <h5>Checkout</h5>
      <p>Home / Checkout</p>
    </div>

    <!-- Modal Structure -->
    <div id="checkout-success-modal" class="modal">
      <div class="modal-content">
        <h6>Checkout successful</h6>
        <p>You may return to the store to continue shopping</p>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-close btn-flat">Close</a>
      </div>
    </div>

    <div id="checkout-failed-modal" class="modal">
      <div class="modal-content">
        <h6>Checkout failed</h6>
        <p>Please try again</p>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-close btn-flat">Close</a>
      </div>
    </div>

    <div class="section vld-parent">      
        <div class="container billing-container">
            <h6>Billing Information</h6>
            <div class="billing-grid">
                <div class="column-1">
                    <form action="">
                        <div>
                            <label for="first_name">First Name</label>
                            <input type="text" name="first_name" id="first_name" v-model="firstName" required>
                        </div>
                        <div>
                            <label for="last_name">Last Name</label>
                            <input type="text" name="last_name" id="last_name" v-model="lastName" required>
                        </div>
                        <div>
                            <label for="street">Street</label>
                            <input type="text" name="street" id="street" v-model="street" required>
                        </div>
                        <div>
                            <label for="town">Town</label>
                            <input type="text" name="town" id="town" v-model="town" required>
                        </div>
                        <div>
                            <label for="parish">Parish</label>
                            <input type="text" name="parish" id="parish" v-model="parish" required>
                        </div>
                        <div>
                            <label for="phone">Phone</label>
                            <input type="text" name="phone" id="phone" v-model="phone" required>
                        </div>
                        <div>
                            <label for="email">Email address</label>
                            <input type="text" name="email" id="email" v-model="email" required>
                        </div>
                        <div>
                            <select class="browser-default" name="deliveryDate" id="deliveryDate" v-model="deliveryDate">
                                <option value="" disabled selected>Choose delivery date</option>
                                <option v-for="date of Object.keys(slots)" :key="date" :value="date">{{date}}</option>
                            </select>
                        </div>
                        <div>
                            <select class="browser-default" name="deliveryTime" id="deliveryTime" v-model="deliveryTime">
                                <option value="" disabled selected>Choose delivery time</option>
                                <option v-for="slot of slots[deliveryDate]" :key="slot.id" :value="slot['id']">{{slot['start_time']}}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="column-2">
                    <label>Order Notes</label>
                    <textarea name="notes" id="notes" v-model="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
            </div>
            <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" :color="'#080'" />
        </div>
    </div>
    <div class="section vld-parent">
        <div class="container order-container">
            <h5>Your Order</h5>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cartItem of cart" :key="cartItem['grocery_id']">
                        <td>{{cartItem['name']}} x{{cartItem['quantity']}}</td>
                        
                        <td>${{cartItem['cost_before_tax']}}</td>
                    </tr>
                    <tr>
                        <th>Subtotal</th>
                        <td>${{cart.reduce((accumulator, item) => accumulator + Number.parseFloat(item['cost_before_tax']), 0).toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <th>Tax:</th>
                        <td>${{cart.reduce((accumulator, item) => accumulator + Number.parseFloat(item['GCT']), 0).toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <td><b>${{cart.reduce((accumulator, item) => accumulator + (Number.parseFloat(item['cost_before_tax'])+Number.parseFloat(item['GCT']))*Number.parseInt(item['quantity']), 0).toFixed(2)}}</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p>
                    <label for="cash">
                        <input type="radio" @change="cashChosen" name="payment" id="cash" value="cash" v-model="paymentMethod">
                        <span>Cash on Delivery</span>
                    </label>
                </p>
                <p>
                    <label for="direct">
                        <input type="radio" @change="cardChosen" name="payment" id="direct" value="direct" v-model="paymentMethod">
                        <span>Direct Bank Transfer</span>
                    </label>
                </p>
            </div>
            
            <div class="section stripe-card">
                <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" :color="'#080'" />
                <div id="card-element"></div>
            </div>
            <a @click="placeOrder" class="btn order-btn primary-bg-color">Place Order</a>
        </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters} from 'vuex';
import {loadStripe} from '@stripe/stripe-js';

export default {
    data(){
        return{
            firstName:'',
            lastName:'',
            country:'',
            town:'',
            parish:'',
            phone:'',
            email:'',
            street:'',
            deliveryTime:'',
            deliveryDate:'',
            notes:'',
            paymentMethod:'cash',
            stripe: {},
            cardElement:{},
            isLoading:true,
            slots:{}
        }
    },
    async created(){
        this.isLoading = true;
        await this.getCart();
        await this.getCustomer();
        await this.getDeliveryTimeslots();
        this.firstName = this.customer['first_name'];
        this.lastName = this.customer['last_name'];
        this.email = this.customer['email'];
        this.phone = this.customer['telephone'];
        this.parish = this.customer['parish'];
        this.town = this.customer['town'];
        this.street = this.customer['street'];
        this.country = 'Jamaica';
        await this.getPublicKey();
        this.stripe = await loadStripe(this.stripeKey);

        for(let slot of this.timeslots){
            if(!(slot['date'] in this.slots)){
                this.slots[slot['date']] = [slot['timeslot']];
            }
            else{
                this.slots[slot['date']].push(slot['timeslot']);
            }
        }

        this.isLoading = false;
    },
    mounted(){
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    },
    computed:{
        ...mapGetters(['cart', 'customer', 'stripeKey', 'timeslots', 'orderPreview'])
    },
    methods:{
        ...mapActions(['getCart', 'getCustomer', 'createOrder', 'getPublicKey', 'makePayment', 'setDeliveryLocation','scheduleOrder', 'getDeliveryTimeslots', 'getOrderPreview']),
        async placeOrder(){
            
            /**
             * Regardless of the type of payment that the user chose this steps will always be taken when checking out a user
             * The checkout action will create an order and return its id to be used to schedule the order by setting the delivery
             * date and time. The id will also be used to set the delivery location.s
             */
            try{
                if(this.street == ''){
                    M.toast({html: 'Enter street name'});
                    return;
                }

                if(this.deliveryDate == ''){
                    M.toast({html: 'Set delivery date'});
                    return;
                }

                if(this.deliveryTime == ''){
                    M.toast({html: 'Set delivery time'});
                    return;
                }

                let resp = await this.createOrder();
                if(!resp){
                    M.toast({html: 'An error occurred. Please try again.'});
                    return;
                }
                
                let orderId = resp['order']['order_id'];

                let deliveryForm = new FormData();
                deliveryForm.set('parish', this.parish);
                deliveryForm.set('town', this.town);
                deliveryForm.set('street', this.street);

                await this.setDeliveryLocation({'orderId': orderId, 'body': deliveryForm});

                let scheduleForm = new FormData();
                scheduleForm.set('order_id', orderId);
                scheduleForm.set('date', this.deliveryDate);
                scheduleForm.set('timeslot', this.deliveryTime);

                await this.scheduleOrder(scheduleForm);

                if(this.paymentMethod == 'direct'){
                    console.log(this.paymentMethod);
                    this.isLoading = true;
                    let result = await this.stripe.createPaymentMethod({
                        type: 'card',
                        card: this.cardElement,
                        billing_details: {
                        // Include any additional collected billing details.
                            name:`${this.firstName} ${this.lastName}`,
                        },
                    });

                    if(result.error){
                        this.isLoading = false; 
                        console.log(result.error);
                        M.toast({html: 'An error occurred. Please refresh and try again'});
                    }
                    else{
                        let paymentForm = new FormData();
                        paymentForm.set("payment_method_id", result.paymentMethod.id);
                        paymentForm.set("order_id", orderId);
                        await this.makePayment(paymentForm);
                        console.log('Making card payment.');
                        this.isLoading = false;  
                        M.toast({html: 'Payment Complete. Checkout Successful!'});
                        this.$router.push('/');
                    }   
                    return; 
                }
                else{
                    M.toast({html: 'Checkout Successful! Your order has been placed.'});
                    this.$router.push('/');
                    return;
                }
            }
            catch(err){
                this.isLoading = false; 
                console.log(err);
                M.toast({html: 'An error occurred. Please try again.'});
            }
        },
        cardChosen(){
            var elements = this.stripe.elements();
            var style = {
                base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a"
                },
            };

            this.cardElement = elements.create('card', {style: style});
            this.cardElement.mount('#card-element');
        },
        cashChosen(){
            this.cardElement.unmount();
        }
    },
    
}
</script>

<style lang="scss" scoped>

.primary-bg-color{
    background: var(--bg-primary);
}

.checkout-header{
  text-align: center;
  background: #00242c;
  color: white;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;

  h5{
    margin-top: 0;
    font-size: 32px;
  }
  p{
    font-size: 10px;
  }
}

.billing-container, .order-container{
    padding: 30px 24px;
    border: 2px solid #f0f0f0;
}

.billing-grid{
    display: flex;
    gap: 20px;

    label{
        font-size: 0.8em;
    }

    form{
        input[type=text]{
            border: 1px solid #9e9e9e;
            border-radius: 2px;
            box-sizing: border-box;
            padding-left: 8px;
            font-size: 0.9em;
        }
        #deliveryTime{
            display: block;
        }
    }
    form > *{
        margin-bottom: 20px;
    }
    textarea{
        padding: 8px;
        font-size: 0.9em;
    }
}

.billing-grid > *{
    width: 100%;
}

.stripe-card{
    max-width: 400px;
    margin-top:8px;
    margin-bottom: 16px;
}

.order-btn{
    text-transform: none;
}

</style>