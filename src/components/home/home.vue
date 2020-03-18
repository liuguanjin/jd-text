<template>
  <div class="home">
  	<mall-head>
  		<h1>首页</h1>
  	</mall-head>
  	<home-carousel></home-carousel>
  	<home-classify></home-classify>
  	<home-content></home-content>
  </div>
</template>

<script>
import Header from "../common/head.vue";
import Carousel from "./carousel.vue";
import Classify from "./home-classify.vue";
import Content from "./home-content.vue";
export default {
 	components:{
 		"mall-head":Header,
 		"home-carousel":Carousel,
 		"home-classify":Classify,
 		"home-content":Content
 	}
}
</script>

<style>

</style>
