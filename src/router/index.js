import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common/common'
import Login from '../views/login/login.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '',
        component: Common,
        meta: {
            title: '首页',
            enTitle: 'dashboard',
            icon: 'el-icon-s-home'
        },
        children: [{
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                path: "/home"
            },
        }]
    },
    {
        path: '/users',
        component: Common,
        meta: {
            title: '用户管理',
            enTitle: 'users',
            icon: 'el-icon-user'
        },
        children: [{
            path: "users",
            name: "users",
            component: () =>
                import ('../views/users/users.vue'),
            meta: {
                title: '用户列表',
                enTitle: 'users',
                icon: 'el-icon-folder-opened',
                path: "/users/users"
            },
        }]
    },
    {
        path: '/rights',
        component: Common,
        meta: {
            title: '权限管理',
            enTitle: 'rights',
            icon: 'el-icon-folder'
        },
        children: [{
                path: "roles",
                name: "roles",
                component: () =>
                    import ('../views/rights/roles.vue'),
                meta: {
                    title: '角色列表',
                    enTitle: 'roles',
                    icon: 'el-icon-setting',
                    path: "/rights/roles"
                },
            },
            {
                path: "rights",
                name: "rights",
                component: () =>
                    import ('../views/rights/rights.vue'),
                meta: {
                    title: '权限列表',
                    enTitle: 'rights',
                    icon: 'el-icon-c-scale-to-original',
                    path: "/rights/rights"
                },
            }
        ]
    },
    {
        path: '/goods',
        component: Common,
        meta: {
            title: '商品管理',
            enTitle: 'goods',
            icon: 'el-icon-goods'
        },
        children: [{
                path: "goods",
                name: "goods",
                component: () =>
                    import ('../views/goods/goods.vue'),
                meta: {
                    title: '商品列表',
                    enTitle: 'goods',
                    icon: 'el-icon-bangzhu',
                    path: "/goods/goods"
                },
            },
            {
                path: "params",
                name: "params",
                component: () =>
                    import ('../views/goods/params.vue'),
                meta: {
                    title: '分类参数',
                    enTitle: 'params',
                    icon: 'el-icon-bell',
                    path: "/goods/params"
                },
            },
            {
                path: "categories",
                name: "categories",
                component: () =>
                    import ('../views/goods/categories.vue'),
                meta: {
                    title: '商品分类',
                    enTitle: 'categories',
                    icon: 'el-icon-date',
                    path: "/goods/categories"
                },
            }
        ]
    },
    {
        path: '/orders',
        component: Common,
        meta: {
            title: '订单管理',
            enTitle: 'orders',
            icon: 'el-icon-s-order'
        },
        children: [{
            path: "orders",
            name: "orders",
            component: () =>
                import ('../views/orders/orders.vue'),
            meta: {
                title: '订单列表',
                enTitle: 'orders',
                icon: 'el-icon-folder-add',
                path: "/orders/orders"
            },
        }]
    },
    {
        path: '/reports',
        component: Common,
        meta: {
            title: '数据统计',
            enTitle: 'reports',
            icon: 'el-icon-message'
        },
        children: [{
            path: "reports",
            name: "reports",
            component: () =>
                import ('../views/reports/reports.vue'),
            meta: {
                title: '数据报表',
                enTitle: 'reports',
                icon: 'el-icon-position',
                path: "/reports/reports"
            },
        }]
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router