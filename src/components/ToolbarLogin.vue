<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
            <div class="cart-login-container"> 
                <span class="login">
                    <a href="/login" class="btn-small">Login</a>
                </span>
                <span class="sign-up">
                    <a @click="signUp" class="btn-small">Register</a>
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
        async signUp(){

        }
    },
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
  
    .cart-login-container{
        a{
            background: var(--color-primary);
            color: #00242c;
            border-radius:0 ;
        }
    }  
}

nav {
  background: white;
  box-shadow: none;
  height: 40px;
  a{
      color: black;
      font-size: 16px;
      line-height: 40px;
  }
}

</style>