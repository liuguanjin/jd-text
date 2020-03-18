<template>
	<!-- 分类页面的头部模块 -->
	<div class="classify-head">
		<div class="head-box">
			<!-- 返回图标 -->
			<div class="back-box" @click="back">
				<mu-icon class="back" value="keyboard_backspace" color="#9e9e9e"></mu-icon>
			</div>
			<!-- 搜索框 -->
			<div class="search-box">
				<div class="box">
					<mu-icon class="search-icon" value="search" color="#9e9e9e"></mu-icon>
					<input type="text" class="search" @focus="focus" @blur="blur" placeholder="华为手机">
				</div>
			</div>
			<!-- 搜索按钮 -->
			<div class="search-text" v-show="isFcous">
				<mu-button color="error">搜索</mu-button>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			isFcous:false
		}
	},
	methods:{
		back(){
			// 返回的实现
			this.$router.go(-1);
		},
		focus(){
			// 获取焦点隐藏分类内容实现
			this.isFcous = true;
			this.show();
		},
		blur(){
			// 失去焦点显示分类内容实现
			this.isFcous = false;
			this.show();
		}
	},
	props:["show"]
}	
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.classify-head{
		position:fixed;
		top:0;
		width:100%;
		max-width:800px;
		z-index:100;
		height:50px;
		background-color:#fff;
		.head-box{
			position:relative;
			width:100%;
			.back-box{
				width:10%;
				position:absolute;
				top:(@navHeight - @iconSize)/2;
				left:@commonMargin;
				.back{
					font-size:@searchHeight;
				}
			}
			.search-box{
				width:60%;
				position:absolute;
				top:(@navHeight - @iconSize)/2;
				left:@commonMargin+@iconSize*2;
				.box{
					position:relative;
				}
				.search-icon{
					position:absolute;
					top:(@navHeight - @iconSize)/2-8px;
					left:@commonMargin;
				}
				.search{
					position:absolute;
					top:0;
					left:0;
					z-index:-1;
            		width: 100%;
           			height: @searchHeight;
            		line-height: 24px;
            		border: none;
            		padding: 0 10px;
            		background-color: #f2f2f2;
            		outline: none;
            		box-shadow: inset 0 0 0px #999;
            		border-radius:15px;
            		padding-left:30px;
				}
			}
			.search-text{
				width:15%;
				position:absolute;
				top:(@navHeight - @iconSize)/2;
				left:73%;
				.mu-button{
					min-width:60px;
					width:100%;
					height:@searchHeight;
					font-size:@textSize;
					line-height:@textSize;
				}
			}
		}
	}
</style>