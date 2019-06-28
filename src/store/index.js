import Vue from 'vue'
import Vuex from 'vuex'

import music from  './modules/music'
import user from  './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: user,
        music:music
    }
});

export default store