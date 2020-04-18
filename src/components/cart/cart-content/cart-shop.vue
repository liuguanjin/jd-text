<template>
	<!-- 购物车中的商品列表 -->
  	<div class="cart-shop">
  		<!-- 商品列表 -->
  		<div class="shop">
		  	<div class="shop-detail" v-for="(item,index) in shopArr">
		  		<!-- 商家名称 -->
		  		<div class="shop-title">
		  			<!-- 商家选中图标 -->
		  			<i :class="item.selOrCom?'icon-select':'icon-common'" @click="changeSelect(index)"></i>
		  			<!-- 商家logo -->
		  			<mu-icon value="all_inbox"></mu-icon>
		  			<!-- 商店名 -->
		  			<p>{{item.shopName}}</p>
		  		</div>
		  		<!-- 商品详情 -->
		  		<div class="shop-box" v-for="(item,index1) in item.detail">
		  			<!-- 商品选中图标 -->
		  			<i :class="item.smlSelOrCom?'icon-select':'icon-common'" @click="changeSmlSelect(index,index1)"></i>
		  			<!-- 商品图片 -->
			  		<img :src="item.src" alt="">
			  		<div class="shop-des">
			  			<!-- 商品标题 -->
			  			<p class="title">{{item.title}}</p>
			  			<!-- 商品类型选择 -->
			  			<p class="des">{{item.des}}</p>
			  			<!-- 商品数量选择 -->
			  			<div class="shop-num">
			  				<p class="price">¥{{item.price}}</p>
			  				<div class="addOrDel">
					  			<mu-icon value="remove" @click="delNum(index,index1)"></mu-icon>
					  			<p>{{item.num}}</p>
					  			<mu-icon value="add" @click="addNum(index,index1)"></mu-icon>
			  				</div>
			  			</div>
			  		</div>
		  		</div>
		  	</div>
  		</div>
	  	<!-- 购物车全选结算 -->
	  	<div class="cart-foor" v-if="isCal">
	  		<div class="choose" @click="calculation()">
	  			<i :class="isSel?'icon-select':'icon-common'"></i>
	  			<p>全选</p>
	  		</div>
	  		<div class="settlement">
	  			<p>总计 : ¥{{total}}</p>
	  			<mu-button color="error"  @click="">去结算</mu-button>
	  		</div>
	  	</div>
	  	<div class="cart-foor" v-if="!isCal">
	  		<div class="choose" @click="calculation()">
	  			<i :class="isSel?'icon-select':'icon-common'"></i>
	  			<p>全选</p>
	  		</div>
	  		<div class="colOrMov">
	  			<p class="collect" @click="addToCol">移入收藏夹</p>
	  			<p class="move" @click="moveShop">删除</p>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import eventBus from "../../eventbus/eventbus.js";
export default {
	data(){
		return{
			isSel:false,
			isCal:true
		}
	},
 	computed:{
 		...mapState({
 			shopArr:state => state.cart.cartArr,
 			total:state => state.cart.total
 		})
 	},
 	created(){
 		this.calculation();
 		eventBus.$on("calOrDel",()=>{
 			this.isCal = ! this.isCal;
 		});
 	},
 	methods:{
 		...mapActions({
 			selOCom:"changeSelect",
 			smlSelOCom:"changeSmlSel",
 			calculate:"calculateAllMoney",
 			changeCount:"changeCount",
 			smlChangeCount:"smlChangeCount",
 			cartDelNum:"deleteNum",
 			cartAddNum:"addNum",
 			delShop:"popShop",
 			shopNumTotal:"totalShopNum"
 		}),
 		changeSelect(index){
 			this.selOCom(index);
 			var allChoose = this.changeCount(index);
 			if (allChoose) {
 				this.isSel = false;
 			}
 		},
 		changeSmlSelect(index,index1){
 			this.smlSelOCom([index,index1]);
 			var allChoose = this.smlChangeCount([index,index1]);
 			if (allChoose) {
 				this.isSel = false;
 			}
 		},
 		calculation(){
 			this.isSel = ! this.isSel;
 			this.calculate(this.isSel);
 		},
 		delNum(index,index1){
 			this.cartDelNum([index,index1]);
 		},
 		addNum(index,index1){
 			this.cartAddNum([index,index1]);
 		},
 		addToCol(){

 		},
 		moveShop(){
 			this.delShop();
 			this.shopNumTotal();
 		}
 	}
}
</script>

<style lang="less" scoped>
@import url("../../less/common.less");
	.cart-shop{
		height:1024px;
		background-color:#eee;
		margin-bottom:60px;
		.icon-common{
			margin-left:5px;
		    background-image: url(//wq.360buyimg.com/wxsq_trade/cart_vue/main/images/sprite.img_default_437_c4816605.png);
			background-position: -80px 0;
			background-size: 116px 110px;
			width:20px;
			height:20px;
		}
		.icon-select{
			margin-left:5px;
		    background-image: url(//wq.360buyimg.com/wxsq_trade/cart_vue/main/images/sprite.img_default_437_c4816605.png);
			background-position: -80px -40px;
			background-size: 116px 110px;
			width:20px;
			height:20px;
		}
		.cart-foor{
			width:100%;
			max-width:800px;
			position:fixed;
			bottom:56px;
			z-index:100;
			background-color:#fff;
			border-top:1px solid #eee;
			padding-top:5px;
			.flexRowCenter();
			justify-content:space-between;
			.choose{
				.flexColumnCenter();
				p{
					padding:0;
					margin:0;
					margin-left:5px;
					color:gray;
				}
			}
			.settlement{
				.flexRowCenter();
				p{
					margin:0;
					padding:0;
					margin-right:20px;
					font-size:20px;
					font-weight:250;
				}
				.mu-button{
					margin-right:5px;
					padding:0;
					border-radius:30px;
				}
			}
			.colOrMov{
				.flexRowCenter();
				p{
					margin:0;
					padding:0;
					margin-right:5px;
				}
				.collect{
					color:#FF5000;
					border-radius:15px;
					border:1px solid #FF5000;
					width:90px;
					height:32px;
					line-height:30px;
					text-align:center;
				}
				.move{
					color:#FC0A0A;
					border-radius:15px;
					border:1px solid #FC0A0A;
					width:90px;
					height:32px;
					line-height:30px;
					text-align:center;
				}
			}
		}
		.shop{
			margin-bottom:120px;
			.shop-detail{
				width:90%;
				margin:0 auto;
				background-color:#fff;
				border-radius:15px;
				margin-top:10px;
				z-index:2;
				.shop-title{
					.flexRowCenter();
					.mu-icon{
						margin:0 3px;
						color:gray;
					}
					p{
						font-size:18px;
						font-weight:600;
					}
				}
				.shop-box{
					.flexRowCenter();
					.icon-common{
						margin-left:10px;
						margin-right:5px;
					}
					.icon-select{
						margin-left:10px;
						margin-right:5px;
					}
					img{
						width:100px;
						height:100px;
					}
					.shop-des{
						margin:0 8px;
						width:61%;
						.flexColumnCenter();
						.title{
							font-size:14px;
							height:40px;
							line-height:20px;
							overflow:hidden;
							margin:0;
						}
						.des{
							width:100%;
							background-color:#f7f7f7;
							margin:5px 0;
						}
						.shop-num{
							width:100%;
							margin:0;
							.flexRowCenter();
							justify-content:space-between;	
							.price{
								color:@mallColor;
							}
							.addOrDel{
								.flexRowCenter();
							}
						}
					}
				}
			}
		}
	}
</style>
