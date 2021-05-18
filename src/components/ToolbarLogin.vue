<template>
    <div class="toolbar">
        <div class="header-bar">
            <span id="brand">  <router-link to="/"><img src="../assets/default.svg" alt="" srcset=""></router-link> </span>
             <div class="search-div">
                <input type="search" name="search" id="search" v-model="searchString" placeholder="Search for products...">
                <a :href="`/shop?search=${searchString}`" class="btn search-btn">Search</a>
            </div>
            <div class="signup-login-container"> 
                <span class="login">
                    <a href="/login" class="btn-small btn-flat">Login</a>
                </span>
                <span class="signup">
                    <a href="/register" class="btn-small btn-flat">Register</a>
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
export default {
    data(){
        return{
            searchString:''
        }
    },
    methods:{
        search(){
            
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
  
    .search-div{
        display: flex;
        align-items: flex-start;
        justify-content: center;
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
            border: 1px solid grey;
            height: 35px;
            color: #fff;
        }
        input[type=search]:focus{
            border: 1px solid var(--color-primary);
        }
        input::placeholder{
            color: var(--light-color);
        }
    }

    .signup-login-container{
        display: flex;
        align-items: center;
        .login, .signup{
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

        .login a{
            border-radius: 8px 0 0 8px;
        }
        .signup a{
            border-radius: 0px 8px 8px 0px;
            border-left: none;
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