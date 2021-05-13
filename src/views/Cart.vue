<template>
    <div class="cart">
        <div class="cart-header">
            <h5>Cart</h5>
            <p>Home / Cart</p>
        </div>
        <div class="section">
            <div class="container">
                <table class="cart-table">
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
                    <tbody v-if="cart.length>0">
                        {{cart[0]['photo']}}
                        <tr v-for="cartItem of cart" :key="cartItem['grocery_id']">
                            <td><img class="item-img" src="../assets/grocery.jpg"></td>
                            <td> {{cartItem['name']}} </td>
                            <td> ${{cartItem['cost_before_tax']}} </td>
                            <td> {{cartItem['quantity']}} </td>
                            <td> ${{cartItem['cost_before_tax'] * cartItem['quantity']}} </td>
                            <td class="empty-cart"> <a @click="removeFromCart(cartItem['grocery_id'])" class="btn-small"><i class="material-icons tiny">close</i></a> </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><a class="btn update-cart-btn" :class="{'disabled':true}">Update Cart</a></td>
                        </tr>
                    </tbody>
                    <p v-else>Cart Empty</p>
                </table>
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
        </div>
    </div>
</template>

<script>
import config from '../config';
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            isCartUpdate:false,
            api:''
        }
    },
    async created(){
        await this.getCart();
        this.api = config.api;
    },
    methods:{
        ...mapActions(['getCart', 'emptyCart', 'removeItemFromCart']),
        async clearCart(){
            await this.emptyCart();
        },
        async removeFromCart(groceryId){
            await this.removeItemFromCart(groceryId);
        },
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
.cart-table{
    margin-bottom: 16px;
    td:nth-child(1), th:nth-child(1){
        width: 150px;
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
        width: 100px;
    }
    .empty-cart{
        .btn-small{
            background: var(--bg-primary);
            border-radius: 50%;
            padding-right: 0.5em;
            padding-left: 0.5em;
            box-shadow: none;
        }   
        .btn-small:hover{
            opacity: 0.5;
        }
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
</style>