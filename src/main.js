import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './http/api'
import dayjs from 'dayjs'
import "nprogress/nprogress.css";
import echarts from 'echarts'
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI);
Vue.use(ZkTable)

Vue.use(echarts);

Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')