import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入各模块
import Home from "../home/home.vue";
import Classify from "../classify/classify.vue";
import Cart from "../cart/cart.vue";
import Mine from "../mine/mine.vue";
import Detail from "../home/detail/detail.vue";
import Regist from "../mine/public/regist.vue";
import Registsuccess from "../mine/public/registSuccess.vue";
import LoginSuccess from "../mine/public/loginSuccess.vue";
import classifyDetail from "../classify/classify-detail.vue";
import store from "../store"
//配置routes
var routes = [
	{path:"/home",component:Home,meta:{title:"商城首页",keepAlive:true}},
	{path:"/classify",component:Classify,meta:{title:"商城分类",keepAlive:true}},
	{path:"/cart",component:Cart,meta:{title:"购物车",keepAlive:true}},
	{path:"/mine",component:Mine,meta:{title:"个人中心",keepAlive:true}},
	{path:"/detail",component:Detail,name:"detail",meta:{title:"商品详情",keepAlive:false}},
	{path:"/regist",component:Regist,meta:{title:"注册",keepAlive:false}},
	{path:"/regses",component:Registsuccess,meta:{title:"注册成功",keepAlive:false}},
	{path:"/logsuc",component:LoginSuccess,meta:{title:"个人中心",keepAlive:false}},
	{path:"/classify-detail",component:classifyDetail,meta:{title:"分类详情",keepAlive:false}},
	{path:"",redirect:"/home"}
];
// router对象实例化
var router = new VueRouter({
	routes:routes,
	linkActiveClass:"active"
});
// 对title的修改
router.beforeEach((to,from,next)=>{
	document.title = to.meta.title;
	next();
	if (to.path == "/mine") {
		var isAllowLogin = store.state.cart.isAllowLogin;
		if (isAllowLogin) {
			next("/logsuc");
		}else{
			next();
		}
	}
});
export default router;

