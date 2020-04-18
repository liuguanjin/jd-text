<template>
  <div class="supermarket">
  	<div class="header">
  		<mu-icon class="back" value="keyboard_backspace" color="#9e9e9e" @click="back"></mu-icon>
  		<div class="title">京东超市</div>
  		<div class="more">···</div>
  	</div>
  	<div class="carousel">
	  	<mu-carousel>
		  <mu-carousel-item v-for="(item,index) in carousels">
		    <img :src="item.imgSrc">
		  </mu-carousel-item>
		</mu-carousel>
  	</div>
  	<div class="classify">
  		<div v-for="(item,index) in classifys" class="classify-item">
  			<img :src="item.imgSrc" alt="">
  			<span>{{item.title}}</span>
  		</div>
  	</div>
  	<div class="qianggou">
  		<div class="head">
  			<span>超市抢购</span>
  			<span>拼手速抢惊喜</span>
  		</div>
  		<div class="time">
  			<span :class="choose1?'active':'common'" @click="pm12">12:00</span>
  			<span :class="choose2?'active':'common'" @click="pm16">16:00</span>
  			<span :class="choose3?'active':'common'" @click="pm20">20:00</span>
  			<span :class="choose4?'active':'common'" @click="pm0">00:00</span>
  		</div>
  		<div class="qianggou-shop">
	  		<div class="qianggou-item" ref="move" @touchstart="start($event)" @touchend="end($event)" @touchmove="move($event)" :style="{left:left+'px'}"">
	  			<div class="item" v-for="(item,index) in arr12pm">
	  				<img :src="item.imgSrc" alt="">
	  				<p class="title">{{item.title}}</p>
	  				<p class="price-top">¥{{item.priceTop}}</p>
	  				<p class="price-bottom">¥{{item.priceBottom}}</p>
	  			</div>
	  		</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			carousels:[],
 			classifys:[],
 			choose1:true,
 			choose2:false,
 			choose3:false,
 			choose4:false,
 			arr12pm:[],
 			startX:0,
 			endX:0,
 			left:0,
 			moveFlag:false
 		}
 	},
 	created(){
 		this.getCarousels();
 		this.getClassify();
 		this.pm12();
 	},
 	methods:{
 		getCarousels(){
 			// 通过axios获取轮播图数据
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-carousel.json").then(response=>{
 				this.carousels = response.data;
 			})
 		},
 		getClassify(){
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-classify.json").then(response=>{
 				this.classifys = response.data;
 			})
 		},
 		pm12(){
 			this.left = 0;
 			this.choose1 = true;
 			this.choose2 = false;
 			this.choose3 = false;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm16(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = true;
 			this.choose3 = false;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou-16pm.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm20(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = false;
 			this.choose3 = true;
 			this.choose4 = false;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		pm0(){
 			this.left = 0;
 			this.choose1 = false;
 			this.choose2 = false;
 			this.choose3 = false;
 			this.choose4 = true;
 			axios.get("https://person-use.oss-cn-shenzhen.aliyuncs.com/json/supermarket-qianggou.json").then(response=>{
 				this.arr12pm = response.data;
 			})
 		},
 		start(e){
 			this.moveFlag = true;
 			this.startX = e.touches[0].clientX;
 			this.endX = 0
 		},
 		end(e){
 			this.moveFlag = false;
 		},
 		move(e){
 			if (this.moveFlag) {
 				var moveX = this.endX + (e.touches[0].clientX - this.startX)/10
 				this.left += moveX;
 			}
 			if (this.left>0) {
 				this.left = 0;
 			}else if (this.left<-917){
 				this.left = -917;
 			}
 		},
 		back(){
 			this.$router.go(-1);
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	*{margin:0;padding:0}
	.supermarket{
		background-color:#eee;
		.header{
			background-color:#fff;
			.flexRowCenter();
			justify-content:space-between;
			.mu-icon{
				margin-left:10px;
				height:44px;
				line-height:44px;
			}
			.title{
				height:44px;
				line-height:44px;
				margin:0 70px;
				text-align:center;
				font-size:16px;
				color:#333;
			}
			.more{
				font-size:16px;
				height:44px;
				line-height:44px;
				text-align:center;
				margin-right:10px;
			}
		}
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
		.classify{
			background-color:#fff;
			margin-top:10px;
			.flexRowCenter();
			justify-content:space-between;
			flex-wrap:wrap;
			.classify-item{
				.flexColumnCenter();
				width:20%;
				margin-bottom:10px;
				img{
					margin-bottom:3px;
					width:80%;
				}
				span{
					font-size:10px;
					text-align:center;
				}
			}
		}
		.qianggou{
			margin-top:10px;
			background-color:#fff;
			padding-left:15px;
			.head{
				span:nth-child(1){
					font-size:18px;
					font-weight:600;
				}
				span:nth-child(2){
					padding-left:5px;
					border-left:1px solid gray;
					font-size:14px;
					color:gray;
				}
			}
			.time{
				margin:10px 0; 
				span{
					background-color:#eee;
					border-radius:20px;
					padding:3px 20px;
				}
				.active{
					color:white;
					background-color:#FFA07F;
				}
			}
			.qianggou-shop{
				position:relative;
				width:100%;
				height:200px;
				overflow:hidden;
				.qianggou-item{
					position:absolute;
					top:0;
					width:100%;
					.flexRowCenter();
					transition: all 0.1s;
					.item{
						width:35%;
						img{
							width:100%;
						}
						.title{
							width:100%;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
						}
						.price-top{
							color:#ccc;
						}
					}
				}
			}
		}
	}
</style>
