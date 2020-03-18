<template>
  <div class="regses">
  		<p>注册成功正在跳转至<span class="regses-login" @click="goToLogin">登录</span>界面</p>
  </div>
</template>

<script>
export default {
 	methods:{
 		goToLogin(){
 			this.$router.push("/mine");
 		},
 		goToLoginDelay(){
 			var time = 3;
 			var that = this;
 			var timer = setInterval(function(){
 				time --;
 				if (time == 0) {
 					that.$router.push("/mine");
 					clearInterval(timer);
 				}
 			},1000)
 		}
 	},
 	created(){
 		this.goToLoginDelay();
 	}
}
</script>

<style lang="less" scoped>
	.regses-login{
		color:#f23030;
	}
</style>
