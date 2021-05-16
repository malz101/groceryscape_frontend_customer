<template>
    <div class="section">
        <div class="login-header">
            <h5>My Account</h5>
            <p>Home / My Account</p>
        </div>
        <div class="login-container">
            <span>Login</span>
            <p id="error-text" class="hide error-text">Login Failed. Try Again</p>
            <form>
                <label for="email"></label>
                <input type="email" name="email" id="email" placeholder="Email" v-model="username">
                <label for="password"></label>
                <input type="password" name="password" id="password" placeholder="Password" v-model="password"> 
                <a type="button" class="btn login-btn" @click="signIn">Log In</a>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            username:'',
            password:''
        }
    },
    computed:{
        ...mapGetters(['isLoggedIn'])
    },
    methods: {
        ...mapActions(['login']),
        async signIn(){
            const form = new FormData();
            form.set('email', this.username);
            form.set('password', this.password);
            const isSignedIn = await this.login(form);
            if(isSignedIn){
                const error = document.getElementById('error-text');
                error.classList.add('hide');
                this.$router.push('/');
            }
            else{
                const error = document.getElementById('error-text');
                error.classList.remove('hide');
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.section{
    padding-top: 0;
}

.login-header{
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

.login-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
    background: var(--color-accent);
    span{
        font-weight: bold;
        font-size: 2em;
        margin-bottom: 16px;
        color: var(--bg-primary);
    }

    .error-text{
        color: red;
        margin: 0;
    }
    form{
        text-align: center;
        input{
            border: 1px solid black;
            box-sizing: border-box;
            display: block;
            width: 300px;
            padding-left:8px;
            padding-right:8px;
        }
        a{
            background: var(--bg-primary);
            width: 300px;
        }
    }
}
.logo img{
    width: 200px;
    border-radius: 50%;
}
</style>