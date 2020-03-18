<template>
  <div id="app">
    <!-- 返回之后界面停留在返回之前的位置 keepalive -->
  	<keep-alive >
    	<router-view v-if="$route.meta.keepAlive"></router-view>
  	</keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 底部标签栏 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
// 引入tabbar
import tabbar from "./components/tabbar.vue";
export default {
  components:{
    "tabbar":tabbar
  }
}
</script>

<style lang="less" scoped>
	@import url("./components/less/reset.less");
  #app{
    max-width:800px;
    margin:0 auto;
  }
</style>
