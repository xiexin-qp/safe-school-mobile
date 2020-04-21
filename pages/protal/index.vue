<template>
	<view class="qui-page login">
		<view>
			<image :src="logo" class="logo"></image>
		</view>
		<view class="qui-fx-ac input-box">
			<input type="number" v-model="phone" class="item-input"  placeholder="请输入手机号" />
			<view class="yzm" :class="{'act': total !== 5}" @click="getYzm">{{ tip }}</view>
		</view>
		<view class="qui-fx-ac input-box">
			<input type="text" v-model="code" class="item-input"  placeholder="请输入验证码" />
		</view>
		<view class="login-btn" @click="login">
			<text>登录</text>
		</view>
		<view @click="toReg" class="register">家长注册 ></view>
	</view>
</template>

<script>
import logo from './assets/img/logo.png'
import uniRequest from 'uni-request'
import { setStore } from './store/index.js'
import vConsole from 'vconsole'
export default {
	data() {
		return {
			phone: '',
			code: '',
			logo,
			total: 5,
			tip: '获取验证码'
		}
	},
  computed: {
  },
  components: {
  },
	mounted () {
		console.log('in')
		new vConsole()
		this.getOpenid()
		document.body.addEventListener('focusin', () => {
			this.isReset = false
		});
		document.body.addEventListener('focusout', () => {
			this.isReset = true
			setTimeout(() => {
				if (this.isReset) {
					window.scrollTo(0, 0)
				}
			}, 200);
		})
	},
	methods: {
		// 获取openid
		async getOpenid () {
			const url = window.location.href
			const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''))
			if (params.get('openid')) {
				this.setOpenid(params.get('openid'))
				return
			}
			const code = params.get('code')
			if (uni.getStorageSync('openid')) {
				this.setOpenid(uni.getStorageSync('openid'))
			} else {
				const res = await uniRequest.get('http://canpointtest.com/getOpenid', {
				  params: {
						code
					}
				})
				const openid = res.data.data.openid
				uni.setStorageSync('openid', openid)
				this.setOpenid(openid)
			}
		},
		// 存储openid
		setOpenid (openid) {
			setStore({
				key: 'openid',
				data: openid
			})
		},
		testPhone () {
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if (this.phone === '' || !reg.test(this.phone)) {
				this.$tools.toast('请输入正确手机号')
				return
			}
		},
		getYzm () {
			this.timer = setInterval(() => {
				if (this.total === 1) {
					this.tip = '获取验证码'
					this.total = 5
					clearInterval(this.timer)
					return
				}
				this.total--
				this.tip = `${this.total} s`
			}, 1000)
		},
		login () {
			this.$tools.navTo({
				title: '家长注册',
				url: './main'
			})
			return
			this.testPhone()
			if (this.code === '') {
				this.$tools.toast('请输入验证码')
				return
			}
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
		background-color: #fff;
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
			border-radius: 6rpx;
			background-color: $main-color;
			color:#fff;
			&.act {
				width: 100rpx;
				background-color: #ccc;
			}
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
			bottom: 80rpx;
			right: 100rpx;
			color: $main-color;
		}
	}
</style>
