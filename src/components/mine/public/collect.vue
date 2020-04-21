<template>
  <div class="collect">
  	<div class="header">
  		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
  		<p>收藏夹</p>
  	</div>
  	<div class="collect-content">
  		<div class="collect-good" v-for="(item,index) in collectArr" @click="toDetail(item.src,item.title,item.price,item.des,item.shopName)">
  			<img :src="item.src" alt="">
  			<div>
  				<p class="title">{{item.title}}</p>
  				<p class="price">¥{{item.price}}</p>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
	methods:{
		back(){
			this.$router.go(-1);
		},
		toDetail(src,title,price,des,shopName){
			this.$router.push({name:"detail",query:{src:src,title:title,price:price,des:des,shopName:shopName}});
		}
	},
	computed:{
		...mapState({
	 		collectArr:state => state.collect.collectArr
		})
	}
 
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.collect{
		.header{
			.flexRowCenter();
			background-color:#eee;
			justify-content:flex-start;
			height:30px;
			line-height:30px;
			p{
				margin:0 auto;
				font-size:15px;
			}
		}
		.collect-content{
			.collect-good{
				background-color:white;
				margin:10px auto;
				padding:10px;
				border-radius:10px;
				.flexRowCenter();
				img{
					width:45%;
					align-self:flex-start;
				}
				div{
					margin-left:10px;
					align-self:flex-start;
					.flexColumnCenter();
					p{
						margin:0;
						padding:0;
					}
					.title{
						height:40px;
						line-height:20px;
						overflow:hidden;
						text-overflow:ellipsis;
						width:100%;
					}
					.price{
						margin-top:30px;
						align-self:flex-start;
						color:@mallColor;
					}
				}
			}
		}
	}
</style>
