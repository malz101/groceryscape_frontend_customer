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

        <div class="container">
            <span class="heading"><i class="material-icons tiny">home</i> <strong> <router-link to="/">Home</router-link> </strong>/ Shop </span>
            <div class="section">
                <div class="grid">
                    <div class="categories">
                        <span class="categories-title">Product Categories</span>
                        <ul class="categories-list">
                            <li v-for="category of Object.keys(categories)" :key="category"><a :class="{'active':category==activeCategoryName}" @click="showCategory(category)"> {{category}} </a></li>
                        </ul>
                    </div>
                    <div class="product">
                        <span class="product-title">Quality & Freshness Guaranteed! Good Health.</span>
                        <div class="product-grid">
                            <div class="card" v-for="grocery of activeCategory" :key="grocery.id">
                                <div class="card-image">
                                    <a :href="'/item/'+grocery.id"><img src="../assets/grocery.jpg" alt="Grocery Image"></a>
                                </div>
                                <div class="card-content">
                                    <span class="card-title"> <a :href="'/item/'+grocery.id">{{grocery.name}}</a> </span>
                                    <p>{{grocery['cost_per_unit']}}</p>
                                </div>
                                <div class="card-action">
                                    <a @click="addItemToCart(grocery.id)" class="add-to-cart-btn btn-small btn-flat">Add to Cart</a>
                                    <star-rating :clearable="true" :rating="0" :show-rating="false" :star-size="14" :animate="true" @rating-selected ="setRating($event, grocery.id)"></star-rating> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            activeCategory:[],
            activeCategoryName:''
        }
    },
    async created(){
        await this.getGroceries();
        if(this.isLoggedIn){
            await this.getCart();
        }
        [this.activeCategoryName, this.activeCategory] = Object.entries(this.categories)[0];
        
    },
    mounted(){
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);    
    },
    methods:{
        ...mapActions(['getGroceries', 'getCart', 'addToCart', 'rateGrocery']),
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
                await this.addToCart(form);
            }
            else{
                var notLoggedInModal = document.querySelector('#not-logged-in-modal');
                let instance = M.Modal.getInstance(notLoggedInModal);

                instance.open();
            }
        }
    },
    computed:{
        ...mapGetters(['groceries', 'isLoggedIn', 'categories']),
    }
}
</script>

<style lang="scss" scoped>
.bg-primary{
  background: var(--bg-primary);
}

.shop{
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
    }

    .grid{
        display: grid;
        grid-template-columns: 150px repeat(5, auto);       
        gap: 16px;

        .categories{
            grid-column: 1;
            padding-left: 8px;
            box-shadow: 1px 1px 1px 1px #ececec, -1px -1px 1px 1px #ececec;
            
            .categories-title{
                padding-bottom: 8px;
                height: 40px;
                border-bottom:1px solid black;
                display: inline-flex;
                align-items: flex-end;
                font-size: 14px;
                font-weight: bold;
            }
            
            .categories-list{
                a{
                    color: gray;
                    font-size: 12px;
                    cursor: pointer;
                }
                a.active{
                    color: black;
                    font-weight: bold;
                    text-decoration: underline;
                }
                a:hover{
                    text-decoration: underline;
                }
            }
        }

        .product{
            grid-column: 2 / span 5;

            .product-title{
                margin-bottom: 12px;
                display: flex;
                background: #00242c;
                color: white;
                height: 40px;
                align-items: center;
                padding-left: 8px;
                font-weight: bold;
            }
            .product-grid{
                display: grid;
                gap: 24px;
                grid-template-columns: repeat(3, auto);

                .card{
                    padding: 12px;
                    box-sizing: content-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 200px;

                    .card-title{
                        margin-bottom: 0;
                        display: block;
                        white-space: nowrap;
                        overflow: hidden;
                        a{
                            color: orange;
                            text-align: center;
                            font-size: 14px;
                            font-weight: bold;
                        }
                        a:hover{
                            text-decoration: underline;
                        }
                    }

                    .card-content{
                        text-align: center;
                        padding:8px 0px 0px 0px;
                        p{
                            font-weight: bold;
                            max-height: 80px;
                            font-size: 12px;
                            overflow: hidden;
                        }
                    }
                    .card-image{
                        width: 200px;
                        img:hover{
                            transform: scale(1.05);
                        }
                    }
                    .card-action {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top:8px;
                        padding-bottom: 8px;
                        .add-to-cart-btn{
                            color: orange;
                            font-size: 0.8em;
                        }
                        .add-to-cart-btn:hover{
                            background: orange;
                            color: white;
                        }
                    }
                }
            }
        }
    }
}

</style>