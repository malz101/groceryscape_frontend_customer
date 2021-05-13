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

    <div class="section">      
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
                            <label for="deliveryDate">Delivery date: </label>
                            <date-picker v-model="deliveryDate"></date-picker>
                        </div>
                        <div>
                            <select class="browser-default" name="deliveryTime" id="deliveryTime">
                                <option value="" disabled selected>Choose delivery time</option>
                                <option value="9">09:00</option>
                                <option value="10">10:00</option>
                                <option value="11">11:00</option>
                                <option value="12">12:00</option>
                                <option value="13">13:00</option>
                                <option value="14">14:00</option>
                                <option value="15">15:00</option>
                                <option value="16">16:00</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="column-2">
                    <label>Order Notes</label>
                    <textarea name="notes" id="notes" v-model="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="section">
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
                <loading :active.sync="isLoading" />
                <div id="card-element"></div>
            </div>
            <a @click="placeOrder" class="btn primary-bg-color">Place Order</a>
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
            deliveryTime:'',
            deliveryDate:null,
            notes:'',
            paymentMethod:'cash',
            stripe: {},
            cardElement:{},
            isLoading:true
        }
    },
    async created(){
        this.isLoading = true;
        await this.getCart();
        await this.getCustomer();

        this.firstName = this.customer['first_name'];
        this.lastName = this.customer['last_name'];
        this.email = this.customer['email'];
        this.phone = this.customer['telephone'];
        this.parish = this.customer['parish'];
        this.town = this.customer['town'];
        this.country = 'Jamaica';

        await this.getPublicKey();
        this.stripe = await loadStripe(this.stripeKey);
        this.isLoading = false;
    },
    mounted(){
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    },
    methods:{
        ...mapActions(['getCart', 'getCustomer', 'checkoutCart', 'getPublicKey', 'makePayment', 'setDeliveryLocation','scheduleOrder']),
        async placeOrder(){
            try{
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
                    console.log(result.error);
                }
                else{
                    let resp = await this.checkoutCart();

                    if(!resp){
                        M.toast({html: 'An error occurred. Please try again.'});
                        return;
                    }
                    
                    let orderId = resp['order']['order_id'];

                    let deliveryForm = new FormData();
                    deliveryForm.set('parish', this.parish);
                    deliveryForm.set('town', this.town);

                    await this.setDeliveryLocation({'orderId': orderId, 'body': deliveryForm});

                    let scheduleForm = new FormData();
                    scheduleForm.set('order_id', orderId);
                    scheduleForm.set('date', this.deliveryDate);

                    await this.scheduleOrder(scheduleForm);

                    let paymentForm = new FormData();
                    paymentForm.set("payment_method_id", result.paymentMethod.id);
                    paymentForm.set("order_id", orderId);
                    await this.makePayment(paymentForm);
                }   
                this.isLoading = false;  
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
    computed:{
        ...mapGetters(['cart', 'customer', 'stripeKey'])
    }
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

</style>