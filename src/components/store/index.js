import Vue from "vue";
import VueX from "vuex";
Vue.use(VueX);
//引入cart中的vuex写法
import cart from "./cart/index.js";
import collect from "./collect/index.js";
import footprint from "./footprint/index.js";
var store = new VueX.Store({
	modules:{
		cart:cart,
		collect:collect,
		footprint:footprint
	}
})
export default store;