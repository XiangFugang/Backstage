import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router/index'
export default {
    namespaced: true,
    state: {
        user: {},
        userList: [],
        loading: false,
        menus: {},
        users: [],
        addUser: {},
        addRoles: {},
        upstate: {},
        updateUser: {},
        updateRoles: {},
        delUser: '',
        delRoles: '',
        roles: [],
        subRole: {},
        reports: {}
    },
    mutations: {
        ['SET_USER'](state, data) {
            state.user = data
        },
        ['SET_USER_LIST'](state, data) {
            state.userList = data
        },
        ['SET_LOADING'](state, data) {
            state.loading = data
        },
        ['SET_MENUS'](state, data) {
            state.menus = data
        },
        ['SET_USERS'](state, data) {
            state.users = data
        },
        ['SET_ADD_USER'](state, data) {
            state.addUser = data
        },
        ['SET_ADD_ROLES'](state, data) {
            state.addRoles = data
        },
        ['SET_UP_STATE'](state, data) {
            state.upstate = data
        },
        ['SET_UPDATE_USER'](state, data) {
            state.updateUser = data
        },
        ['SET_UPDATE_ROLES'](state, data) {
            state.updateRoles = data
        },
        ['SET_DEL_USER'](state, data) {
            state.delUser = data
        },
        ['SET_DEL_ROLES'](state, data) {
            state.delRoles = data
        },
        ['SET_ROLES'](state, data) {
            state.roles = data
        },
        ['SET_REPORTS'](state, data) {
            state.reports = data
        },
    },
    actions: {
        //登录
        async login({ commit }, params) {
            let res = await api.login(params)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_USER', res.data)
                Message.success(res.meta.msg)
                    //存储信息
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('token', res.data.token)
                    //跳转路由
                router.push('/home')
                commit('SET_LOADING', false)
                return res
            } else {
                Message.error(res.meta.msg)
                commit('SET_LOADING', false)
            }
        },
        //添加用户
        async addUsers({ commit }, ruleForm) {
            let res = await api.addUsers(ruleForm)
                //请求成功
            if (res.meta.status === 201) {
                commit('SET_ADD_USER', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //添加角色
        async addRoles({ commit }, ruleForm) {
            let res = await api.addRoles(ruleForm)
                //请求成功
            if (res.meta.status === 201) {
                commit('SET_ADD_ROLES', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //左侧权限列表
        async menus({ commit }) {
            let res = await api.menus()
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_MENUS', res.data)
                    //存储信息
                return res
            }
        },
        //角色列表
        async roles({ commit }) {
            let res = await api.roles()
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_ROLES', res.data)
                    //存储信息
                return res
            }
        },
        //请求用户列表
        async users({ commit }, { pagenum = 1, pagesize = 5, query = '' }) {
            let res = await api.users(pagenum, pagesize, query)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_USERS', res.data.users)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //修改用户状态
        async upstate({ commit }, { uId, type }) {
            let res = await api.upstate(uId, type)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_UP_STATE', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑用户
        async updateUser({ commit }, { id, email, mobile }) {
            let res = await api.updateUser(id, email, mobile)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_UPDATE_USER', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑角色
        async updateRoles({ commit }, { id, roleName, roleDesc }) {
            let res = await api.updateRoles(id, roleName, roleDesc)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_UPDATE_ROLES', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除单个用户
        async delUser({ commit }, id) {
            let res = await api.delUser(id)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_DEL_USER', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除角色
        async delRoles({ commit }, id) {
            let res = await api.delRoles(id)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_DEL_ROLES', res.data)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //分配角色
        async subRole({ commit }, { id, rid }) {
            let res = await api.subRole(id, rid)
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_SUB_ROLE', res.data)
                Message.success(res.meta.msg)
                return res
            } else {
                Message.error(res.meta.msg)
            }
        },
        //折线图
        async reports({ commit }) {
            let res = await api.reports()
                //请求成功
            if (res.meta.status === 200) {
                commit('SET_REPORTS', res.data)
                    //存储信息
                return res
            }
        },
    }
}