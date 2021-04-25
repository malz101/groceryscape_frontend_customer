import Vue from 'vue';
import Vuex from 'vuex';
import groceriesService from '../service/groceries.service';
import authService from '../service/auth.service';
import cartService from '../service/cart.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: sessionStorage.getItem('user_id') || '',
    token: sessionStorage.getItem('token') || '',
    groceries:[],
    cart:{},
    cartAmount:0
  },
  getters:{
    isLoggedIn(state){
      if(state.isLoggedIn == '' || state.isLoggedIn == undefined || state.isLoggedIn == null){
        return false;
      }
      return true;
    },
    token(state){
      return state.token;
    },
    cartAmount(state){
      return Object.values(state.cart).length;
    },
    groceries(state){
      return state.groceries;
    },
    cart(state){
      return state.cart;
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
    setCart(state, cart){
      state.cart = cart;
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
    logout({commit}){
      return authService.logout()
      .then((result)=>{
        commit('setLoggedIn', '');
      })
      .catch(()=>{
        console.log(err);
      })
    },
    getGroceries({commit}){
      return groceriesService.getGroceries()
      .then((result)=>{
        commit('setGroceries', result);
      });
    },
    getCart({commit, getters}){
      return cartService.getCart(getters.token)
      .then(({data, msg})=>{
        if (msg=='success'){
          commit('setCart', data['items']);
        }
        else if(msg=='no items found'){
          commit('setCart', {});
        }
        else{
          alert('An error occurred');
        }
      })
    },
    addToCart({dispatch, getters}, payload){
      return cartService.addToCart(getters.token, payload)
      .then((result)=>{
        dispatch('getCart');
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    emptyCart({dispatch, getters}){
      return cartService.emptyCart(getters.token)
      .then(({msg})=>{
        if(msg=='success'){
          dispatch('getCart');
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
    checkoutCart({dispatch, getters}){
      return cartService.checkoutCart(getters.token)
      .then(({msg, order})=>{
        if(msg == 'success'){
          dispatch('emptyCart');
          alert('Checkout Successful');
        }
        else{
          alert('An error occurred. Failed to checkout');
        }
      })
      .catch(({msg})=>{
        alert('An error occurred.'+msg);
      })
    }
  },
  modules: {
  }
})
