export default{
	//将商品信息添加到state.cartArr中
	inCrement({commit},params){
		commit("add",params);
	},
	//修改商店的选中状态
	changeSelect({commit},params){
		commit("changeSel",params);
	},
	//修改商品的选中状态
	changeSmlSel({commit},params){
		commit("changeSmlSel",params);
	},
	//同一商家商品的增加
	inCreGoods({commit},params){
		commit("addGoods",params);
	},
	//总价的计算
	calculateAllMoney({commit},params){
		commit("calculate",params);
	},
	//选中商家对总价的计算
	changeCount({commit},params){
		commit("gaiCount",params);
	},
	//选中商品对总价的计算
	smlChangeCount({commit},params){
		commit("smlGaiCount",params);
	},
	//商品+1的计算
	deleteNum({commit},params){
		commit("delNum",params);
	},
	//商品-1的计算
	addNum({commit},params){
		commit("addNum",params);
	},
	//对商品数量的统计
	totalShopNum({commit}){
		commit("shopNumTotal");
	},
	//删除商品的操作
	popShop({commit}){
		commit("moveShop");
	},
	//删除商品后的总价计算
	total({commit}){
		commit("afterMoveTotal");
	},
	classifyDetailData({commit},params){
		commit("addData",params);
	},
	replaceUname({commit},params){
		commit("changeUname",params);
	}
}