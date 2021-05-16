<template>
    <div class="order-history">
        <div class="cart-header">
            <h5>{{customer['first_name']}}'s Dashboard</h5>
            <p>Home / Dashboard </p>
        </div>
        <div class="section">
            <div class="container">
                <div class="dashboard-content">
                    <div class="menu-list">
                        <ul class="tabs">
                            <li class="tab"><a href="#orders"><i class="material-icons tiny">redeem</i><span>Orders</span></a></li>
                            <li class="tab"><a href="#overview"><i class="material-icons tiny">widgets</i><span>Overview</span></a></li>
                        </ul>
                    </div>
                    <div id="overview" class="main-content">
                        <h5>
                            <i class="material-icons tiny">widgets</i><span>Overview</span>
                        </h5>
                        <h5>
                            Hey, {{customer['first_name']}}!
                        </h5>
                        <div class="card">

                        </div>
                    </div>
                    <div id="orders" class="main-content">
                        <h5>
                            <i class="material-icons">redeem</i><span>Orders</span>
                        </h5>
                        <div class="card item-card" v-for="order in orders" :key="order['order_id']">
                            <p class="delivery-p"><span><b>Delivery Date:</b> {{order['formatted_delivery_date']}} <b>Delivery Time:</b> {{order['delivery_timeslot']}}</span> <span  data-badge-caption="" :class="{'pending':order['status']=='pending', 'canceled':order['status']=='canceled','checked-out':order['status']=='checked out', 'served':order['status']=='served' }" class="badge new">Status:{{order['status']}}</span></p>
                            <p class="delivery delivery-p"><span> <b>Destination:</b> {{order['delivery_town']}}, {{order['delivery_parish']}}</span></p>
                            <div class="items" v-for="item in order['order_items']" :key="item['grocery_id']">
                                <img :src="`${api}/uploads/${item['photo']}`" alt="Grocery Image">
                                <div class="item-data">
                                    <p class="name"><b>{{item['name']}}</b></p>
                                    <p class="quantity">x{{item['quantity']}} - {{item['total_weight']}}</p>
                                    <p class="item-total"><b>${{item['total']}}</b></p>
                                </div>
                            </div>
                            <div class="total">
                                <p class="subtotal"><span>Subtotal:</span> <span>${{Number.parseFloat(order['subtotal']).toFixed(2)}}</span></p>
                                <p class="delivery-cost"><span>Delivery Cost:</span> <span>${{Number.parseFloat(order['delivery_cost']).toFixed(2)}}</span></p>
                                <p class="order-total"><span><b>Total:</b></span> <span><b>${{Number.parseFloat(order['total']).toFixed(2)}}</b></span></p>
                            </div>

                            <div class="actions">
                                <a href="" class="btn-small" v-if="order['status']=='pending'">Cancel Order</a>
                                <a href="" class="btn-small" v-else>View Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import config from '../config';
export default {
    data(){
        return{
             api:''
        }
    },
    async created(){
        await this.getOrders();
        await this.getCustomer();
        this.api = config.api;
    },
    mounted(){
        var el = document.querySelector('.tabs');
        M.Tabs.init(el);
    },
    computed:{
        ...mapGetters(['orders', 'customer'])
    },
    methods:{
        ...mapActions(['getOrders', 'getCustomer'])
    },
    
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
    background: var(--color-accent);
}

.dashboard-content{
    .menu-list{
        .tabs{
            background: var(--color-accent);
            display: flex;
            gap: 10px;
            height: 30px;
            .tab{
                text-transform: none;
                background: var(--bg-primary);
                height: inherit;
                a{
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    line-height: 30px;
                    color:#fff;
                }
                .active{
                    color: var(--color-primary);
                }
            }
        }
    }
    .card{
        box-shadow: none;
        background: #fff;
        padding: 16px;
        border-radius: 6px;
        border: 2px solid #eee;
    }
    #orders h5, #overview h5{
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 24px;
        i{
            font-size: 24px;
        }
    }

    .item-card{
        .pending{
            background: gold;
            color: #000;
        }
        .canceled{
            background: red;
        }
        .checked-out{
            background: orange;
        }
        .served{
            background: green;
        }

        p{
            margin-top: 6px;
            margin-bottom: 6px;
        }
        .delivery{
            border-bottom: 1px solid #ddd;
            padding-bottom:8px ;
        }
        .delivery-p{
            span{
                font-size:12px ;
            }
        }
        
        .items{
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            img{
                width: 60px;
                height: 60px;
            }
            .item-data {
                p{
                    margin: 0;
                }
                .quantity{
                    font-size: 12px;
                }
                .item-total{
                    font-size: 13px;
                }
            }
        }
        .total{
            border-bottom: 1px solid #eee;
            p{
                display: flex;
                justify-content: space-between;
            }
            .subtotal, .delivery-cost{
                font-size: 12px;
            }
        }
        .actions{
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            a{
                text-transform: none;
                background: green;
            }
        }
    }

}

</style>