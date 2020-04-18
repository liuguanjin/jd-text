<template>
  <div class="home-classify">
  	<!-- 首页分类模块 -->
  	<div class="classify-item" v-for="(item,index) in homeClassify" @click="enterDetail(item.title)">
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
 		},
 		enterDetail(title){
 			if (title == "京东超市") {
 				this.$router.push("/supermarket");
 			}else if(title == "数码电器"){
 				this.$router.push("/digit");
 			}else if(title == "京东服饰"){
 				this.$router.push("/clothes");
 			}else if(title == "京东生鲜"){
 				this.$router.push("/fresh");
 			}else if(title == "京东到家"){
 				this.$router.push("/daojia");
 			}else if(title == "充值缴费"){
 				this.$router.push("/recharge");
 			}else if(title == "9.9元拼"){
 				this.$router.push("/jingxi");
 			}else if(title == "领劵"){
 				this.$router.push("/lingquan");
 			}else if(title == "赚钱"){
 				this.$router.push("/zhuangqian");
 			}else if(title == "PLUS会员"){
 				this.$router.push("/vip");
 			}
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
