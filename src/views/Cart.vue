<template>
    <div class="cart">
        <div class="cart-header">
            <h5>Cart</h5>
            <p>Home / Cart</p>
        </div>
        <div class="section vld-parent">
            <div v-if="!isLoading" class="container">
                <table v-if="cart.length>0" class="cart-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th class="empty-cart"> <a @click="clearCart" :class="{'disabled':cart.length==0}" class="btn-small"><i class="material-icons tiny">delete</i></a> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cartItem of cart" :key="cartItem['grocery_id']">
                            <td><img class="item-img" :src="`${api}/uploads/${cartItem['photo']}`" alt="Cart item image"></td>
                            <td> {{cartItem['name']}} </td>
                            <td> ${{cartItem['cost_before_tax']}} </td>
                            <td> 
                                <input v-if="isCartUpdating && (cartItem['grocery_id']!=updatingId)" type="text" :value="cartItem['quantity']" class="cart-quantity">
                                <input v-else-if="!isCartUpdating" @change="quantityChange(cartItem['grocery_id'], cartItem['quantity'])" class="cart-quantity" type="number" :value="cartItem['quantity']" /> 
                                <input v-else @change="quantityChange(cartItem['grocery_id'], cartItem['quantity'])" class="cart-quantity" type="number" v-model="newQuantity" /> 
                            </td>
                            <td> ${{cartItem['cost_before_tax'] * cartItem['quantity']}} </td>
                            <td class="empty-cart"> <a @click="removeFromCart(cartItem['grocery_id'])" class="btn-small"><i class="material-icons tiny">close</i></a> </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><a @click="updateCartQuantity" class="btn update-cart-btn" :class="{'disabled':!isCartUpdating}">Update Cart</a></td>
                        </tr>
                    </tbody>
                    
                </table>
                <p class="empty-cart-p" v-else>
                    <span>Cart Empty</span>
                    <img src="../assets/shopping-cart.svg" alt="Grocery Cart">
                </p>
                <table class="totals-table">
                    <tbody>
                        <tr>
                            <th>Subtotal:</th>
                            <td>${{cart.reduce((accumulator, item) => accumulator + Number.parseFloat(item['cost_before_tax'])*Number.parseInt(item['quantity']), 0).toFixed(2)}}</td>
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
                <a :class="{'disabled':cart.length==0}" href="/checkout" class="btn checkout-btn">Proceed To Checkout</a>
            </div>
            <div class="container loading">
                <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" />
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config';
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            isCartUpdating:false,
            updatingId:'',
            newQuantity:1,
            api:'',
            isLoading:true
        }
    },
    async created(){
        this.isLoading = true;
        await this.getCart();
        this.api = config.api;
        this.isLoading = false;
    },
    methods:{
        ...mapActions(['getCart', 'emptyCart', 'removeItemFromCart', 'updateCart']),
        async clearCart(){
            await this.emptyCart();
        },
        async removeFromCart(groceryId){
            await this.removeItemFromCart(groceryId);
        },
        quantityChange(groceryId, amount){
            if(!this.isCartUpdating){
                this.isCartUpdating = true;
                this.newQuantity = amount;
                this.updatingId = groceryId;
                return;
            }
            if(this.newQuantity<0){
                this.newQuantity = 0;
            }
        },
        async updateCartQuantity(){
            let updateCartForm = new FormData();
            updateCartForm.set('item_id', this.updatingId);
            updateCartForm.set('quantity', this.newQuantity);
            let resp = await this.updateCart(updateCartForm);
            
            if(resp){
                M.toast({html: 'Cart updated'});
            }
            else{
                M.toast({html: 'Update failed. Please try again.'});
            }
            this.isCartUpdating = false;
            return;
        }
    },
    computed:{
        ...mapGetters(['cart'])
    }
}
</script>

<style lang="scss" scoped>
.cart-header{
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

.section{
    background:var(--color-accent);
}
.cart-table{
    margin-bottom: 16px;
    td:nth-child(1), th:nth-child(1){
        width: 150px;
    }
    .empty-cart{
        display: flex;
        flex-direction: column;

        span{
            font-size:2em ;
            font-weight: bold;
        }
    }
    th{
        padding-left: 0;
    }
    td{
        padding: 0;
    }
    th:last-child, td:last-child{
        text-align: center;
    }
    .item-img{
        width: 50px;
        height: 50px;
    }
    .cart-quantity{
        border: 1px solid var(--bg-primary);
        padding: 8px;
        box-sizing: border-box;
        width: 100px;
    }
}

.empty-cart-p{
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
        font-size:1.4em ;
        font-weight: bold;
    }
    img{
        width: 100px;
        height: 100px;
        color: green;
    }
}

.checkout-btn{
    background: var(--bg-primary);
    padding-right: 2.5em;
    padding-left: 2.5em;
    text-transform: none;
}

.update-cart-btn{
    background: var(--bg-primary);
    padding-right: 1.5em;
    padding-left: 1.5em;
    text-transform: none;
    margin-top: 8px;
    margin-bottom: 8px;
}

.checkout-btn:hover, .update-cart-btn:hover{
    background: var(--color-primary);
    color: black;
}

.totals-table{
    margin-bottom: 16px; 
    td{
        text-align: right;
    }
}

.loading{
  height: 60px;
}
</style>