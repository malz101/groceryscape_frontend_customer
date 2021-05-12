<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
            
            <div class="cart-logout-container">
                <span class="cart">
                    <a href="/cart" :data-content="cartAmount" id="cart-badge" class="btn-small"><i class="material-icons tiny">add_shopping_cart</i></a>
                </span>
                <span class="logout">
                    <a @click="signOut" class="btn-small"><i class="material-icons tiny">exit_to_app</i></a>
                </span>
            </div>
        </div>
        <div class="container">
            <nav class="nav-wrapper">
                <div class="toolbar">
                <router-link to="/" class="brand-logo left right-padding"> 
                    <span>Home</span>
                </router-link>
                    <ul id="nav-mobile" class="right">
                        <li><router-link to="/shop">Shop</router-link></li>
                        <li><router-link to="#" id="admin">Contact</router-link></li>
                        <li><router-link to="/about">About Us</router-link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods:{
        ...mapActions(['logout']),
        async signOut(){
            await this.logout();
            this.$router.push('/login');
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
  a{
      color: black;
      font-size: 14px;
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