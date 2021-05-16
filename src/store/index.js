import Vue from 'vue';
import Vuex from 'vuex';
import groceriesService from '../service/groceries.service';
import authService from '../service/auth.service';
import cartService from '../service/cart.service';
import paymentService from '../service/payment.service';
import orderService from '../service/order.service';
import recommendService from '../service/recommend.service'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: sessionStorage.getItem('user_id') || '',
    token: sessionStorage.getItem('token') || '',
    groceries:[],
    recommendedGroceries:'',
    categories:{},
    customer:{},
    cart:[],
    orders:[],
    timeslots:[],
    cartAmount:0,
    idsInCart:[],
    stripeKey:''
  },
  getters:{
    isLoggedIn(state){
      if (state.token == '' || state.token == undefined || state.token == null) {
        return false;
      }
      else{
        const { exp } = JSON.parse(atob(state.token.split('.')[1]));
        if ((Date.now())/1000 >= exp) {
          state.token = '';
          return false;
        }

        return true;
      }
      
    },
    token(state){
      return state.token;
    },
    cartAmount(state){
      return state.cart.length;
    },
    idsInCart(state){
      return state.cart.map( item => item['grocery_id']); 
    },
    groceries(state){
      return state.groceries;
    },
    recommendedGroceries(state){
      return state.recommendedGroceries;
    },
    categories(state){
      return state.categories;
    },
    cart(state){
      return state.cart;
    },
    orders(state){
      return state.orders;
    },
    customer(state){
      return state.customer;
    },
    stripeKey(state){
      return state.stripeKey;
    },
    timeslots(state){
      return state.timeslots;
    }
  },
  mutations: {
    setLoggedIn(state, user_id){
      state.isLoggedIn = user_id;
      sessionStorage.setItem('user_id', user_id);
    },
    setToken(state, token){
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    setGroceries(state, groceries){
      state.groceries = groceries;
    },
    setRecommendedGroceries(state, groceries){
      state.recommendedGroceries = groceries;
    },
    setCategories(state, categories){
      state.categories = categories;
    },
    setCart(state, cart){
      state.cart = cart;
    },
    setOrders(state){
      state.orders = orders;
    },
    setCustomer(state, customer){
      state.customer=customer;
    },
    setStripeKey(state, key){
      state.stripeKey = key;
    },
    setTimeslots(state, timeslots){
      state.timeslots = timeslots;
    }
  },  
  actions: {
    login({commit}, payload){
      return authService.login(payload)
      .then(({data, msg})=>{
        const {token, customer} = data;
        commit('setLoggedIn', customer['cust_id']);
        commit('setToken', token);
        return true;
      })
      .catch((result)=>{
        return false;
      })
    },
    register({dispatch}, payload){
      return authService.register(payload)
      .then(({msg})=>{
        if(msg == 'account created'){
          return dispatch('login',{'email':payload['email'], 'password':payload['password']});
        }
        return false;
      })
      .catch((err)=>{
        alert(err);
        return false;
      })
    },
    logout({commit, getters}){
      return authService.logout(getters.token)
      .then((result)=>{
        commit('setLoggedIn', '');
        commit('setToken', '');
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    getGroceries({commit}){
      return groceriesService.getGroceries()
      .then(({data})=>{
        let {groceries} = data;
        let list = {};
        commit('setGroceries', groceries);
        
        for(let grocery of groceries){
          if((grocery['category'] in list)){
              list[grocery['category']].push(grocery);
          }
          else{
              list[grocery['category']] = [grocery];
          }
        }

        commit('setCategories',list);
      });
    },
    getRecommendedGroceries({commit, getters}){
    return recommendService.getRecommendedGroceries(getters.token)
      .then(({data, msg})=>{
        if (msg==''){
          commit('setRecommendedGroceries', data['groceries']);
          return true;
        }
        else if(msg=='no customer found'){
          commit('setRecommendedGroceries', []);
          return true;
        }
        else{
          alert('An error occurred');
          return false;
        }
      })
      .catch(err=>{
        return false;
      });
    },
    getCart({commit, getters}){
      return cartService.getCart(getters.token)
      .then(({data, msg})=>{
        if (msg=='success'){
          commit('setCart', data['items']);
          return true;
        }
        else if(msg=='no items found'){
          commit('setCart', []);
          return true;
        }
        else{
          alert('An error occurred');
          return false;
        }
      })
      .catch(err=>{
        return false;
      });
    },
    getCustomer({commit, getters}){
      return authService.getCustomer(getters.token)
      .then(({data})=>{
        commit('setCustomer', data['customer']);
        return true;
      })
      .catch((err)=>{
        console.log(err);
        return false;
      })
    },
    getOrders({commit, getters}){
      return orderService.getOrders(getters.token)
      .then(({msg, data})=>{
        // if(msg == 'success'){
        //   commit('setOrders', data['orders']);
        // }
        // else{
        //   commit('setOrders', []);
        // }
        console.log(data);
      })
      .catch(err=>{
        alert(err);
        return false;
      })
    },
    getDeliveryTimeslots({commit, getters}){
      return orderService.getDeliveryTimeslots(getters.token)
      .then(({msg, data})=>{
        if(msg == 'success'){
          commit('setTimeslots', data['slots']);
          return true;
        }
        else{
          commit('setTimeslots', []);
          return true;
        }
      })
      .catch(err=>{
        alert(err);
        return false;
      })
    },
    addToCart({dispatch, getters}, payload){
      return cartService.addToCart(getters.token, payload)
      .then((result)=>{
        return dispatch('getCart');
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    emptyCart({dispatch, getters}){
      return cartService.emptyCart(getters.token)
      .then(({msg})=>{
        if(msg=='success'){
          return dispatch('getCart');
        }
        else{
          alert('An error occurred. Failed to empty');
        }
      })
      .catch(({msg})=>{
        alert('An error occurred.'+msg);
      })
    },
    removeItemFromCart({commit, getters}, groceryId){
      return cartService.removeItemFromCart(getters.token, groceryId)
      .then(({msg, data})=>{
        if(msg=='success'){
          commit('setCart', data['items']);
        }
        else{
          alert('An error occurred. Failed to remove item');
        }
      })
      .catch(({msg})=>{
        alert('An error occurred.'+msg);
      })
    },
    createOrder({dispatch, getters}){
      return cartService.createOrder(getters.token)
      .then(async ({msg, data})=>{
        if(msg == 'success'){
          await dispatch('emptyCart');
          return data;
        }
        else{
          alert(msg);
          return false;
        }
      })
      .catch(({msg})=>{
        alert('An error occurred.'+msg);
        return false;
      })
    },
    updateCart({getters, dispatch}, payload){
      return cartService.updateCart(getters.token, payload)
      .then(({msg})=>{
        console.log(msg);
        if(msg=='cart updated'){
          return dispatch('getCart');
        }
        return false;
      })
      .catch(err=>{
        alert(err);
        return false;
      });
    },
    rateGrocery({getters}, payload){
      return groceriesService.rateGrocery(getters.token, payload)
      .then((result)=>{
        alert('Rate sent');
      })
      .catch(({msg})=>{
        alert('An error occurred.'+msg);
      })
    },
    getPublicKey({getters, commit}){
      return paymentService.getPublicKey(getters.token)
      .then(({data})=>{
        commit('setStripeKey', data['payment_key'])
      })
      .catch(({error})=>{
        alert(`An error occurred. ${error}`)
      });
    },
    makePayment({getters}, body){
      return paymentService.makePayment(getters.token, body)
      .then((result)=>{
        return result;
      })
      .catch((err)=>{
        alert(err);
      });
    },
    setDeliveryLocation({getters}, payload){
      return orderService.setDeliveryLocation(getters.token, payload.orderId, payload.body)
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        alert(err);
      });
    },
    scheduleOrder({getters}, payload){
      return orderService.scheduleOrder(getters.token, payload)
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        alert(err);
      });
    }
  },
  modules: {
  }
})
