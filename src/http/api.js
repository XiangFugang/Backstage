import service from './index'
// import axios from "./axios";
export default {
    //登录
    login(params) {
        return service.req("login", params);
    },
    //左侧菜单权限
    menus() {
        return service.req("menus");
    },
    //角色列表
    roles() {
        return service.req("roles");
    },
    //添加角色
    addRoles(ruleForm) {
        return service.req("roles", ruleForm);
    },
    //用户数据列表
    users(pagenum = 1, pagesize = 5, query = '') {
        return service.req(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`);
    },
    //订单数据列表
    orders(pagenum = 1, pagesize = 10, query = '', user_id = '', pay_status = '', is_send = '', order_fapiao_title = '', order_fapiao_company = '', order_fapiao_content = '', consignee_addr = '') {
        return service.req(`orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`);
    },
    //添加用户
    addUsers(ruleForm) {
        return service.req("users", ruleForm);
    },
    //修改用户状态
    upstate(uId, type) {
        return service.put(`users/${uId}/state/${type}`, {
            uId,
            type
        })
    },
    //编辑用户
    updateUser(id, email, mobile) {
        return service.put(`users/${id}`, {
            id,
            email,
            mobile
        })
    },
    //删除用户
    delUser(id) {
        return service.delete(`users/${id}`, id)
    },
    //删除角色
    delRoles(id) {
        return service.delete(`roles/${id}`, id)
    },
    //删除商品
    delGoods(id) {
        return service.delete(`goods/${id}`, id)
    },
    //提交分配角色
    subRole(id, rid) {
        return service.put(`users/${id}/role`, {
            id,
            rid
        })
    },
    //编辑角色
    updateRoles(id, roleName, roleDesc) {
        return service.put(`roles/${id}`, {
            id,
            roleName,
            roleDesc
        })
    },
    //权限列表
    getList(type) {
        return service.get(`rights/${type}`)
    },
    //商品数据列表
    goods(pagenum = 1, pagesize = 10, query = '') {
        return service.req(`goods?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`);
    },
    //物流信息
    wuLiu(id) {
        return service.get(`kuaidi/${id}`, id)
    },
    //折线图
    reports() {
        return service.req("reports/type/1");
    },
    //商品分类列表
    getCat() {
        return service.req(`categories`);
    },
    getCat1(pagenum, pagesize) {
        return service.req(`categories?pagenum=${pagenum}&pagesize=${pagesize}`);
    },
    getCat2(type) {
        return service.req(`categories?type=${type}`);
    },
    //获取动态参数列表或静态参数列表
    parameter(id, sel) {
        return service.get(`categories/${id}/attributes?sel=${sel}`, { id, sel })
    },
    //编辑动静态参数
    putCan(id, attrId, attr_name, attr_sel, attr_vals) {
        return service.put(`categories/${id}/attributes/${attrId}`, { id, attrId, attr_name, attr_sel, attr_vals })
    },
    //删除参数
    delCan(id, attrId) {
        return service.delete(`categories/${id}/attributes/${attrId}`, { id, attrId })
    },
    //添加动态参数或者静态属性
    addCan(id, attr_name, attr_sel, attr_vals) {
        return service.post(`cate gories/${id}/attributes`, { id, attr_name, attr_sel, attr_vals })
    },
    //编辑商品分类
    updateCategories(id, cat_name) {
        return service.put(`categories/${id}`, { id, cat_name })
    },
    //添加商品分类
    addCat(cat_pid, cat_name, cat_level) {
        return service.post(`categories`, { cat_pid, cat_name, cat_level })
    },
}