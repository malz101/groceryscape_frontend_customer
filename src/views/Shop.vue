<template>
    <div class="shop">

        <!-- Not Logged In Modal -->
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
        
        <div class="section heading-section">
            <div class="container">
                <div class="heading"><i class="material-icons tiny">home</i> <strong> <router-link to="/">Home</router-link> </strong> <span>/ Shop</span> </div>
            </div>
        </div>
        
        
        <div class="product-section section">
            <div class="container">
                <div class="grid">
                    <div class="items">
                        <div class="categories vld-parent">
                            <span class="categories-title">Product Categories</span>
                            <ul v-if="!isLoading" class="categories-list">
                                <li v-for="category of Object.keys(categories).sort()" :key="category">
                                    <img :src="`${api}/uploads/${categories[category][0]['photo']}`" alt="Grocery Image">
                                    <a :class="{'active':category==activeCategoryName}" @click="showCategory(category)"> {{category}} </a>
                                </li>
                            </ul>
                            <div v-else class="container loading">
                                <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" :color="'#080'" />
                            </div>
                        </div>
                        <div class="suggestions vld-parent">
                            <span v-if="isLoading" class="suggestions-title">Top products<span class="new badge" data-badge-caption="">You may like</span></span> 
                            <span v-else-if="!isLoading && !isLoggedIn" class="suggestions-title">Top products<span class="new badge" data-badge-caption="">You may like</span></span> 
                            <span v-else-if="!isLoading && isLoggedIn && orders.length>0" class="suggestions-title">Since you bought {{orders[randomPick]['order_items'][0]['name']}}</span> 
                            <span v-else class="suggestions-title">Suggested for you<span class="new badge" data-badge-caption="">You may like</span></span> 
                            <div v-if="isLoading" class="container loading">
                                <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" :color="'#080'" />
                            </div>
                            <ul v-else-if="!isLoading && !isLoggedIn" class="suggestions-list">
                                <li v-for="grocery of featuredItems" :key="grocery['id']">
                                    <img :src="`${api}/uploads/${grocery['photo']}`" alt="Grocery Image">
                                    <a> {{grocery['name']}} </a>
                                </li>
                            </ul>
                            
                            <ul v-else class="suggestions-list">
                                <li v-for="grocery of topPicks" :key="grocery['id']">
                                    <img :src="`${api}/uploads/${grocery['photo']}`" alt="Grocery Image">
                                    <a> {{grocery['name']}} </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="product vld-parent">
                        <div class="product-title">
                            <img src="../assets/default.svg" alt="GroceryScape">
                            <span>Quality & Freshness Guaranteed! Good Health.</span>
                        </div>
                        <div v-if="!isLoading" class="product-grid">
                            <div class="card horizontal" v-for="grocery of activeCategory" :key="grocery.id">
                                <div class="card-image">
                                    <a :href="'/item/'+grocery.id"><img :src="`${api}/uploads/${grocery['photo']}`" alt="Grocery Image"></a>
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <span class="card-title"> <a :href="'/item/'+grocery.id">{{grocery.name}}</a> </span>
                                        <p class="units"> <i class="material-icons tiny" :class="{'in-stock':grocery['quantity']>0, 'out-of-stock':grocery['quantity']==0}">check_circle</i> <b>In stock</b>- 1 {{grocery['units']}}</p>
                                        <p class="price">${{grocery['cost_per_unit']}}</p>
                                        <p class="description"> {{grocery['description']}} </p>
                                        <a v-if="!(idsInCart.includes(grocery.id))" @click="addItemToCart(grocery['id'])" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">add_shopping_cart</i> Add to Cart</a>
                                        <a v-else href="/shop" class="btn-small add-to-cart-btn"> <i class="material-icons tiny">shopping_cart</i> View cart</a>
                                        <star-rating :clearable="true" :rating="0" :show-rating="false" :star-size="14" :animate="true" @rating-selected ="setRating($event, grocery.id)"></star-rating> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="container loading">
                            <loading :active.sync="isLoading" :is-full-page="false" :width="50" :height="50" :color="'#080'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import config from '../config';

