import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/AppContainer'
import About from '../components/ExampleComponent'
import undeclaredRoute from './undeclaredRoute'

Vue.use(VueRouter);

const router = new VueRouter({

    mode: 'history',
    routes: [
        ...undeclaredRoute,
    ]
});

export default router;
