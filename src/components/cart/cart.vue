<template>
  <div class="cart">
  	<mall-head></mall-head>
    <cart-shop></cart-shop>
  </div>
</template>

<script>
import Header from "./cart-content/cart-header.vue";
import Shop from "./cart-content/cart-shop.vue";
export default {
 	components:{
 		"mall-head":Header,
    "cart-shop":Shop
 	}
}
</script>

<style lang="less" scoped>
	.cart{
		height:100%;
		background-color:#eee;

	}
</style>
