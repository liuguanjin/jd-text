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
import axios from "axios";
import qs from "qs";
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
    var that = this ;
    if (localStorage.getItem("uname") === null) {
        localStorage.setItem("uname","");
    }else{
      this.replaceUname(localStorage.getItem("uname"));
    }
    if (localStorage.getItem("cartArr") === null) {
        localStorage.setItem("cartArr",JSON.stringify(emptyCartArr));
    }
    if(this.uname != ""){
        let instance = axios.create({
          headers:{'content-type':'application/x-www-form-urlencoded'}
        });
        instance.post("http://localhost:3301/cart",qs.stringify({uname:that.uname})).then(result=>{
          for(var i = 0;i < result.data.length;i ++ ){
            result.data[i].detail[0] = JSON.parse(result.data[i].detail[0]);
          }
          for(var i = 0;i < result.data.length;i ++ ){
            var shopName = result.data[i].shopName;
            for(var j = i+1;j < result.data.length;j ++ ){
              if (shopName == result.data[j].shopName) {
                result.data[i].detail.push(result.data[j].detail[0]);
                result.data.splice(j,1);
              }
            }
          }
          that.replaceCartArr(result.data);
        })
        instance.post("http://localhost:3301/footprint",qs.stringify({uname:that.uname})).then(result=>{
          for(var i = 0;i < result.data.length;i ++ ){
            for(var j =0;j < result.data[i].detail.length;j ++ ){
              result.data[i].detail[j] = JSON.parse(result.data[i].detail[j]);
            }
          }
          that.replaceFootprintArr(result.data);
        })
        instance.post("http://localhost:3301/collect",qs.stringify({uname:that.uname})).then(result=>{
          that.replaceCollectArr(result.data);
          that.replaceCollectNum(result.data.length);
        })
    }else{
      this.replaceCartArr(JSON.parse(localStorage.getItem("cartArr")));
    }
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("uname",that.uname);
      localStorage.setItem("cartArr",JSON.stringify(that.cartArr));
      if (that.uname != "") {
        let instance = axios.create({
          headers:{'content-type':'application/x-www-form-urlencoded'}
        });
        var arr = that.cartArr;
        for(var i = 0;i < arr.length;i ++ ){
          var detail = arr[i].detail;
          for(var j = 0;j < detail.length;j ++ ){
            detail[j] = JSON.stringify(detail[j]);
            arr[i].detail[j] = detail[j] ;
          }
        }
        var footprintArr = that.footprintArr;
        for(var i = 0;i < footprintArr.length;i ++ ){
          var footprintDetail = footprintArr[i].detail;
          for(var j = 0;j < footprintDetail.length;j ++ ){
            footprintDetail[j] = JSON.stringify(footprintDetail[j]);
            footprintArr[i].footprintDetail[j] = footprintDetail[j] ;
          }
        }
        instance.post("http://localhost:3301/addcart",qs.stringify({cartArr:arr,uname:that.uname})).then(result=>{
          console.log(result.data);
        })
        instance.post("http://localhost:3301/addcollect",qs.stringify({collectArr:that.collectArr,uname:that.uname})).then(result=>{
          console.log(result.data);
        })
        instance.post("http://localhost:3301/addfootprint",qs.stringify({footprintArr:footprintArr,uname:that.uname})).then(result=>{
          console.log(result.data);
        })
      }
    })
  },
  methods:{
    ...mapActions({
      replaceUname:"replaceUname",
      replaceCartArr:"replaceCartArr",
      replaceCollectArr:"replaceCollectArr",
      replaceCollectNum:"replaceCollectNum",
      replaceFootprintArr:"replaceFootprintArr"
    })
  },
  computed:{
    ...mapState({
      uname:state => state.cart.uname,
      cartArr:state => state.cart.cartArr,
      collectArr:state => state.collect.collectArr,
      footprintArr:state => state.footprint.footprintArr
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
