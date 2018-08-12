import Vue from 'vue';
import VueRouter from 'vue-router';

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
    }
}

import Component from 'vue-class-component'

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // for vue-router 2.2+
]);

Vue.use(VueRouter);

const HomePage =() => import ('./pages/home-page.vue');
const router = new VueRouter({
    base: '/',
    routes: [{path:'',component:HomePage}]
});
export default router;