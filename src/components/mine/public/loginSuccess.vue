<template>
  	<div class="login-success">
  		<div class="logsuc-header">
  			<div class="head-top">
          <div class="head-img">
  	  			<img :src="avatar" alt="">
    				<p>{{nickname}}</p>
          </div>
	  			<div class="iconbox">
	  				<mu-icon value="perm_identity"></mu-icon>
            <mu-icon value="settings" @click="toSetting"></mu-icon>
	  			</div>
  			</div>
  			<div  class="head-bottom">
  				<div @click="toCollect">
  					<p>{{collectNum}}</p>
  					<p>收藏夹</p>
  				</div>
  				<div>
  					<p>{{followNum}}</p>
  					<p>关注店铺</p>
  				</div>
  				<div>
  					<p>{{footprintNum}}</p>
  					<p>足迹</p>
  				</div>
  				<div>
  					<p>{{couponNum}}</p>
  					<p>红包卡卷</p>
  				</div>
  			</div>
  		</div>
  		<div class="order">
  			<div class="myorder">
  				<p class="weight">我的订单</p>
  				<p class="gray">查看全部订单 > </p>
  			</div>
  			<div class="order-detail">
  				<div class="nopay">
  					<mu-icon value=":iconfont icon-daifukuan"></mu-icon>
  					<p>待付款</p>
  				</div>
  				<div class="nosend">
  					<mu-icon value=":iconfont icon-daifahuo"></mu-icon>
  					<p>待发货</p>
  				</div>
  				<div class="noaccept">
  					<mu-icon value=":iconfont icon-daishouhuo"></mu-icon>
  					<p>待收货</p>
  				</div>
  				<div class="noevaluate">
  					<mu-icon value=":iconfont icon-weibiaoti527"></mu-icon>
  					<p>评价</p>
  				</div>
  				<div class="refund">
  					<mu-icon value=":iconfont icon-shouhou"></mu-icon>
  					<p>退款/售后</p>
  				</div>
  			</div>
  		</div>
  		<div class="tool">
  			<div class="tool-text">
  				<p class="weight">必备工具</p>
  				<p class="gray">查看全部工具 > </p>
  			</div>
  			<div class="tool-detail">
  				<div class="cash">
					   <mu-icon value=":iconfont icon-fanli"></mu-icon>
					   <p>每日返现</p>
				  </div>
				  <div class="ticket">
					   <mu-icon value=":iconfont icon-qian1"></mu-icon>
					   <p>领劵中心</p>
				  </div>
				  <div class="change">
					   <mu-icon value=":iconfont icon--exchange"></mu-icon>
					   <p>闲置换钱</p>
				  </div>
				  <div class="service">
					   <mu-icon value=":iconfont icon-kefu"></mu-icon>
					   <p>客服小蜜</p>
				  </div>
				  <div class="huabei">
					   <mu-icon value=":iconfont icon-huabei"></mu-icon>
					   <p>花呗</p>
				  </div>
				  <div class="cainiao">
					   <mu-icon value=":iconfont icon-logo"></mu-icon>
					   <p>菜鸟驿站</p>
				  </div>
				  <div class="more">
					   <mu-icon value=":iconfont icon-gengduo"></mu-icon>
					   <p>更多</p>
				  </div>
  			</div>
  		</div>
  	</div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data(){
    return{
        avatar:"https://person-use.oss-cn-shenzhen.aliyuncs.com/images/mine-head/1.jpg",
        nickname:"请先设置昵称",
        followNum:0,
        footprintNum:0,
        couponNum:0
    }
  },
  computed:{
    ...mapState({
      collectNum:state => state.collect.collectNum
    })
  },
  created(){
    
  },
  methods:{
    toSetting(){
      this.$router.push("/setting");
    },
    toCollect(){
      this.$router.push("/collect");
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../less/common.less");
  .login-success{
      .weight{
          margin-left:10px;
          font-weight:bold;
      }
      .gray{
          color:gray;
      }
      height:1024px;
      background-color:#eee;
      .logsuc-header{
          height:180px;
          background-color:#FF5C00;
          margin-bottom:10px;
          .flexColumnCenter();
          .head-top{
              margin-top:10px;
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
              .head-img{
                  .flexRowCenter();
                  align-self:flex-start;
                  img{
                      width:50px;
                      height:50px;
                      border-radius:50%;
                      margin:0 10px;
                  }
              }
              .iconbox{
                   margin-top:-20px;
              }
          }
          .head-bottom{
              margin-top:20px;
              width:100%;
              .flexRowCenter();
              div{
                  width:25%;
                  .flexColumnCenter();
                  p{
                      margin:5px 0;
                      padding:0;
                  }
              }
          }
      }
      .order{
          width:95%;
          border-radius:15px;
          margin:0 auto;
          background-color:#fff;
          margin-top:-30px;
          margin-bottom:10px;
          .flexColumnCenter();
          .myorder{
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
              border-bottom:1px solid #eee;
          }
          .order-detail{
              width:100%;
              .flexRowCenter();
              margin-top:15px;
              div{
                  width:25%;
                  .flexColumnCenter();
                  .mu-icon{
                      font-size:30px;
                      color:#FF5C00;
                      font-weight:800;
                  }
              }
          }
      }
      .tool{
          width:95%;
          border-radius:15px;
          margin:0 auto;
          background-color:#fff;
          .flexColumnCenter();
          .tool-text{
              border-bottom:1px solid #eee;
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
          }
          .tool-detail{
              width:100%;
              .flexRowCenter();
              flex-wrap:wrap;
              div{
                  margin:20px 0;
                  width:25%;
                  .flexColumnCenter();
                  .mu-icon{
                    font-size:30px;
                    font-weight:800;
                  }
                  p{
                    margin:0;
                  }
              }
              .cash{
                  .mu-icon{
                    color:#FC2B26;
                  }
              }
              .ticket{
                 .mu-icon{
                      color:#FFA009;
                  }
              }
              .change{
                  .mu-icon{
                      color:#F61C24;
                  }
              }
              .service{
                  .mu-icon{
                      color:#FEB623;
                  }
              }
              .huabei{
                  .mu-icon{
                      color:#38ABFA;
                  }
              }
              .cainiao{
                  .mu-icon{
                      color:#039EFC;
                  }
              }
              .more{
                  .mu-icon{
                      color:gray;
                  }
              }
          }
      }
  }
</style>
