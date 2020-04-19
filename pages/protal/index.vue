<template>
	<view class="qui-page login">
		<view>
			<image :src="logo" class="logo"></image>
		</view>
		<view class="qui-fx-ac input-box">
			<input type="number" class="item-input"  placeholder="请输入手机号" />
			<view class="yzm">获取验证码</view>
		</view>
		<view class="qui-fx-ac input-box">
			<input type="number" class="item-input"  placeholder="请输入验证码" />
		</view>
		<view class="login-btn" @click="login">
			<text>登录</text>
		</view>
		<view @click="toReg" class="register">家长注册 ></view>
	</view>
</template>

<script>
import logo from './assets/img/logo.png'
export default {
	data() {
		return {
			logo
		}
	},
  computed: {
  },
  components: {
  },
	methods: {
		// 登录
		login () {
			this.$tools.navTo({
				url: './main'
			})
		},
		toReg () {
			this.$tools.navTo({
				title: '家长注册',
				url: './register'
			})
		}
  }
}
</script>

<style lang="scss">
	.login {
		padding-top: 160rpx;
		.logo {
			margin: 0 auto 140rpx auto;
			width: 428rpx;
			height: 89rpx;
			display: block;
		}
		.input-box {
			width: 80%;
			margin: 80rpx auto;
			border-bottom: 1px #EEEEEE solid;
		}
		.item-input {
			width: 100%;
			padding-left: 10rpx;
			color:#333;
			margin: 0 auto;
			height: 80rpx;
		}
		.yzm {
			margin-left: 20rpx;
			width: 260rpx;
			text-align: center;
			line-height: 60rpx;
			height: 60rpx;
			border-radius: 4rpx;
			background-color: $main-color;
			color:#fff;
		}
		.login-btn {
			width: 80%;
			height: 80rpx;
			background-color: $main-color;
			color: #fff;
			text-align: center;
			line-height: 80rpx;
			margin: 60rpx auto;
			border-radius: $radius;
			letter-spacing: 4rpx;
		}
		.register {
			position: fixed;
			z-index: 99;
			width: 100%;
			text-align: right;
			padding-right: 80rpx;
			bottom: 80rpx;
			color: $main-color
		}
	}
</style>
