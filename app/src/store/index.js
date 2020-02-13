import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import common from './modules/common'
import menu from './modules/menu'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        common,
        menu,
    },
    state,
    mutations,
    actions
});
export default store
