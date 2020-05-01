export default{
	addToFootprint({commit},params){
		commit("footprint",params);
	},
	replaceFootprintArr({commit},params){
		commit("replacefootprintarr",params);
	},
}