export default {
    data(){
        return{
            activeCategory:[],
            activeCategoryName:'',
            api:'',
            isLoading:false,
            topPicks:[],
            randomPick:0
        }
    },
    async created(){
        this.isLoading = true;
        await this.getGroceries();
        await this.getFeaturedItems();
        if(this.isLoggedIn){
            await this.getCart();
            await this.getRecommendedGroceries();
            await this.getOrders();

            this.randomPick = Math.floor(Math.random()*(this.orders.length-1));
            console.log(this.orders.length);
            if(this.orders.length>0){
                for(let grocery of this.recommendedGroceries){
                    if(this.topPicks.length>10){
                        break;
                    }
                    if(grocery['category']==this.orders[this.randomPick]['order_items'][0]['category']){
                        this.topPicks.push(grocery);
                    }
                }
            }
        }
        this.api = config.api;
        [this.activeCategoryName, this.activeCategory] = Object.entries(this.categories).sort()[0];
        this.isLoading = false;
    },
    mounted(){
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);    
    },
    computed:{
        ...mapGetters(['groceries', 'isLoggedIn', 'categories', 'idsInCart', 'recommendedGroceries', 'featuredItems', 'orders']),
    },
    methods:{
        ...mapActions(['getGroceries', 'getCart', 'addToCart', 'rateGrocery', 'getRecommendedGroceries', 'getFeaturedItems', 'getOrders']),
        showCategory(category){
            this.activeCategoryName = category;
            this.activeCategory = this.categories[category];
        },
        async setRating(rating, groceryId){
            if(this.isLoggedIn){
                let form = new FormData();
                form.set('item_id', groceryId);
                form.set('rating', rating);
                await this.rateGrocery(form);
            }
            else{
                var notLoggedInModal = document.querySelector('#not-logged-in-modal');
                let instance = M.Modal.getInstance(notLoggedInModal);

                instance.open();
            }
        },
        async addItemToCart(id){
            if(this.isLoggedIn){
                const form = new FormData();
                form.set('item_id', id);
                form.set('quantity', 1)
                let resp = await this.addToCart(form);
                if(resp){
                    M.toast({html: 'Added to cart!'});
                }
                else{
                    M.toast({html: 'An error occurred. Please try again.'});
                }
            }
            else{
                var notLoggedInModal = document.querySelector('#not-logged-in-modal');
                let instance = M.Modal.getInstance(notLoggedInModal);

                instance.open();
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.bg-primary{
  background: var(--bg-primary);
}

.heading-section{
    background: white;
    border-bottom: 1px solid #eee;
    .heading{
        font-size: 12px;
        display: flex;
        align-items: flex-start;    
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
        span{
            color: #999;
        }
    }
}

.product-section{
    background: var(--color-accent);
}

.shop{
    .grid{
        display: grid;
        grid-template-columns: 150px repeat(6, auto);       
        gap: 16px;

        .items{
            grid-column: 1 / span 2;
        }

        .categories{
            margin-bottom: 16px;
            background: white;
            height: fit-content;
            border: 1px solid #eee;
            .categories-title{
                background: var(--bg-primary);
                color: #fff;
                display: block;
                padding: 1em 1em;
                font-size: 12px;
            }
            
            .categories-list{
                margin-top: 0;
                li{
                    font-size: 0.8em;
                    padding: 0.3em 1em;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #eee;
                }
                img{
                    width: 25px;
                    height: 25px;
                }
                a{
                    color: gray;
                    font-size: 12px;
                    cursor: pointer;
                }
                a.active{
                    color: green;
                    font-weight: bold;
                    text-decoration: underline;
                }
                a:hover{
                    color: var(--bg-primary);
                    text-decoration: underline;
                }
            }
        }

        .suggestions{
            background: white;
            height: fit-content;
            border: 1px solid #eee;
            .suggestions-title{
                background: var(--bg-primary);
                color: #fff;
                display: block;
                padding: 1em 1em;
                font-size: 12px;
                .badge{
                    background: green;
                }
            }
            
            .suggestions-list{
                margin-top: 0;
                li{
                    font-size: 0.8em;
                    padding: 0.3em 1em;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #eee;
                }
                img{
                    width: 25px;
                    height: 25px;
                }
                a{
                    color: gray;
                    font-size: 12px;
                    cursor: pointer;
                }
                a.active{
                    color: green;
                    font-weight: bold;
                    text-decoration: underline;
                }
                a:hover{
                    color: var(--bg-primary);
                    text-decoration: underline;
                }
            }
        }

        .product{
            grid-column: 3 / span 4;

            .product-title{
                display: flex;
                background: #00242c;
                color: white;
                height: 70px;
                align-items: center;
                justify-content: space-between;
                padding-left: 8px;
                padding-right: 2em;
                font-weight: bold;
                padding-top: 2em ;
                padding-bottom: 2em;
                margin-bottom: 12px;
                gap: 10px;
                img{
                    width: 80px;
                    height: 70px;
                }
                span{
                    font-size: 1.3em;
                }
            }
            .product-grid{
                display: flex;
                gap: 24px;
                flex-direction: column; 
                .card{
                    padding: 8px;
                    width: 100%;
                    box-shadow: none;
                    border: 1px solid #eee;
                    .card-content{
                        padding:8px 0px 0px 0px;
                        .card-title{
                            margin-bottom: 0;
                            display: block;
                            white-space: nowrap;
                            overflow: hidden;
                            a{
                                color: green;
                                text-align: center;
                                font-size: 14px;
                                font-weight: bold;
                            }
                            a:hover{
                                text-decoration: underline;
                            }
                        }

                        .units{
                            font-size: 10px;
                            color: var(--light-color);
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            justify-content: flex-start;
                        }
                        .in-stock{
                            color: green;
                        }
                        .out-of-stock{
                            color: red;
                        }
                        .price{
                            font-weight: bold;
                            max-height: 80px;
                            margin: 4px 0px;
                            font-size: 14px;
                            overflow: hidden;
                        }

                        .description{
                            color: #888;
                            padding: 0.5em 0;
                            font-size: 0.9em;
                            height: 70px;
                            text-overflow: ellipsis;
                            white-space: wrap;
                            overflow: hidden;
                        }

                        .vue-star-rating{
                            justify-content: flex-end;
                        }
                    }
                    .card-image{
                        width: 180px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            height: 130px;
                            width: 130px;
                        }
                    }
                    .add-to-cart-btn{
                        border-radius: 18px;
                        margin-top: 8px;
                        margin-bottom: 8px;
                        display: inline-flex;
                        height: 26px;
                        align-items: center;
                        color: white;
                        background: green;
                        font-size: 0.8em;
                        padding-top: 0;
                        padding-bottom: 0;
                        text-transform: none;
                    }
                    .add-to-cart-btn:hover{
                        background: var(--bg-primary);
                    }
                }
                .card:hover{
                    img{
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
}

.loading{
  height: 60px;
}

</style>