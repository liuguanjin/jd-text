export default{
	increCollectGoos({commit},params){
		commit("addCollectGoods",params);
	},
	replaceCollectArr({commit},params){
		commit("changeCollectArr",params);
	},
	replaceCollectNum({commit},params){
		commit("changeCollectNum",params);
	}
}