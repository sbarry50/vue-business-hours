import Vue from 'vue';
import App from './App.vue';
import BusinessHoursComponents from '../src/entry.js';

Vue.use(BusinessHoursComponents);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
