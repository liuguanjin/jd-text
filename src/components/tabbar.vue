<template>
	<div class="tabbar" v-if="isShowTabbar">
		<mu-container>
  			<mu-bottom-nav>
		    	<mu-bottom-nav-item title="首页" icon="home" to="/home"></mu-bottom-nav-item>
		    	<mu-bottom-nav-item title="分类" icon="classify" to="/classify"></mu-bottom-nav-item>
		    	<mu-bottom-nav-item title="购物车" icon="shopping_cart" to="/cart"></mu-bottom-nav-item>
		    	<mu-bottom-nav-item title="个人中心" icon="person_center" to="/mine"></mu-bottom-nav-item>
		  	</mu-bottom-nav>
		</mu-container>
	</div>
</template>
<script>
export default{
	data(){
		return{
			isShowTabbar:true
		}
	},
	watch:{
		$route(to,from){
			// var path = window.performance.navigation.type == 1?from.path:to.path;
			var path = to.path;
			if (path == "/home" ||
				path == "/classify" ||
				path == "/cart" ||
				path == "/mine"	||
				path == "/logsuc"
				){
				this.isShowTabbar = true;
			}else{
				this.isShowTabbar = false;
			}
		}
	}
}
</script>
<style lang="less" scoped>
	.tabbar{
		z-index:2;
		width:100%;
		max-width:800px;
		position:fixed;
		bottom:0;
		margin:0 auto;
		.container{
			padding:0;
			width:inherit;
			.mu-bottom-nav{
				margin:0;
				width:inherit;
				.mu-bottom-nav-shift-wrapper{
					width:inherit;
					.mu-bottom-item-active{
					    padding-top: 6px;
					    padding-bottom: 0px;
					    color: inherit;
					    .mu-bottom-item-wrapper{
					    	.mu-bottom-item-text{
					    		font-size:12px;
					    	}
					    }
					}
					.active{
					    padding-top: 6px;
					    padding-bottom: 5px;
					    color: #2196f3;
					}
				}
			}
		}
	}
</style>