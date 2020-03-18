<template>
  <div class="mine">
    <!-- 个人中心头部 -->
  	<div class="mine-title">
  		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
      <p>您需要登录才能继续访问</p>
    </div>
    <!-- 个人中心内容 -->
    <mine-login></mine-login>
  </div>
</template>

<script>
// 引入头部及内容
import Header from "../common/head.vue";
import Login from "./public/login.vue";
export default {
	methods:{
		back(){
      // 返回的实现
			this.$router.go(-1);
		}
	},
 	components:{
 		"mall-head":Header,
    "mine-login":Login
 	}
}
</script>

<style lang="less" scoped>
  @import url("../less/common.less");
  .mine-title{
    margin:0;
    background-color:#eee;
    .flexRowCenter();
    p{
      margin-left:10px;
      font-weight:bold;
      font-size:15px;
    }
  }
</style>
