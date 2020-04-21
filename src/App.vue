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
//使用vuex保存登录状态
import {mapActions,mapState} from "vuex";
export default {
  components:{
    "tabbar":tabbar
  },
  created(){
    // console.log(typeof(localStorage.getItem("uname")));
    var emptyCartArr = [];
    // 判断localstorage里是否有用户信息
    if (localStorage.getItem("uname") === null) {
        localStorage.setItem("uname","");
    }else{
      this.replaceUname(localStorage.getItem("uname"));
    }
    if (localStorage.getItem("cartArr") === null) {
        localStorage.setItem("cartArr",JSON.stringify(emptyCartArr));
    }else{
      this.replaceCartArr(JSON.parse(localStorage.getItem("cartArr")));
    }
    var that = this ;
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("uname",that.uname);
      localStorage.setItem("cartArr",JSON.stringify(that.cartArr));
    })
  },
  methods:{
    ...mapActions({
      replaceUname:"replaceUname",
      replaceCartArr:"replaceCartArr"
    })
  },
  computed:{
    ...mapState({
      uname:state => state.cart.uname,
      cartArr:state => state.cart.cartArr
    })
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
