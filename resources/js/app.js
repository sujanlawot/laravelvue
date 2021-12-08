require('./bootstrap');

window.Vue = require('vue');
import vuetify from './vuetify';
Vue.component('app-container', require('./components/AppContainer.vue').default);

const app = new Vue({
    el: '#app',
    vuetify
});
