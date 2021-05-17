<template>
    <div id="top" class="item">

        <!-- Modal Structure -->
        <div id="not-logged-in-modal" class="modal">
            <div class="modal-content">
                <h6>You are not logged in.</h6>
                <p>Register or Log In to continue.</p>
            </div>
            <div class="modal-footer">
                <a href="/login" class="modal-close btn bg-primary">Login</a>
                <a href="#" class="modal-close btn-flat">Close</a>
            </div>
        </div>

        <div v-if="grocery" class="container">
            <div class="heading"><i class="material-icons tiny">home</i> <strong> <router-link to="/">Home</router-link> </strong>/ {{grocery['category']}} / {{grocery['name']}} </div> 
        </div>
        <div class="item-content">
            <div v-if="grocery" class="container">
                <div class="section">
                    <div class="item-row">
                        <div class="item-image card">
                            <img :src="`${api}/uploads/${grocery['photo']}`" alt="Grocery Image">
                        </div>
                        <div class="item-info card">
                            <h5>{{grocery['name']}}</h5>
                            <span>${{grocery['cost_per_unit']}}</span>
                            <div>
                                <a v-if="!(idsInCart.includes(grocery.id))" @click="addItemToCart(grocery['id'])" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">add_shopping_cart</i> ADD TO CART</a>
                                <a v-else href="/cart" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">shopping_cart</i> View cart</a>
                            </div>
                            <div class="item-description">
                                <h6>Quick Overview</h6>
                                <p>
                                    {{grocery['description']}}
                                </p>
                            </div>
                            <p class="item-info-category"> <strong>SKU:</strong> {{grocery['sku']}}, <strong>Category:</strong> {{grocery['category']}}</p>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div id="details-tab">
                        <ul class="tabs">
                            <li class="tab"><a class="active" href="#description">Description</a></li>
                            <li class="tab"><a href="#add-info">Additional Information</a></li>
                            <li class="tab"><a href="#review">Review</a></li>
                        </ul>
                        <div id="description" class="card">
                            <h6>Description</h6>
                            <p>
                                {{grocery['description']}}
                            </p>
                        </div>
                        <div id="add-info" class="card">
                            <h6>Additional Information</h6>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Grams Per Unit</td>
                                        <td>{{grocery['grams_per_unit']}}</td>
                                    </tr>
                                    <tr>
                                        <td>Unit</td>
                                        <td>{{grocery['units']}}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity In Stock</td>
                                        <td>{{grocery['quantity']}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="review" class="card">
                            <h6>Review</h6>
                            <p>
                                There are no reviews yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="error-page container">
                <h6>Item Not Found</h6>
            </div>    
        </div>
    </div>
</template>

<script>
import config from '../config';
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            id: this.$route.params.id,
            grocery:{},
            api:''
        }
    },
    async created(){
        await this.getGroceries();
        for(let item of this.groceries){
            if(item.id==this.id){
                this.grocery = item;
            }
        }
        if(this.isLoggedIn){
            await this.getCart();
        }
        this.api = config.api;
    },
    mounted(){
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);

        var el = document.querySelector('.tabs');
        M.Tabs.init(el);
    },
    computed:{
        ...mapGetters(['groceries', 'isLoggedIn', 'cartAmount', 'idsInCart'])
    },
    methods:{
        ...mapActions(['getGroceries', 'getCart', 'addToCart', 'rateGrocery']),
        async addItemToCart(id){
            if(this.isLoggedIn){
                console.log(id);
                const form = new FormData();
                form.set('item_id', id);
                form.set('quantity', 1)
                await this.addToCart(form);
            }
            else{
                var notLoggedInModal = document.querySelector('#not-logged-in-modal');
                let instance = M.Modal.getInstance(notLoggedInModal);

                instance.open();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.bg-primary{
  background: var(--bg-primary);
}

.item{
    .heading{
        font-size: 12px;
        display: flex;
        align-items: flex-start;
        padding-bottom: 16px;
        i{
            margin-right: 4px;
        }
        strong{
            font-weight: bold;
            margin-right: 4px;
            a{
                color: black;
            }
            a:hover{
                text-decoration: underline;
            }
        }
    }
    .item-content{
        background: var(--item-bg-color);
    }
    .item-row{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;

        .item-image{
            display: flex;
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            background: #fff;
            img{
                max-width: 100%;
                max-height: 400px;
                object-fit: contain;
            }
        }

        .item-info{
            border-radius: 10px;
            background: #fff;
            padding:0px 16px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            h5{
                font-size: 18px;
                margin-bottom:0px !important ;
            }
            span{
                font-weight: bold;
                font-size: 20px;
                color: var(--cost-color);
            }
            .add-to-cart-btn{
                display: inline-flex;
                gap: 8px;
                align-items: center;
                font-size: 0.7em;
                padding-left: 3em;
                padding-right: 3em;
                background: var(--bg-primary);
            }
            .add-to-cart-btn:hover{
                opacity: 0.9;
            }
            .item-description{
                margin-top: 8px ;
                padding: 8px 16px;
                border-radius: 10px;
                border: 1px solid #ddd;
                h6{
                    font-weight: bold;
                    color: gray;
                }
                p{
                    color: var(--light-color);
                    font-size: 14px;
                }
            }
            .item-info-category{
                font-size: 0.7em;
                strong{
                    color: var(--cost-color);
                }
            }
        }
    }
    #details-tab{
        .tabs{
            background: var(--item-bg-color);
            display: flex;
            gap: 10px;
            height: 30px;
            .tab{
                text-transform: none;
                background: var(--bg-primary);
                height: inherit;
                a{
                    line-height: 30px;
                    color:#fff;
                }
                .active{
                    background: var(--color-primary);
                    color: var(--bg-primary);
                }
            }
        }
        .card{
            box-shadow: none;
        }
        #description, #add-info, #review{
            background: #fff;
            padding: 16px;
        }

        #description{
            h6{
                margin-top:0px ;
                font-size: 1.2em;
            }
            p{
                font-size: 0.8em;
                color: var(--light-color);
            }
        }
        #add-info{
            h6{
                font-size: 1.2em;
            }
            table{
                font-size: 0.8em;
            }
        }
        #review{
            h6{
                font-size: 1.2em;
            }
            p{
                font-size: 0.8em;
                color: var(--light-color);
            }
        }
    }
}
</style>