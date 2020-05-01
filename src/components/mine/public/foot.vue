<template>
  <div class="footprint">
  	<div class="head">
		<mu-icon class="back" value="keyboard_backspace" @click="back"></mu-icon>
		<p>足迹</p>
	</div>
  	<mu-col span="12" lg="4" sm="6">
      <mu-date-input v-model="value3" :max-date="value1" label="选择日期" label-float full-width no-display></mu-date-input>
    </mu-col>
    <div class="footprint-content">
    	<div class="content-detail" v-for="(item,index) in footArr">
    		<p class="date">{{item.date}}</p>
    		<div class="detail">
	    		<div class="goods" v-for="(item1,index1) in item.detail" @click="toDetail(item1.src,item1.title,item1.price,item1.des,item1.shopName)">
	    			<img :src="item1.src" alt="">
	    			<p class="price">¥{{item1.price}}</p>
	    		</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
	data () {
	    return {
	      value3: undefined,
	      value1: new Date()
	    }
	},
	computed:{
		...mapState({
			footArr:state => state.footprint.foorprintArr
		})
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getDate(){
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth()+1;
			m = m < 10 ? "0" + m : m;
			let d = date.getDate();
			d = d < 10 ? "0" + d : d;
			this.value3 = y + "-" + m + "-" + d; 
		},
		toDetail(src,title,price,des,shopName){
			this.$router.push({name:"detail",query:{src:src,title:title,price:price,des:des,shopName:shopName}});
		}
	},
	created(){
		this.getDate();
	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.footprint{
		.head{
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
		.footprint-content{
			.flexRowCenter();
			flex-wrap:wrap;
			.content-detail{
				.date{
					margin-left:5px;
				}
				.detail{
					.flexRowCenter();
					flex-wrap:wrap;
					.goods{
						margin:0 5px;
						width:30%;
						img{
							width:100%;
						}
						.price{
							padding:0;
							margin:0;
							margin-top:5px;
							color:@mallColor;
						}
					}
				}
			}
		}
	}
</style>