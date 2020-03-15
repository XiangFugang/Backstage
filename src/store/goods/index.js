import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        goodsList: [],
        delGoods: '',
        orderList: [],
        wuLiu: [],
        getCat: [],
        getCat1: [],
        getCat2: [],
        parameter: [],
        canShu: {},
        delCan: '',
        addCan: {},
        updateCategories: {},
        addCat: {},
    },
    mutations: {
        ['SET_GOODS_LIST'](state, data) {
            state.userList = data
        },
        ['SET_DEL_GOODS'](state, data) {
            state.delGoods = data
        },
        ['SET_ORDER_LIST'](state, data) {
            state.orderList = data
        },
        ['SET_WU_LIU'](state, data) {
            state.wuLiu = data
        },
        ['SET_GET_CAT'](state, data) {
            state.getCat = data
        },
        ['SET_GET_CATT'](state, data) {
            state.getCat2 = data
        },
        ['SET_GET_CAC'](state, data) {
            state.getCat1 = data
        },
        ['SET_PARAMETER'](state, data) {
            state.parameter = data
        },
        ['SET_CAN_SHU'](state, data) {
            state.canShu = data
        },
        ['SET_DEL_CAN'](state, data) {
            state.delCan = data
        },
        ['SET_ADD_CAN'](state, data) {
            state.addCan = data
        },
        ['SET_UPDATE_CATEGORIES'](state, data) {
            state.updateCategories = data
        },
        ['SET_ADD_CAT'](state, data) {
            state.addCat = data
        },
    },
    actions: {
        //请求商品列表
        async goods({ commit }, { pagenum = 1, pagesize = 5, query = '' }) {
            let res = await api.goods(pagenum, pagesize, query)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_ORDER_LIST', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //请求订单列表
        async orders({ commit }, { pagenum = 1, pagesize = 10, query = '', user_id = '', pay_status = '', is_send = '', order_fapiao_title = '', order_fapiao_company = '', order_fapiao_content = '', consignee_addr = '' }) {
            let res = await api.orders(pagenum, pagesize, query, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_ORDER_LIST', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除商品
        async delGoods({ commit }, id) {
            let res = await api.delGoods(id)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_DEL_GOODS', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //查看物流
        async wuLiu({ commit }, id) {
            let res = await api.wuLiu(id)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_WU_LIU', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //商品分类列表
        async getCat({ commit }) {
            let res = await api.getCat()
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_GET_CAT', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        async getCat1({ commit }, { pagenum, pagesize }) {
            let res = await api.getCat1(pagenum, pagesize)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_GET_CAC', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        async getCat2({ commit }, type) {
            let res = await api.getCat2(type)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_GET_CATT', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //获取动态参数列表或静态参数列表
        async parameter({ commit }, { id, sel }) {
            let res = await api.parameter(id, sel)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_PARAMETER', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑参数
        async putCan({ commit }, { id, attrId, attr_name, attr_sel, attr_vals }) {
            let res = await api.putCan(id, attrId, attr_name, attr_sel, attr_vals)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_CAN_SHU', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除参数
        async delCan({ commit }, { id, attrId }) {
            let res = await api.delCan(id, attrId)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_DEL_CAN', res.data)
                    // return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //添加动态参数或者静态属性
        async addCan({ commit }, { id, attr_name, attr_sel, attr_vals }) {
            let res = await api.addCan(id, attr_name, attr_sel, attr_vals)
                //请求成功
            if (res.meta.status === 201) {
                commit('SET_ADD_CAN', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑商品分类
        async updateCategories({ commit }, { id, cat_name }) {
            let res = await api.updateCategories(id, cat_name)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_UPDATE_CATEGORIES', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //添加商品分类
        async addCat({ commit }, { cat_pid, cat_name, cat_level }) {
            let res = await api.addCat(cat_pid, cat_name, cat_level)
                //请求成功
            if (res.meta.status === 201) {
                commit('SET_ADD_CAT', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
    }
}