// Import vue components
import * as components from './components/index';
import { helperMixin } from './mixins/helperMixin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(components).forEach(componentName => {
    Vue.component(componentName, components[componentName]);
  });

  Vue.mixin(helperMixin);
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
