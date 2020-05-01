<template>
  	<!-- 商品详情页面 -->
  	<div class="detail">
  		<!-- 详情显示主要组成 -->
	  	<div class="main">
	  		<!-- 头部 -->
		  	<my-head>
		  		<h1>商品详情</h1>
		  		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
		  	</my-head>
		  	<!-- 详情中的商品图片 -->
		  	<ul>
		  		<li>
		  			<img :src="iconSrc" alt="">
		  		</li>
		  	</ul>
		  	<!-- 商品价格 -->
		  	<div class="price">
		  		<p class="price-a">¥{{shopPrice}}</p>
		  		<div class="price-b">
		  			<div>
						<mu-icon class="money" value="arrow_downward"></mu-icon>
				  		<p>降价提醒</p>
		  			</div>
		  			<div @click="addToCollect(iconSrc,shopTitle,addDes,shopPrice,shopName)">
						<mu-icon class="money" value="collections"></mu-icon>
		  				<p>收藏</p>
		  			</div>
		  		</div>
		  	</div>
		  	<!-- 商品标题 -->
		  	<div class="title">
		  		<p>{{shopTitle}}</p>
		  	</div>
		  	<!-- 商品数量选择 -->
		  	<div class="choose" @click="showAddnum">
		  		<p class="text">已选</p>
		  		<p class="choose-text">{{addDes}},{{buyNum}}个</p>
		  	</div>
		  	<!-- 住址 -->
		  	<div class="address">
		  		<p class="address-text">送至</p>
		  		<p class="address-detail">北京朝阳区三环到四环之间</p>
		  	</div>
		  	<!-- 运费 -->
		  	<div class="transition">
		  		<p class="transition-text">运费</p>
		  		<p class="transition-detail">免运费</p>
		  	</div>
		  	<!-- 商品保障 -->
		  	<div class="description">
		  		<p class="description-text">商家发货&售后</p>
		  		<p class="description-text">7天无理由退货</p>
		  		<p class="description-text">货到付款</p>
		  	</div>
		  	<!-- 商品详情的tabbar -->
		  	<div class="detail-foot">
		  		<div class="foot-text">
		  			<div>
		  				<mu-icon value="chat"></mu-icon>
						<p>联系客服</p>
		  			</div>
		  			<div>
		  				<mu-icon value="all_inbox"></mu-icon>
						<p>进店</p>
		  			</div>
		  			<div class="cart-show" @click="goToCart">
		  				<mu-icon value="shopping_cart"></mu-icon>
		  				<p>购物车</p>
		  				<i :class="cartNum==0?'none':'cartnumshow'">{{cartNum}}</i>
		  			</div>
		  		</div>
		  		<div class="foot-button">
		  			<mu-button color="warning"  @click="showAddnum">加入购物车</mu-button>
		  			<mu-button color="error">立即购买</mu-button>
		  		</div>
		  	</div>
	  	</div>
	  	<!-- 商品加入购物车 -->
		<div class="addnum-box"  @click.self="hideAddnum"   v-show="isShowAddnum">
		  	<div class="addnum">
			  	<div class="addnum-head">
			  			<img :src="iconSrc" alt="">
			  			<div class="addnum-des">
			  				<p class="price">¥{{shopPrice}}</p>
			  				<div>
			  					<p class="text">已选</p>
			  					<p class="des">{{addDes}},{{buyNum}}个</p>
			  				</div>
			  			</div>
			  	</div>
			  	<div class="addnum-count">
			  		<p class="num-text">数量</p>
			  		<div class="modify">
			  			<mu-icon value="remove" @click="goodsDel"></mu-icon>
			  			<p>{{buyNum}}</p>
			  			<mu-icon value="add" @click="goodsAdd"></mu-icon>
			  		</div>
			  	</div>
		  		<div class="addnum-foot">
		  			<mu-button color="warning" @click="addToCart(iconSrc,shopTitle,addDes,buyNum,shopPrice,shopName)">加入购物车</mu-button>
		  			<mu-button color="error">立即购买</mu-button>
		  		</div>
			</div>
		</div>
		<!-- 加入购物车成功 -->
		<div class="addToCartSuccess" v-show="isShowSuccess">
			<mu-icon value="done_outline"></mu-icon>
			<p>添加至购物车成功</p>
		</div>
		<div class="addToColSuccess" v-show="isShowCollectSuccess">
			<mu-icon value="done_outline"></mu-icon>
			<p>添加至收藏夹成功</p>
		</div>
		<div class="addToColFailed" v-show="isShowCollectFailed">
			<mu-icon value="clear"></mu-icon>
			<p>此商品已在收藏夹</p>
		</div>
		<div class="loginOrNot" v-show="noLogin">
			<mu-icon value="clear"></mu-icon>
			<p>请先登录</p>
		</div>
	</div>
