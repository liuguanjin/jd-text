<template>
  <div class="home-classify">
  	<!-- 首页分类模块 -->
  	<div class="classify-item" v-for="(item,index) in homeClassify">
  		<img :src="item.imgSrc">
  		<p class="title">{{item.title}}</p>
  	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			homeClassify:[]
 		}
 	},
 	created(){
 		this.getClassify();
 	},
 	methods:{
 		getClassify(){
 			// 通过axios获取分类的数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/home-classify.json").then(response=>{
 				this.homeClassify = response.data;
 			})
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.home-classify{
		.flexRowCenter();
		flex-wrap:wrap;
		.classify-item{
			margin-top:@commonMargin;
			width:20%;
			.flexColumnCenter();
			img{
				width:43px;
				height:43px;
				flex:1;
			}
			p{
				.titleStyle(#000,12px,center);
				flex:1;
			}
		}
	}
</style>
