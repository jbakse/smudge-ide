import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import { firestorePlugin } from 'vuefire';

Vue.use(firestorePlugin);

import { user } from '@/firebase/user';
import Acl from 'vue-browser-acl';
Vue.use(Acl, user, (acl: any) => {
  acl.rule('write', 'sketch', (u: any, sketch: any) => {
    return u.uid === sketch.ownerId;
  });

  acl.rule('write', 'profile', (u: any, profile: any) => {
    return u.uid === profile.id;
  });

  acl.rule('be', 'profile', (u: any, profile: any) => {
    return u.uid === profile.id;
  });

  acl.subjectMapper = (subject: any) => {
    let mappedValue = 'unknown';
    if (typeof subject === 'string') mappedValue = subject;
    if (typeof subject === 'object') {
      // mappedValue = 'object';
      if (
        hasAll(subject, ['id', 'ownerId', 'ownerUsername', 'source', 'title'])
      ) {
        mappedValue = 'sketch';
      }

      if (hasAll(subject, ['displayName', 'id', 'photoURL', 'username'])) {
        mappedValue = 'profile';
      }
    }
    // console.log(subject, mappedValue);
    return mappedValue;
  };
});

function hasAll(subject: object, keys: string[]) {
  return keys.every((key) => subject.hasOwnProperty(key));
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
