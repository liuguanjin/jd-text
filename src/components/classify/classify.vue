<template>
  <div class="classify">
  	<classify-head :show="isShowContent"></classify-head>
  	<classify-content :isShow="isShow"></classify-content>
  </div>
</template>

<script>
import classifyHead from "./classift-head.vue";
import classifyContent from "./classify-main.vue";
export default {
	data(){
		return{
			isShow:true
		}
	},
	methods:{
		isShowContent(){
			this.isShow = !this.isShow;
		}
	},
 	components:{
 		"classify-head":classifyHead,
 		"classify-content":classifyContent
 	}
}
</script>

<style>

</style>
