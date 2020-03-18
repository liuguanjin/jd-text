<template>
  <div class="carousel">
  	<!-- 首页轮播图 -->
  	<mu-carousel>
	  <mu-carousel-item v-for="(item,index) in carousels">
	    <img :src="item.imgSrc">
	  </mu-carousel-item>
	</mu-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			carousels:[]
 		}
 	},
 	created(){
 		this.getCarousels();
 	},
 	methods:{
 		getCarousels(){
 			// 通过axios获取轮播图数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/img-src.json").then(response=>{
 				this.carousels = response.data;
 			})
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.carousel{
		width:100%;
		.mu-carousel{
			height:200px;
		}
		img{
			width:100%;
			height:100%;
		}
	}
</style>
