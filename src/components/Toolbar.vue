<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
            <div class="search-div">
                <input type="search" name="search" id="search" v-model="searchString" placeholder="Search for products..." @input="search">
                <a @click="search" class="btn search-btn">Search</a>
            </div>
            <div class="cart-logout-container">
                <span class="cart">
                    <a href="/cart" :data-content="cartAmount" id="cart-badge" class="btn-small btn-flat tooltipped" data-position="bottom" data-tooltip="Cart"><i class="material-icons tiny">add_shopping_cart</i>{{customer['first_name']}}'s Cart</a>
                </span>
                <span class="logout">
                    <a @click="signOut" class="btn-small btn-flat tooltipped" data-position="bottom" data-tooltip="Logout"><i class="material-icons tiny">exit_to_app</i>Logout</a>
                </span>
            </div>
        </div>
        <nav class="nav-wrapper">
            <div class="toolbar">
                <router-link to="/"><span>Home</span></router-link>
                <router-link to="/shop">Shop</router-link>
                <router-link to="/order-history">Dashboard</router-link>
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
    async created(){
        await this.getCustomer();
    },
    methods:{
        ...mapActions(['logout', 'getCustomer']),
        async signOut(){
            await this.logout();
            this.$router.push('/login');
        },
        search(){
            
        }
    },
    computed:{
        ...mapGetters(['cartAmount', 'customer'])
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
        display: inline-flex;
        align-items: flex-start;
        a{  
            display: flex;
            align-items: center;
            box-shadow: none;
            height: 35px;
            font-size: 12px;
            border-radius: 0px 8px 8px 0px;
            background: var(--color-primary);
            color: #00242c;
            text-transform: none;
        }
        a:hover{
            opacity: 0.9;
        }

        a:focus{
            border: 1px solid grey;
        }

        input[type=search]{
            width: 400px;
            font-size: 12px;
            padding: 16px;
            border-radius:8px 0px 0px 8px ;
            box-sizing: border-box;
            border: 1px solid #555;
            height: 35px;
            margin-bottom: 0px;
        }
        input[type=search]:focus{
            border: 1px solid var(--color-primary);
        }
        input::placeholder{
            color: var(--light-color);
        }
    }
    
    .cart-logout-container{
        display: flex;
        align-items: center;

        .cart, .logout{
            display: flex;
            align-items: center;
            a{
                display: flex;
                text-transform: none;
                align-items: center;
                justify-content: center;
                color: #fff;
                height: 30px;
                border: 1px solid var(--color-primary);
            }
            a:hover{
                opacity: 0.9;
                background: var(--color-primary);
                color: var(--bg-primary);
            }
        }

        .cart a{
            border-radius: 8px 0 0 8px;
        }
        .logout a{
            border-radius: 0px 8px 8px 0px;
            border-left: none;
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