import Vue from 'vue';
import App from './App.vue';
import BusinessHours from './components/BusinessHours.vue';
import SelectTimes from './components/SelectTimes.vue';
import { ToggleButton } from 'vue-js-toggle-button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes);

Vue.component('BusinessHours', BusinessHours);
Vue.component('SelectTimes', SelectTimes);
Vue.component('ToggleButton', ToggleButton);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
