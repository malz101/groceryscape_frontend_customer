import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Shop from '../views/Shop';
import Cart from '../views/Cart';
import Contact from '../views/Contact';
import AboutUs from '../views/AboutUs';
import Login from '../views/Login';
import OrderHistory from '../views/OrderHistory';
import Register from '../views/Register';
import Checkout from '../views/Checkout';
import Item from '../views/Item';
import Invoice from '../views/Invoice';
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path:'/login',
    component:Login
  },
  {
    path: '/shop',
    component: Shop,
  },
  {
    path:'/item/:id',
    component:Item
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/checkout',
    component: Checkout
  },
  {
    path:'/contact',
    component: Contact
  },
  {
    path:'/about-us',
    component:AboutUs
  },
  {
    path:'/register',
    component: Register
  },
  {
    path:'/order-history',
    component: OrderHistory
  },
  {
    path:'/invoice',
    component:Invoice
  },
  { 
    path: "*", 
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next)=>{
  // if (to.path !== '/login' && !store.getters.isLoggedIn) {
  //   next({ path: '/login' });
  // }
  if (to.path === '/login' && store.getters.isLoggedIn){
    next({path: '/'});
  }
  else{
    next();
  }
});


export default router;
