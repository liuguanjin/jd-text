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
import Setting from "../mine/public/setting.vue";
import Supermarket from "../home/supermarket/supermarket.vue";
import Digit from "../home/digit/digit.vue";
import Clothes from "../home/clothes/clothes.vue";
import Fresh from "../home/fresh/fresh.vue";
import Daojia from "../home/daojia/daojia.vue";
import Recharge from "../home/recharge/recharge.vue";
import Jingxi from "../home/jingxi/jingxi.vue";
import Lingquan from "../home/lingquan/lingquan.vue";
import Zhuangqian from "../home/zhuangqian/zhuangqian.vue";
import Vip from "../home/vip/vip.vue";
import Collect from "../mine/public/collect.vue";
import store from "../store";
//配置routes
var routes = [
	{path:"/home",component:Home,meta:{title:"商城首页",keepAlive:true}},
	{path:"/classify",component:Classify,meta:{title:"商城分类",keepAlive:true}},
	{path:"/cart",component:Cart,meta:{title:"购物车",keepAlive:true}},
	{path:"/mine",component:Mine,meta:{title:"个人中心",keepAlive:false}},
	{path:"/detail",component:Detail,name:"detail",meta:{title:"商品详情",keepAlive:false}},
	{path:"/regist",component:Regist,meta:{title:"注册",keepAlive:false}},
	{path:"/regses",component:Registsuccess,meta:{title:"注册成功",keepAlive:false}},
	{path:"/logsuc",component:LoginSuccess,meta:{title:"个人中心",keepAlive:false}},
	{path:"/supermarket",component:Supermarket,meta:{title:"京东超市",keepAlive:true}},
	{path:"/digit",component:Digit,meta:{title:"数码电器",keepAlive:true}},
	{path:"/clothes",component:Clothes,meta:{title:"京东服饰",keepAlive:true}},
	{path:"/fresh",component:Fresh,meta:{title:"京东生鲜",keepAlive:true}},
	{path:"/daojia",component:Daojia,meta:{title:"京东到家",keepAlive:true}},
	{path:"/recharge",component:Recharge,meta:{title:"充值缴费",keepAlive:true}},
	{path:"/jingxi",component:Jingxi,meta:{title:"京喜",keepAlive:true}},
	{path:"/lingquan",component:Lingquan,meta:{title:"领券",keepAlive:true}},
	{path:"/zhuangqian",component:Zhuangqian,meta:{title:"赚钱",keepAlive:true}},
	{path:"/vip",component:Vip,meta:{title:"PLUS会员",keepAlive:true}},
	{path:"/setting",component:Setting,meta:{title:"设置",keepAlive:false}},
	{path:"/collect",component:Collect,meta:{title:"收藏夹",keepAlive:false}},
	{path:"/classify-detail",component:classifyDetail,meta:{title:"分类详情",keepAlive:false}},
	{path:"/",redirect:"/home"}
];
// router对象实例化
var router = new VueRouter({
	routes:routes,
	linkActiveClass:"active"
});
// 对title的修改及mine页面的判断
router.beforeEach((to,from,next)=>{
	document.title = to.meta.title;
	next();
	if (to.path == "/mine") {
		var uname = store.state.cart.uname;
		if (uname != "") {
			next("/logsuc");
		}else{
			next();
		}
	}
});
export default router;

