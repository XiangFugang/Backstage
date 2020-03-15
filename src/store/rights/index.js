import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        ['SET_LIST'](state, data) {
            state.list = data
        },
    },
    actions: {
        //权限列表
        async getList({ commit }, type) {
            let res = await api.getList(type)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_LIST', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
    }
}