</template>

<script>
import myHead from "../../common/head.vue";
import {mapActions,mapGetters,mapState} from "vuex";
export default {
 data(){
 	return{
 		iconSrc:"",
 		shopTitle:"",
 		shopPrice:"",
 		addDes:"",
 		buyNum:1,
 		isShowAddnum:false,
 		open:false,
 		shopName:"",
 		titleShow:true,
 		selOrCom:true,
 		smlSelOrCom:true,
 		isShowSuccess:false,
 		isShowCollectSuccess:false,
 		isShowCollectFailed:false,
 		noLogin:false
 	}
 },
 computed:{
 	...mapGetters({
 		"cartNum":"allNum"
 	}),
 	...mapState({
 		arr:state => state.cart.cartArr,
 		collectArr:state => state.collect.collectArr,
 		uname:state =>state.cart.uname
 	})
 },
 created(){
 	// 获取route传递的参数
 	this.iconSrc = this.$route.query.src;
 	this.shopTitle = this.$route.query.title + this.$route.query.des;
 	this.shopPrice = this.$route.query.price;
 	this.addDes = this.$route.query.des;
 	this.shopName = this.$route.query.shopName;
 	var date = new Date();
 	let y = date.getFullYear();
	let m = date.getMonth()+1;
	m = m < 10 ? "0" + m : m;
	let d = date.getDate();
	d = d < 10 ? "0" + d : d;
	date = y + "-" + m + "-" + d;
 	this.addToFootprint({date:date,detail:[{src:this.iconSrc,title:this.shopTitle,des:this.addDes,price:this.shopPrice,shopName:this.shopName}]})
 },
 components:{
 	"my-head":myHead
 },
 methods:{
 	...mapActions({
 		increment:"inCrement",
 		increGoods:"inCreGoods",
 		carculate:"calculateAllMoney",
 		shopNumTotal:"totalShopNum",
 		addCollectGoods:"increCollectGoos",
 		addToFootprint:"addToFootprint"
 	}),
	back(){
		// 返回实现
		this.$router.go(-1);
	},
	showAddnum(){
		// 商品加入购物车的显示
		this.isShowAddnum = true;
	},
	hideAddnum(){
		// 商品加入购物车的隐藏
		this.isShowAddnum = false;
	},
	goodsDel(){
		// 商品数量减少
		if (this.buyNum <= 1) {
			this.buyNum = 1;
		}else{
			this.buyNum --;
		}
	},
	goodsAdd(){
		// 商品数量增加
		this.buyNum ++;
	},
	goToCart(){
		// 去购物车模块
		this.$router.push("/cart");
	},
	addToCollect(iconSrc,shopTitle,addDes,shopPrice,shopName){
		var collectArr = this.collectArr;
		var that = this;
		if (this.uname == "") {
			this.noLogin = true;
			setTimeout(function(){
				that.noLogin = false;
			},2000)
		}else{
			var isInCollect = false;
			for(var i = 0;i < collectArr.length;i ++ ){
				if (collectArr[i].title == shopTitle) {
					isInCollect = true;
				}
			}
			if (!isInCollect) {
				this.isShowCollectSuccess = true;
				this.addCollectGoods({src:iconSrc,title:shopTitle,des:addDes,price:shopPrice,shopName:shopName})
			}else{
				this.isShowCollectFailed = true;

			}
			setTimeout(function(){
				that.isShowCollectSuccess = false;
				that.isShowCollectFailed = false;
			},2000)
		}
	},
	addToCart(iconSrc,shopTitle,addDes,buyNum,shopPrice,shopName){
		// 添加到购物车的判断
		var isTo = true;
		var isSame = true;
		var arr = this.arr;
		var selOrCom = this.selOrCom;
		var smlSelOrCom = this.smlSelOrCom;
		/*
			如果不同商家则商家名称也加入
			如果同一商家不同商品则添加商品即可
			如果同一商家同一商品则增加数量即可
		*/
		for (var i = 0; i < arr.length ; i++) {
			if (arr[i].shopName == shopName) {
				var arr2 = arr[i].detail;
				isTo = false;
				isSame = false;
				for(var i =0;i<arr2.length;i++){
					if(arr2[i].title == shopTitle){
						arr2[i].num += buyNum;
						isTo = false;
						isSame = true;
					}
				}
			}
		}
		if (isTo) {
			this.increment({shopName:shopName,selOrCom:selOrCom,"detail":[{title:shopTitle,des:addDes,num:buyNum,price:shopPrice,src:iconSrc,smlSelOrCom:smlSelOrCom}]})
		}
		if(! isSame){
			this.increGoods({shopName:shopName,selOrCom:selOrCom,"detail":[{title:shopTitle,des:addDes,num:buyNum,price:shopPrice,src:iconSrc,smlSelOrCom:smlSelOrCom}]})
		}
		this.carculate(true);
		this.shopNumTotal();
		this.isShowSuccess = true;
		this.isShowAddnum = false;
		var that = this;
		setTimeout(function(){
			that.isShowSuccess = false;
		},2000)
	}
 }
}
</script>

