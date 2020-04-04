export default{
	//将商品信息添加到state.cartArr中
	add(state,obj){
		state.cartArr.push(obj)
	},
	//修改商店的选中状态
	changeSel(state,obj){
		state.cartArr[obj].selOrCom = ! state.cartArr[obj].selOrCom;
		var arr = state.cartArr[obj].detail;
		for(var i=0;i<arr.length;i++){
			arr[i].smlSelOrCom =  state.cartArr[obj].selOrCom; 
		}
	},
	//修改商品的选中状态
	changeSmlSel(state,obj){
		state.cartArr[obj[0]].detail[obj[1]].smlSelOrCom = ! state.cartArr[obj[0]].detail[obj[1]].smlSelOrCom;
	},
	//同一商家商品的增加
	addGoods(state,obj){
		var cartArr = state.cartArr;
		for(var i = 0;i < cartArr.length;i ++){
			if (obj.shopName == cartArr[i].shopName) {
				cartArr[i].detail.push(obj.detail[0]);
			}
		}
		state.cartArr = cartArr;
	},
	//总价的计算
	calculate(state,obj){
		var total = 0;
		var cartArr = state.cartArr;
		if (obj) {
			for(var i = 0;i < cartArr.length;i ++){
				cartArr[i].selOrCom = obj;
				var arr = cartArr[i].detail;
				for(var u = 0;u < arr.length;u ++){
					total += arr[u].num * arr[u].price;
					arr[u].smlSelOrCom = obj;
				}
			}
		}else{
			for(var i = 0;i < cartArr.length;i ++){
				cartArr[i].selOrCom = obj;
				var arr = cartArr[i].detail;
				for(var u = 0;u < arr.length;u ++){
					arr[u].smlSelOrCom = obj;
				}
			}
			total = 0.00;
		}
		state.total = total;
	},
	//选中商品对总价的计算
	smlGaiCount(state,obj){
		var total = state.total;
		var allChoose = true;
		if ( ! state.cartArr[obj[0]].detail[obj[1]].smlSelOrCom) {
			state.cartArr[obj[0]].selOrCom = false;
			allChoose = false;
			total -= state.cartArr[obj[0]].detail[obj[1]].num*state.cartArr[obj[0]].detail[obj[1]].price;
		}else{
			total += state.cartArr[obj[0]].detail[obj[1]].num*state.cartArr[obj[0]].detail[obj[1]].price;
		}
		var nameChoose = false;
		var arr = state.cartArr[obj[0]].detail;
		for(var i = 0;i < arr.length;i ++){
			if(! arr[i].smlSelOrCom){
				nameChoose = true;
			}
		}
		if (! nameChoose) {
			state.cartArr[obj[0]].selOrCom = true;
		}
		state.total = total;
		return allChoose;
	},
	//选中商家对总价的计算
	gaiCount(state,obj){
		var allChoose = true;
		var cartArr = state.cartArr;
		var total = state.total;
		if ( ! cartArr[obj].selOrCom) {
			allChoose = false;
			var arr = cartArr[obj].detail;
			for(var i = 0; i < arr.length;i ++){
				total -= arr[i].num * arr[i].price;
			}
		}else{
			var arr = cartArr[obj].detail;
			for(var i = 0; i < arr.length;i ++){
				total += arr[i].num * arr[i].price;
			}
		}
		for(var i = 0;i < cartArr.length;i ++){
			if (cartArr[i].selOrCom) {
				allChoose = false;
			}else{
				allChoose = true;
			}
		}
		state.total = total;
		return allChoose;
	},
	//商品+1的计算
	delNum(state,obj){
		var num = state.cartArr[obj[0]].detail[obj[1]].num;
		if(num > 1){
			num -= 1;
			state.total -= state.cartArr[obj[0]].detail[obj[1]].price;
		}else{
			num = 1;
		}
		state.cartArr[obj[0]].detail[obj[1]].num = num;
	},
	//商品-1的计算
	addNum(state,obj){
		var num = state.cartArr[obj[0]].detail[obj[1]].num;
		num += 1;
		state.total += state.cartArr[obj[0]].detail[obj[1]].price;
		state.cartArr[obj[0]].detail[obj[1]].num = num;
	},
	//商品的数量
	shopNumTotal(state){
		var cartArr = state.cartArr;
		var num = 0;
		for(var i = 0;i < cartArr.length;i ++ ){
			for(var j = 0;j < cartArr[i].detail.length;j ++ ){
				num += 1;
			}
		}
		state.totalNum = num;
	},
	//删除商品的操作
	moveShop(state){
		var cartArr = state.cartArr;
		for(var i = 0;i < cartArr.length;i ++ ){
			if (cartArr[i].selOrCom) {
				cartArr.splice(i,1);
			}else{
				var arr = cartArr[i].detail;
				for(var j = 0;j < arr.length;j ++ ){
					if (arr[j].smlSelOrCom) {
						cartArr[i].detail.splice(j,1);
					}
				}
			}
		}
		state.cartArr = cartArr;
	},
	//删除商品的同时对总价的变化
	afterMoveTotal(state){
		var totalNum = 0;
		var cartArr = state.cartArr;
		for(var i = 0;i < cartArr.length; i ++ ){
			var arr = cartArr[i].detail;
			for(var j = 0;j < arr.length;j ++ ){
				totalNum += arr[j].num * arr[j].price;
			}
		}
		state.total = totalNum;
	},
	addData(state,obj){
		state.classifyData = obj;
	},
	// 如果localstorage中存在用户,则替换state中的uname
	changeUname(state,obj){
		state.uname = obj;
	}
}