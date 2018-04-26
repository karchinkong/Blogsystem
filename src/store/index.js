import Vue from 'vue';
import Vuex from 'vuex';

import blogs from './modules/blogs';
import user from './modules/user';

Vue.use(Vuex);


export default new Vuex.Store({

    modules: {
        
        blogs,

        user

    }

})
