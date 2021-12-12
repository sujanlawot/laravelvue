require('./bootstrap');
window.Vue = require('vue');
import vuetify from './vuetify';
import route from './router';
import App from './components/App.vue';
const app = new Vue({
    el: '#app',
    router:route,
    vuetify,
    render:h=>h(App)
});
