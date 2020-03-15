import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import rights from './rights'
import goods from './goods'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        rights,
        goods
    }
})