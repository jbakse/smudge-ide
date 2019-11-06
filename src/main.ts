import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/acl';

Vue.config.productionTip = false;

import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
