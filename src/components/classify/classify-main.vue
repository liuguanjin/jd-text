<template>
	<!-- 分类页面的内容 -->
	<div class="classify-main" v-show="isShow">
		<!-- 左侧内容 -->
		<div class="left-content">
			<ul class="content">
				<li 
				v-for="(item,index) in list"
				:key="index"
				@click="lsitClick(index)"
				:class="index === active?'active':''"
				>
					{{item.bigList}}
				</li>
			</ul>
		</div>
		<!-- 右侧详情 -->
		<div class="detail-content" v-for="(item,index) in list" v-show="index === active" :key="index">
			 <div v-for="(item,index) in item.detail" class="content-classify"">
			 	<h4>{{item.list}}</h4>
			 	<ul class="content-detail">
			 		<li v-for="(item1,index1) in item.li" class="content-li"  @click="toClassifyDetail(item1.shopDetail)">
			 			<img :src="item1.imgSrc" alt="">
			 			<p>{{item1.text}}</p>
			 		</li>
			 	</ul>
			 </div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";
export default{
	data(){
		return{
			list:[],
			active:0
		}
	},
	created(){
		this.getClassifyContent();
	},
	methods:{
		...mapActions({
			enterClassiyDetail:"classifyDetailData"
		}),
		getClassifyContent(){
			// 通过axios获取分类页面的数据
			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/classify-content2.json").then(response=>{
 				this.list = response.data;
 			})
		},
		lsitClick(index){
			//将active值修改为左侧点击的具体index
			this.active = index;
		},
		toClassifyDetail(arr){
			this.enterClassiyDetail(arr);
			this.$router.push("/classify-detail");
		}
	},
	props:["isShow"]
}	
</script>

<style lang="less" scoped>
@import url("../less/common.less");
@import url("../less/reset.less");
.classify-main{
	width:100%;
	margin-top:@navHeight;
	margin-bottom:60px;
	display:flex;
	flex-direction:row;
	align-items:space-around;
	height:100%;
	.left-content{
		background-color:#eee;
		flex:2;
		.content{
			height:100%;
			li{
				height:40px;
				.titleStyle(#000,@textSize,center);
				line-height:40px;
			}
			.active{
				background-color:#fff;
				color:#e93b3d;
			}
		}
	}
	.detail-content{
		background-color:#eee;
		flex:6;
		.content-classify{
			h4{
				height:40px;
				line-height:40px;
				font-size:14px;
				font-weight:700;
			}
			.content-detail{
				margin-left:5%;
				.flexRowCenter();
				flex-wrap:wrap;
				li{
					margin-right:2%;
					width:30%;
					background-color:#fff;
					border-radius:8px;
					margin-bottom:5px;
					img{
						margin-top:5px;
						width:100%;
						height:70%;
						border-bottom:2px solid #f7f7f7;
					}
					p{
						width:100%;
						height:30%;
						font-size:12px;
						text-align:center;
					}
				}
			}
		}
	}
}
</style>