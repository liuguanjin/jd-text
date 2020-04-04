<template>
  	<div class="setting">
  		<div class="head">
			<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
      		<p>设置</p>
  		</div>
  		<div class="avatar">
  			<div>
	  			<img :src="avatar" alt="我的头像">
	  			<p>{{nickname}}</p>
  			</div>
			<p class="enter">></p>
  		</div>
  		<div class="address">
  			<p>我的收货地址</p>
			<p class="enter">></p>
  		</div>
  		<div class="user">
  			<p>账户与安全</p>
  			<p class="enter">></p>
  		</div>
  		<div class="settingarea">
  			<p>地区设置</p>
  			<p class="enter">></p>
  		</div>
  		<div class="sound">
  			<p>音效与通知</p>
  			<p class="enter">></p>
  		</div>
  		<div class="common">
  			<p>通用</p>
  			<p class="enter">></p>
  		</div>
  		<div class="problem">
  			<p>问题反馈</p>
  			<p class="enter">></p>
  		</div>
  		<div class="about">
  			<p>关于</p>
  			<p class="enter">></p>
  		</div>
  		<div class="showleave" @click="showleave">
  			<p>退出当前账户</p>
  		</div>
  		<div class="leave" v-if="show">
  			<div class="leave-text">
  				<p>退出当前账户</p>
  			</div>
  			<div class="leave-confim">
  				<p class="sure" @click="leave">确定</p>
  				<p class="cansel">取消</p>
  			</div>
  		</div>
  	</div>
</template>

<script>
export default {
 data(){
 	return{
 		avatar:"https://person-use.oss-cn-shenzhen.aliyuncs.com/images/mine-head/1.jpg",
 		nickname:"请先设置昵称",
 		show:false
 	}
 },
 methods:{
 	back(){
 		this.$router.go(-1);
 	},
 	showleave(){
 		this.show = true;
 	},
 	leave(){
 		localStorage.removeItem("uname");
 		this.$store.state.cart.uname = "";
 		this.$router.push("/mine");
 	}
 }
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.setting{
		height:1024px;
		background-color:#eee;
		div{
			background-color:#fff;
			.flexRowCenter();
			justify-content:space-between;
			margin-bottom:1px;
		}
		.avatar{
			img{
				width:66px;
				height:66px;
				border-radius:50%;
			}
		}
		.head{
			background-color:#eee;
			justify-content:flex-start;
			height:30px;
			line-height:30px;
			p{
				margin:0 auto;
				font-size:15px;
			}
		}
		.showleave{
			width:100%;
			position:fixed;
			bottom:0;
			background-color:#FF5C00;
			p{
				margin:10px auto;
				color:white;
			}
		}
		.user{
			margin-bottom:5px;
		}
		.common{
			margin-bottom:5px;
		}
		.leave{
			padding:10px 0;
			border-radius:10px;
			margin:10px auto;
			width:50%;
			.flexColumnCenter();
			.leave-text{
				color:#d1d1d1;
				width:100%;
				border-bottom:1px solid #eee;
				p{
					margin:0 auto;
				}
			}
			.leave-confim{
				width:100%;
				.flexRowCenter();
				justify-content:space-between;
				p{
					padding:5px 10px 0 10px;
					margin:0;
				}
				.sure{
					color:red;
				}
				.cansel{
					
				}
			}
		}
	}
</style>
