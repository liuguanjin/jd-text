<template>
  <div class="classify-detail">
  	<my-head>
  		<h1>分类详情</h1>
  		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
  	</my-head>
  	<div v-for="(item,index) in arr" class="shop-classify" @click="toDetail(item.imgSrc,item.title,item.price,item.addDes,item.shopName)">
  		<img :src="item.imgSrc" alt="">
  		<div class="shop-text">
  			<p class="shop-title">{{item.title}}</p>
  			<p class="shop-des">{{item.addDes}}</p>
  			<p class="shop-price">￥{{item.price}}</p>
  			<p class="shop-name">{{item.shopName}}</p>
  		</div>
  	</div>
  </div>
</template>

<script>
import myHead from "../common/head.vue";
import {mapState} from "vuex";
export default {
	data(){
		return {
		}
	},
 	created(){
	 	
 	},
 	computed:{
 		...mapState({
 			arr:state => state.cart.classifyData
 		})
 	},
 	components:{
 		"my-head":myHead
 	},
 	methods:{
 		back(){
			// 返回实现
			this.$router.go(-1);
		},
		toDetail(src,title,price,des,shopName){
			this.$router.push({name:"detail",query:{src:src,title:title,price:price,des:des,shopName:shopName}});
		}
 	}
}
</script>

<style lang="less" scoped>
@import url("../less/common.less");
	.classify-detail{
		background-color:#eee;
		.shop-classify{
			width:95%;
			margin:0 auto;
			margin-top:10px;
			background-color:#fff;
			padding:10px 0;
			border-radius:15px;
			.flexRowCenter();
			img{
				margin-left:5px;
				height:100px;
			}
			.shop-text{
				margin-left:5px;
				.flexColumnCenter();
				align-items:flex-start;
				p{
					margin:3px 0;
					padding:0;
				}
				.shop-title{
					height:30px;
					line-height:15px;
					overflow:hidden;
				}
				.shop-des{
					font-size:8px;
					background-color:#f7f7f7;
					color:gray;
				}
				.shop-price{
					color:#E93B75;
					font-size:18px;
				}
				.shop-name{
					color:gray;
					font-size:8px;
				}
			}
		}
	}
</style>
