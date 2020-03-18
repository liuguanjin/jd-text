<template>
  <div class="cart-head"> 
  	<div class="cart-count">
  		<p class="cart-num">购物车({{totalNum}})</p>
  		<p class="cart-total">共{{totalNum}}件宝贝</p>
  	</div>
  	<div class="management">
  		<p class="addOrDel" @click="moveShop">管理</p>
  	</div>
  </div>
</template>

<script>
import eventBus from "../../eventbus/eventbus.js";
import {mapState,mapActions} from "vuex";
export default {
 	data(){
 		return {
 		}
 	},
 	computed:{
 		...mapState({
 			totalNum:state => state.cart.totalNum
 		}),
 	},
 	created(){
 		this.total();
 	},
 	methods:{
 		...mapActions({
 			shopNumTotal:"totalShopNum"
 		}),
 		total(){
 			this.shopNumTotal();
 		},
 		moveShop(){
 			eventBus.$emit("calOrDel");
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.cart-head{
		background-image:linear-gradient(to right,#FF7800 30%,#FF5800 100%);
		height:150px;
		.flexRowCenter();
		align-items:flex-start;
		justify-content:space-between;
		p{
			color:white;
			margin:10px;
		}
		.cart-count{
			.cart-num{
				margin-top:20px;
				font-size:18px;
				font-weight:bold;
			}
		}
		.management{
			.addOrDel{
				margin-top:20px;
			}
		}
	}
</style>
