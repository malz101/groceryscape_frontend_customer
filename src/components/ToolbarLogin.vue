<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
            <div class="cart-login-container"> 
                <span class="login">
                    <a href="/login" class="btn-small">Login</a>
                </span>
                <span class="sign-up">
                    <a href="/register" class="btn-small">Register</a>
                </span>
            </div>
        </div>
        <nav class="nav-wrapper">
            <div class="toolbar">
                <router-link to="/"> 
                    <span>Home</span>
                </router-link>
                <router-link to="/shop">Shop</router-link>
                <router-link to="/contact">Contact</router-link>
                <router-link to="/about-us">About Us</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {}
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
            // border-radius:0 ;
        }
        a:hover{
            opacity: 0.5;
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



</style>