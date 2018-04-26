
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import store from './store'
import mock from '@/libs/mock'
import 'iview/dist/styles/iview.css';

Vue.use(iview);

Vue.use(mock);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})