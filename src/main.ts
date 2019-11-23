import Vue from 'vue';

/////////////////////////////////////
// vue-browser-acl
import '@/acl';

/////////////////////////////////////
// firestore
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);

/////////////////////////////////////
// Keen
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
Vue.use(KeenUI);

/////////////////////////////////////
// vee-validate
import {
  ValidationProvider,
  ValidationObserver,
  configure,
} from 'vee-validate/dist/vee-validate.full';

configure({ bails: false });
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import ValidationErrors from '@/components/ValidationErrors.vue';
Vue.component('ValidationErrors', ValidationErrors);

import VeeInput from '@/components/VeeInput.vue';
Vue.component('VeeInput', VeeInput);

import VeeInputAuto from '@/components/VeeInputAuto.vue';
Vue.component('VeeInputAuto', VeeInputAuto);

/////////////////////////////////////
// config Vue
Vue.config.productionTip = false;

/////////////////////////////////////
// start Vue
import App from '@/App.vue';
import router from '@/router';
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
