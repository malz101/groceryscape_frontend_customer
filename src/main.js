import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Toolbar from './components/Toolbar';
import ToolbarLogin from './components/ToolbarLogin';
import Footer from './components/Footer';
import StarRating from 'vue-star-rating';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import '@stripe/stripe-js';

Vue.config.productionTip = false;

Vue.component('toolbar', Toolbar);
Vue.component('toolbar-login', ToolbarLogin);
Vue.component('app-footer', Footer);
Vue.component('star-rating', StarRating);
Vue.component('date-picker', DatePicker);
Vue.component('loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
