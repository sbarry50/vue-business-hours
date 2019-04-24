import Vue from 'vue';
import App from './App.vue';
import BusinessHours from './components/BusinessHours.vue';
import BusinessHoursSelect from './components/BusinessHoursSelect.vue';
import BusinessHoursDatalist from './components/BusinessHoursDatalist.vue';
import { helperMixin } from './mixins/helperMixin';
import { ToggleButton } from 'vue-js-toggle-button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes);

Vue.component('BusinessHours', BusinessHours);
Vue.component('BusinessHoursSelect', BusinessHoursSelect);
Vue.component('BusinessHoursDatalist', BusinessHoursDatalist);
Vue.component('ToggleButton', ToggleButton);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.mixin(helperMixin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
