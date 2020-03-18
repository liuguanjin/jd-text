<template>
  <div class="home-content">
  	<!-- 首页内容 -->
	<div class="content-item" v-for="(item,index) in homeContent" @click="enterDetail(item.imgSrc,item.title,item.price,item.addDes,item.shopName)">
		<img :src="item.imgSrc">
		<p class="title">{{item.title}}{{item.addDes}}</p>
		<p class="price">${{item.price}}</p>
	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			homeContent:[],
 			refreshing:false,
 			loading:false
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.getContent();
 	},
 	methods:{
 		getContent(){
 			// 通过axios获取数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/home-content-text.json").then(response=>{
 				this.homeContent = response.data;
 			})
 		},
 		enterDetail(src,title,price,des,shopName){
 			// 进入商品详情界面
 			this.$router.push({name:"detail",query:{src:src,title:title,price:price,des:des,shopName:shopName}});
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.home-content{
		background-color:#eee;
		.flexRowCenter();
		flex-wrap:wrap;
		margin-bottom:60px;
		.content-item{
			background-color:#fff;
			border-radius:15px;
			margin-top:10px;
			margin-left:@commonMargin;
			.flexColumnCenter();
			width:47%;
			img{
				width:100%;
				margin:0;
			}
			.title{
				font-size:@textSize;
				line-height:20px;
				height:40px;
				overflow:hidden;
				margin:5px;
			}
			.price{
				font-size:@bigTextSize;
				line-height:@bigTextSize;
				align-self:flex-start;
				color:@mallColor;
				margin:5px;
			}
		}
	}
</style>
