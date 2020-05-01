export default{
	addCollectGoods(state,obj){
		state.collectArr.push(obj);
		state.collectNum += 1;
	},
	changeCollectArr(state,obj){
		state.collectArr = obj;
	},
	changeCollectNum(state,obj){
		state.collectNum = obj;
	}
}