<style lang="less" scoped>
@import url("../../less/common.less");
	ul{
		list-style:none;
	}
	.addToCartSuccess{
		width:120px;
		height:100px;
		background-color:rgba(0,0,0,0.7);
		border:1px solid rgba(255,255,255,0.7);
		position:absolute;
		top:50%;
		left:50%;
		margin-left:-50px;
		margin-top:-50px;
		.flexColumnCenter();
		justify-content:center;
		p{
			margin:0 auto;
			padding:0;
			color:white;
		}
		.mu-icon{
			color:white;
			padding:10px;
			border-radius:50%;
			border:1px solid #fff;
			font-size:16px;
		}
	}
	.addToColSuccess{
		width:120px;
		height:100px;
		background-color:rgba(0,0,0,0.7);
		border:1px solid rgba(255,255,255,0.7);
		position:absolute;
		top:50%;
		left:50%;
		margin-left:-50px;
		margin-top:-50px;
		.flexColumnCenter();
		justify-content:center;
		p{
			margin:0 auto;
			padding:0;
			color:white;
		}
		.mu-icon{
			color:white;
			padding:10px;
			border-radius:50%;
			border:1px solid white;
			font-size:16px;
		}
	}
	.addToColFailed{
		width:120px;
		height:100px;
		background-color:rgba(0,0,0,0.7);
		border:1px solid rgba(255,255,255,0.7);
		position:absolute;
		top:50%;
		left:50%;
		margin-left:-50px;
		margin-top:-50px;
		.flexColumnCenter();
		justify-content:center;
		p{
			margin:0 auto;
			padding:0;
			color:red;
		}
		.mu-icon{
			color:red;
			padding:10px;
			border-radius:50%;
			border:1px solid red;
			font-size:16px;
		}
	}
	.loginOrNot{
		width:120px;
		height:100px;
		background-color:rgba(0,0,0,0.7);
		border:1px solid rgba(255,255,255,0.7);
		position:absolute;
		top:50%;
		left:50%;
		margin-left:-50px;
		margin-top:-50px;
		.flexColumnCenter();
		justify-content:center;
		p{
			margin:0 auto;
			padding:0;
			color:red;
		}
		.mu-icon{
			color:red;
			padding:10px;
			border-radius:50%;
			border:1px solid red;
			font-size:16px;
		}
	}
	.addnum-box{
		margin:0 auto;
		max-width:800px;
		width:100%;
		height:100%;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		background-color:rgba(0,0,0,0.7);
		z-index:100;
		transition:all 1s;
		.addnum{
			position:absolute;
			bottom:0;
			width:100%;
			height:300px;
			.flexColumnCenter();
			justify-content:space-between;
			background-color:#fff;
			.addnum-head{
				align-self:flex-start;
				.flexRowCenter();
				img{
					margin-left:10px;
					width:90px;
					height:90px;
					align-self:flex-start;
				}
				.addnum-des{
					margin-left:10px;
					height:90px;
					.flexColumnCenter();
					.price{
						align-self:flex-start;
						color:@mallColor;
						margin-left:5px;
					}
					div{
						.flexRowCenter();
						p{
							margin:0;
							margin-left:5px;
							font-size:12px;
							height:20px;
							line-height:20px;
						}
						.des{
							over-flow:hidden;
						}
						.text{
							color:gray;
						}
					}
				}
			}
			.addnum-count{
				width:100%;
				.flexRowCenter();
				justify-content:space-between;
				.num-text{
					margin-left:5px;
					color:gray;
					height:30px;
					line-height:30px;
				}
				.modify{
					.flexRowCenter();
					margin-right:5px;
					.mu-icon{
						background-color:#f7f7f7;
						margin-right:5px;
						flex:1;
						height:30px;
						line-height:30px;
						text-align:center;
					}
					p{
						width:50px;
						text-align:center;
						flex:2;
						margin-right:5px;
						background-color:#f7f7f7;
						height:30px;
						line-height:30px;
					}
				}
			}
			.addnum-foot{
				width:100%;
				align-self:flex-start;
				.flexRowCenter();
				.mu-button{
					width:50%;
				}
			}
		}
	}
	.detail{
		margin:0 auto;
		max-width:800px;
		height:100%;
		.main{
			width:100%;
			height:100%;
			ul{
				margin:0;
				width:100%;
				padding:0;
				height:100%;
				li{
					margin:0;
					padding:0;
					width:100%;
					height:100%;
					img{
						padding:0;
						margin:0;
						width:100%;
						height:100%;
					}
				}
			}
			.price{
				width:100%;
				height:40px;
				.price-a{
					float:left;
					font-size:24px;
					height:40px;
					line-height:40px;
					color:@mallColor;
					margin:0;
				}
				.price-b{
					margin:0;
					color:gray;
					.mu-icon{
						margin:0;
						width:15px;
						height:15px;
						font-size:15px;
						line-height:15px;
					}
					float:right;
					height:40px;
					text-align:center;
					.flexRowCenter();
					div{
						margin-right:5px;
						text-align:center;
						.flexColumnCenter();
						p{
							margin:0;
						}
					}
				}
			}
			.title{
				p{
					font-size:16px;
					font-weight:600;
				}
			}
			.choose{
				.flexRowCenter();
				.text{
					margin:0 8px;
					color:gray;
				}
				.choose-text{

				}
			}
			.detail-foot{
				margin:0 auto;
				max-width:800px;
				position:fixed;
				bottom:0;
				left:0;
				right:0;
				height:50px;
				z-inde:10;
				background-color:#fff;
				.flexRowCenter();
				.foot-text{
					width:48%;
					height:100%;
					.flexRowCenter();
					div{
						color:gray;
						width:33.3%;
						.flexColumnCenter();
						.mu-icon{
							height:50%;
						}
						p{
							margin:0;
							height:50%;
							font-size:10px;
							line-height:50%;
						}
					}
					.cart-show{
						position:relative;
						.none{
							display:none;
							position:absolute;
							top:-5px;
							right:10px;
							width:15px;
							height:15px;
							border-radius:50%;
							background-color:red;
							text-align:Center;
							line-height:15px;
							font-size:8px;
							color:#fff;
						}
						.cartnumshow{
							position:absolute;
							top:-5px;
							right:10px;
							width:15px;
							height:15px;
							border-radius:50%;
							background-color:red;
							text-align:Center;
							line-height:15px;
							font-size:8px;
							color:#fff;
						}
					}
				}
				.foot-button{
					width:52%;
					height:100%;
					.flexRowCenter();
					.mu-button{
						margin:0;
						padding:0;
						height:50px;
						width:50%;
						font-size:12px;
						height:100%;
						line-height:56px;
					}
					.mu-raised-button{
						.mu-button-wrapper{
							padding:0;
						}
					}
				}
			}
			.address{
				.flexRowCenter();
				.address-text{
					color:gray;
					margin:0 8px;
				}
			}
			.transition{
				.flexRowCenter();
				.transition-text{
					color:gray;
					margin:0 8px;
				}
			}
			.description{
				.flexRowCenter();
				p{
					margin-left:8px;
				}
				p::before{
					content:"";
					display:inline-block;
					width:12px;
					height:12px;
					background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTOU5O+Q5POU5POQ4O+U4PN80P+M4O+Q4O+Q4POQ5POQ4OuQ4O+Q4O+I4PuQ5PJxkAycAAAAPdFJOUwAf+VSoeAvzws7ka7miLboUzckAAADJSURBVBjTY2BgYGCMWVR5VIABDBid/gPBFwjP/JOzQKKtfjGIzf3fEUSJ/N8AJO21Iao3fQbqqA+AcLi/CzCwfGGAAn8HBnlFMIttBoP4R4b4C2BOzk8G3q8M5w3AnPsLGZj/MKwHW8b6/QED4y8G/QQQx14ZSHwCcWYkMOtvAHOAyvqnPf8KcuMvkAGZP9eDjAQaEO/AwDb/D0gj0GiQpRnTQIYIfUR1DopDGexVIZygz8ieC4B6WyzRBOJtBkZ/pAABBZUWOKgAispF5e7ibycAAAAASUVORK5CYII=) no-repeat;
					background-size:12px auto;
					vertical-align: middle;
					margin-top:-2px;
				}
			}
		}
	}
</style>
