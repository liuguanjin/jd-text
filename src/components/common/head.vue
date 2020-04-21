<template>
  	<!-- 复用头部模块 -->
	<div class="header">
  		<slot></slot>
  	</div>
</template>

<script>
export default {
 
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.header{
		margin:0 auto;
		max-width:800px;
		position:relative;
		h1{
			margin:0;
			height:@navHeight;
			line-height:@navHeight;
			background-color:@mallColor;
			.titleStyle(#fff,@titleSize,center);
		}
		.back{
			position:absolute;
			left:@commonMargin;
			top:(@navHeight - @iconSize)/2;
			font-size:@iconSize;
		}
	}
</style>