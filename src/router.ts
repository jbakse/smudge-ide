import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/user/:username',
      name: 'user',
      props: true,
      component: () =>
        import(/* webpackChunkName: "about" */ './views/User.vue'),
    },

    {
      path: '/users',
      name: 'users',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Users.vue'),
    },

    {
      path: '/sketch/:sketchId',
      name: 'sketch',
      props: true,
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Sketch.vue'),
    },
  ],
});
