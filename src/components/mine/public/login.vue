<template>
  <div id="mine-login">
  	<!-- 登录界面logo -->
  	<div class="logo">
  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
  	</div>
  	<!-- 账号注册框 -->
  	<div class="uname-box">
  		<p>账号:</p>
  		<input type="text" v-model="uname" class="uname" placeholder="请输入您的账号">
  		<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
  	</div>
  	<!-- 密码注册框 -->
  	<div class="pwd-box">
  		<p>密码:</p>
  		<input type="password" v-model="upwd" class="upwd" placeholder="请输入您的密码">
  		<p :class="pwdshow?'pwdprompt-show':'pwdprompt-none'">{{upwdPrompt}}</p>
  	</div>
  	<!-- 验证码框 -->
  	<div class="verification">
  		<p>验证码:</p>
  		<input type="text" class="veri-input" v-model="veriCode" placeholder="请输入验证码">
  		<span class="ver-code" @click="generateVerify">{{verify}}</span>
  		<p :class="veriShow?'verify-show':'verify-none'">{{veriPrompt}}</p>
  	</div>
  	<!-- 登录注册按钮 -->
  	<div class="btn">
  		<button class="login" @click="login">登录</button>
  		<button class="regist" @click="regist">免费注册</button>
  	</div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
 	data(){
 		return {
 			uname:"",
 			upwd:"",
 			uanmePrompt:"",
 			show:false,
 			upwdPrompt:"",
 			pwdshow:false,
 			verify:"",
 			veriCode:"",
 			veriShow:false,
 			veriPrompt:""
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 	},
 	methods:{
 		login(){
 			//登录的判断
 			var code = this.veriCode.toUpperCase();
 			var verify = this.verify.toUpperCase();
 			if (this.uname == "") {
 				this.uanmePrompt = "请输入用户名";
				this.show = true;
 			}else if(this.upwd == ""){
 				this.show = false;
 				this.pwdshow = true;
 				this.upwdPrompt = "密码不能为空";
 			}else if(code != verify){
 				this.veriShow = true;
 				this.veriPrompt = "验证码错误";
 				this.pwdshow = false;
 				this.show = false;
 			}else{
 				this.veriShow = false;
	 			let instance = axios.create({
	 				headers:{'content-type':'application/x-www-form-urlencoded'}
	 			});
	 			var that = this;
	 			instance.post("http://localhost:3301/login",qs.stringify({uname:that.uname,upwd:that.upwd})).then(result=>{
	 				var msg = result.data.msg;
	 				var showPwdPrompt = result.data.showPwdPrompt;
	 				var unameUndefine = result.data.unameUndefine;
	 				var isAllowLogin = result.data.isAllowLogin;
	 				if (showPwdPrompt) {
	 					that.upwdPrompt = msg;
	 					that.pwdshow = true;
	 				}else{
	 					that.pwdshow = false;
	 				}
	 				if (unameUndefine) {
	 					that.uanmePrompt = msg;
	 					that.show = true;
	 				}else{
	 					that.show = false;
	 				}
	 				if (isAllowLogin) {
	 					that.$router.push("/logsuc");
	 					that.$store.state.cart.isAllowLogin = true;
	 				}
	 			})
 			}
 		},
 		regist(){
 			//注册按钮点击跳转到注册界面
 			this.$router.push({path:"/regist"});
 		},
 		generateVerify(){
 			//随机验证码的生成
 			var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 			var yzm = "";
 			for(var i = 0;i < 4;i ++ ){
 				var index = parseInt(Math.random()*str.length);
 				yzm += str.charAt(index);
 			}
 			this.verify = yzm;
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	#mine-login{
		width:100%;
		.logo{
			width:100%;
			.flexRowCenter();
			justify-content:center;
			img{
				width:100px;
				height:100px;
				border-radius:50%;
			}
		}
		.uname-box{
			margin:50px auto;
			p{
				width:50px;
				margin:0 5px; 
				text-align:center;
			}
			width:100%;
			.flexRowCenter();
			
			.prompt-show{
				color:@mallColor;
				display:block;
				width:100px;
			}
			.prompt-none{
				display:none;
				width:100px;
			}
			input{
				width:150px;
			}
		}
		.pwd-box{
			margin:50px 0;
			width:100%;
			.flexRowCenter();
			p{
				width:50px;
				margin:0 5px; 
				text-align:center;
			}
			.pwdprompt-show{
				color:@mallColor;
				display:block;
				width:100px;
			}	
			.pwdprompt-none{
				display:none;
				width:100px;
			}
			input{
				width:150px;
			}
		}
		.verification{
			margin:50px 0;
			.flexRowCenter();
			p{
				width:50px;
				margin:0;
				margin-right:10px;
				text-align:center;
			}
			.veri-input{
				width:100px;
				margin-right:10px;
			}
			.ver-code{
				display:inline-block;
				width:60px;
				height:30px;
				background-color:#ccc;
				text-align:center;
				line-height:30px;
			}
			.verify-show{
				color:@mallColor;
				display:block;
				width:100px;
			}
			.verify-none{
				display:none;
				width:100px;
			}
		}
		.btn{
			.flexRowCenter();
			justify-content:space-around;
			.login{
				width:49%;
				height:40px;
				border:0;
				border-radius:.6rem;
				background-color:#FF8600
			}
			.regist{
				width:49%;
				height:40px;
				border:0;
				border-radius:.6rem;
				background-color:#FF8600
			}
		}
	}
</style>
