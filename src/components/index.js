import Vue from 'vue';
import BusinessHours from './BusinessHours.vue';
import BusinessHoursSelect from './BusinessHoursSelect.vue';
import BusinessHoursDatalist from './BusinessHoursDatalist.vue';

const Components = {
  BusinessHours,
  BusinessHoursSelect,
  BusinessHoursDatalist
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
