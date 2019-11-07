import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/acl';

Vue.config.productionTip = false;

import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
Vue.use(KeenUI);

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate/dist/vee-validate.full';

configure({ bails: false });

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import ValidationErrors from '@/components/ValidationErrors.vue';
Vue.component('ValidationErrors', ValidationErrors);

import VeeInput from '@/components/VeeInput.vue';
Vue.component('VeeInput', VeeInput);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
