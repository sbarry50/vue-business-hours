import Vue from 'vue';
import App from './App.vue';
import BusinessHours from '../src/entry.js';

Vue.use(BusinessHours);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
