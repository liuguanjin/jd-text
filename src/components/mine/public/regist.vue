<template>
  <div id="regist-main">
  	<!-- 注册界面头部 -->
  	<div class="regist-title">
  		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
    </div>
    <!-- 注册界面logo -->
  	<div class="logo">
  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
  	</div>
  	<!-- 账号注册框 -->
  	<div class="uname-box">
  		<p>账号:</p>
  		<input type="text" v-model="uname" class="uname" placeholder="请设置用户名" @blur="leaveUname">
  		<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
  	</div>
  	<!-- 密码注册框 -->
  	<div class="pwd-box">
  		<p>密码:</p>
  		<input type="password" v-model="upwd" class="upwd" placeholder="请设置登录密码" @blur="leaveUpwd">
  		<p :class="pwdshow?'pwdprompt-show':'pwdprompt-none'">{{upwdPrompt}}</p>
  	</div>
  	<!-- 确认密码框 -->
  	<div class="pwd-box">
  		<p>确认密码:</p>
  		<input type="password" v-model="reUpwd" class="upwd" placeholder="请确认密码" @blur="leaveReUpwd">
  		<p :class="rePwdshow?'pwdprompt-show':'pwdprompt-none'">{{reUpwdPrompt}}</p>
  	</div>
  	<!-- 验证码框 -->
  	<div class="verification">
  		<p>验证码:</p>
  		<input type="text" class="veri-input" v-model="veriCode" placeholder="请输入验证码">
  		<span class="ver-code" @click="generateVerify">{{verify}}</span>
  		<p :class="veriShow?'verify-show':'verify-none'">{{veriPrompt}}</p>
  	</div>
  	<!-- 注册按钮 -->
  	<div class="btn">
  		<button class="regist" @click="regist">注册</button>
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
 			veriPrompt:"",
 			reUpwd:"",
 			rePwdshow:false,
 			reUpwdPrompt:"",
 			isAllowRegist:false
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 	},
 	methods:{
 		leaveUname(){
 			//用户名注册限制
 			var uname = this.uname;
 			if (uname == "") {
 				this.uanmePrompt = "用户名不允许为空";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var Reg = /[^\u4E00-\u9FA5\w]/;
 			var result = Reg.test(uname);
 			if (result) {
 				this.uanmePrompt = "用户名仅支持中英文、数字和下划线，且不能为纯数字";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var numReg = /\D/;
 			var numRes = numReg.test(uname);
 			if ( ! numRes) {
 				this.uanmePrompt = "用户名仅支持中英文、数字和下划线，且不能为纯数字";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var length = 0;
 			for(var i = 0;i < uname.length;i ++){
 				var reg = /[\u4E00-\u9FA5]/;
 				var res = reg.test(uname[i]);
 				if (res) {
 					length += 2;
 				}else{
 					length += 1;
 				}
 				if (length > 14) {
 					break;
 				}
 			}
 			if (length > 14) {
 				this.uanmePrompt = "用户名不能超过7个汉字或14个字符";
 				this.show = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.uanmePrompt = "√";
 				this.show = true;
 				this.isAllowRegist = true;
 				return;
 			}
 		},
 		leaveUpwd(){
 			//密码注册限制
 			var upwd = this.upwd;
 			if (upwd == "") {
 				this.upwdPrompt = "密码不允许为空";
 				this.pwdshow = true;
 				this.isAllowRegist = false;
 				return;
 			}
 			var Reg = /^[a-zA-Z]\w{5,17}$/;
 			var result = Reg.test(upwd);
 			if (!result) {
 				this.upwdPrompt = "密码仅支持以字母开头，长度在6-18之间，只能包含字母、数字、下划线";
 				this.pwdshow = true;
 				this.isAllowRegist = false;
 				return;
 			}else{
 				this.upwdPrompt = "√";
 				this.pwdshow = true;
 				this.isAllowRegist = true;
 				return;
 			}
 		},
 		leaveReUpwd(){
 			//验证两次密码是否相同
 			if (this.reUpwd == "") {
 				this.rePwdshow = true;
 				this.reUpwdPrompt = "密码不允许为空";
 				this.isAllowRegist = false;
 			}else if (this.reUpwd != this.upwd){
 				this.rePwdshow = true;
 				this.reUpwdPrompt = "两次密码不一致";
 				this.isAllowRegist = false;
 			}else{
 				this.reUpwdPrompt = "√";
 				this.rePwdshow = true;
 				this.isAllowRegist = true;
 			}
 		},
 		regist(){
 			//账号密码符合限制后，验证码正确允许注册
 			this.leaveUname();
 			this.leaveUpwd();
 			this.leaveReUpwd();
 			var code = this.veriCode.toUpperCase();
 			var verify = this.verify.toUpperCase();
 			if(code != verify){
 				this.veriShow = true;
 				this.veriPrompt = "验证码错误";
 				this.isAllowRegist = false;
 				this.generateVerify();
 			}else{
 				this.veriShow = true;
 				this.veriPrompt = "√";
 				this.isAllowRegist = true;
 			}
 			if (this.isAllowRegist) {
 				let instance = axios.create({
	 				headers:{'content-type':'application/x-www-form-urlencoded'}
	 			});
	 			var that = this;
	 			instance.post("http://www.liuguanjin.top:3301/regist",qs.stringify({uname:that.uname,upwd:that.upwd})).then(result=>{
	 				var msg = result.data.msg;
	 				var isOk = result.data.isOk;
	 				if (!isOk) {
		 				that.uanmePrompt = msg;
		 				that.show = true;
	 				}else{
	 					that.$router.push({path:"/regses"});
	 				}
	 			})
 			}
 		},
 		generateVerify(){
 			//随机验证码的获取方法
 			var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 			var yzm = "";
 			for(var i = 0;i < 4;i ++ ){
 				var index = parseInt(Math.random()*str.length);
 				yzm += str.charAt(index);
 			}
 			this.verify = yzm;
 		},
 		back(){
 			//返回的实现
			this.$router.go(-1);
		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	#regist-main{
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
			height:100px;
			p{
				width:60px;
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
			height:100px;
			.flexRowCenter();
			p{
				width:60px;
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
				width:60px;
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
