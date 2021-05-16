<template>
    <div class="register">
        <div class="register-header">
            <h5>My Account</h5>
            <p>Home / My Account</p>
        </div>
        <div class="section">
            <div class="container">
                <h4>Register</h4>
                <form class="register-form" action="" method="post" @submit="signUp">
                    <div class="input-div">
                        <label for="first_name">First Name * </label>
                        <input type="text" name="first_name" id="first_name" v-model="firstName" required>
                    </div>
                    <div class="input-div">
                        <label for="last_name">Last Name * </label>
                        <input type="text" name="last_name" id="last_name" v-model="lastName" required>
                    </div>
                    <div class="input-div">
                        <label for="street">Street * </label>
                        <input type="text" name="street" id="street" v-model="street" required>
                    </div>
                    <div class="input-div">
                        <label for="town">Town * </label>
                        <input type="text" name="town" id="town" v-model="town" required>
                    </div>
                    <div class="input-div">
                        <label for="parish">Parish * </label>
                        <input type="text" name="parish" id="parish" v-model="parish" required>
                    </div>
                    <div class="input-div">
                        <label for="phone">Phone * </label>
                        <input type="text" name="phone" id="phone" v-model="phone" required>
                    </div>
                    <div class="input-div">
                        <label for="email">Email address * </label>
                        <input type="text" name="email" id="email" v-model="email" required>
                    </div>
                    <div class="input-div">
                        <label for="password">Password * </label>
                        <input type="password" name="password" id="password" v-model="password" required>
                    </div>
                    <div class="input-div">
                        <label for="confirmPassword">Confirm Password * </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword" required>
                    </div>
                    <div class="input-div">
                        <label for="gender">Gender * </label>
                        <select class="browser-default" name="gender" id="gender" v-model="gender" required>
                            <option value="" disabled selected>Choose gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button class="btn bg-color sign-up-btn" type="submit">Register <i class="material-icons right tiny">send</i></button>
                    <div>
                        <p>Your personal data will be used to support your experience throughout this website and to manage access to your account.</p>
                    </div>  
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            firstName:'',
            lastName:'',
            town:'',
            parish:'',
            street:'',
            phone:'',
            email:'',
            gender:'',
            password:'',
            confirmPassword:'',
            isLoading:true
        }
    },
    methods:{
        ...mapActions(['register']),
        async signUp(event){
            event.preventDefault();            
            if(this.password != this.confirmPassword){
                  M.toast({html: 'Passwords are not the same'});
                  return;
            }

            let registerForm = new FormData();

            registerForm.set('firstname', this.firstName);
            registerForm.set('lastName', this.lastName);
            registerForm.set('street', this.street);
            registerForm.set('town', this.town);
            registerForm.set('parish', this.parish);
            registerForm.set('gender', this.gender);
            registerForm.set('email', this.email);
            registerForm.set('phone', this.phone);
            registerForm.set('password', this.password);

            let resp = await this.register(registerForm);

            if(resp){
                M.toast({html: 'Registration successful. Happy shopping!'});
                this.$router.push('/');
                return;
            }
            else{
                M.toast({html: 'Registration failed. Please try again.'});
            }

        }
    }
}
</script>

<style lang="scss" scoped>

.bg-color{
    background: var(--bg-primary);
}

.register .section{
    background: var(--light-accent);
}

.register-header{
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

h4{
    text-align: center;
    font-size: 2.5em;
    font-weight: bold;
}

.register-form{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: center;
    gap: 10px 40px;

    .input-div{
        display: flex;
        flex-direction: column;

        label{
            font-size: 1.1em;
            color: var(--primary-color);
        }

        input[type=text], input[type=password]{
            border: 1px solid #9e9e9e;
            border-radius: 2px;
            box-sizing: border-box;
            padding-left: 8px;
            font-size: 0.9em;
            width: 100%;
            background: #fff;
        }
        select{
            width: 100%;
        }
    }
    .sign-up-btn{
        width:150px;
        margin: 10px 0;
        display: block;
    }
}



</style>