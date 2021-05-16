<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
            <div class="container">
                <div class="search-div">
                    <input type="search" name="search" id="search" v-model="searchString" placeholder="Enter Search Here..." @input="search">
                    <a @click="search" class="btn search-btn">Search</a>
                </div>
            </div>
            <div class="cart-logout-container">
                <span class="cart">
                    <a href="/cart" :data-content="cartAmount" id="cart-badge" class="btn-small"><i class="material-icons tiny">add_shopping_cart</i></a>
                </span>
                <span class="logout">
                    <a @click="signOut" class="btn-small"><i class="material-icons tiny">exit_to_app</i></a>
                </span>
            </div>
        </div>
        <nav class="nav-wrapper">
            <div class="toolbar">
                <router-link to="/"><span>Home</span></router-link>
                <router-link to="/shop">Shop</router-link>
                <router-link to="/order-history">Order History</router-link>
                <router-link to="/contact">Contact</router-link>
                <router-link to="/about-us">About Us</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            searchString:''
        }
    },
    methods:{
        ...mapActions(['logout']),
        async signOut(){
            await this.logout();
            this.$router.push('/login');
        },
        search(){
            
        }
    },
    computed:{
        ...mapGetters(['cartAmount'])
    }
}
</script>

<style lang="scss" scoped>
.header-bar{
    width: 100%;
    background: var(--bg-primary);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-left: 60px;
    padding-right: 60px;
    #brand{
        width: 100px;
        font-weight: bold;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: black;
    }

    .search-div{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        a{  
            display: flex;
            align-items: center;
            box-shadow: none;
            height: 35px;
            background: var(--color-primary);
            color: #00242c;
            border-radius: 0;
        }
        a:hover{
            opacity: 0.9;
        }

        a:focus{
            border: 1px solid grey;
        }

        input[type=search]{
            width: 400px;
            background: white;
            padding: 16px;
            box-sizing: border-box;
            border: 1px solid grey;
            height: 35px;
        }
        input[type=search]:focus{
            border: 1px solid var(--color-primary);
        }
    }
    
    .cart-logout-container{
        display: flex;
        align-items: center;

        .cart, .logout{
            display: flex;
            align-items: center;
            font-weight: bold;
            color: white;
            a{
                margin-right: 8px;
                background: white;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    color: #000;
                }
            }
            a:hover{
                background: var(--color-primary);
                i{
                    color: var(--bg-primary);
                }
            }
        }
        .cart{
            position: relative;
        }
        #cart-badge::after{
            content: attr(data-content);
            color: black;
            position: absolute;
            top: 0px;   
            right: 10px;
            font-size: 0.8em;
            background: var(--color-primary);
            padding: 2px;
            line-height: 1;
            border-radius: 50%;
        }
    }
    
}

nav {
    background: white;
    box-shadow: none;
    border-bottom: 2px solid #eee;
    .toolbar{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    a{   
        width: fit-content;
        padding: 0 1.2em ;
        color: black;
        font-size: 14px;
        text-align: center;
    }
    a:hover{
        background: var(--bg-primary);
        color: #fff;
    }
}

@media screen and (max-width:800px) {
    .header-bar{
        justify-content: space-evenly;
        .search-div{
            margin-bottom: 40px;
            order: 3;
            input{
                width: 200px;
                height: 30px;
                padding: 8px;
            }
            a{
                height: 30px;
            }
        }
    }
    
}
</style>