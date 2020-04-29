<template>
	<view class="qui-page login u-bg-fff">
		<view><image src="/mobile-img/logo.png" class="auto-bg-img logo"></image></view>
		<view class="qui-fx-ac login-tab">
			<view @click="changTab(1)" class="qui-fx-f1 qui-tx-c" :class="{ act: type === 1 }">密码登录</view>
			<view @click="changTab(0)" class="qui-fx-f1 qui-tx-c" :class="{ act: type === 0 }">短信登录</view>
		</view>
		<view v-if="type === 0" class="qui-fx-ac input-box">
			<input type="number" v-model="phone" class="item-input" placeholder="请输入手机号" />
			<view class="yzm" :class="{ act: total !== 60 }" @click="getYzm">{{ tip }}</view>
		</view>
		<view v-if="type === 1" class="qui-fx-ac input-box"><input type="text" v-model="phone" class="item-input" placeholder="请输入手机号" /></view>
		<view v-if="type === 1" class="qui-fx-ac input-box"><input type="password" v-model="code" class="item-input" placeholder="请输入密码" /></view>
		<view v-if="type === 0" class="qui-fx-ac input-box"><input type="text" v-model="code" class="item-input" placeholder="请输入验证码" /></view>
		<view class="btn-mar">
			<u-button type="primary" @click="login">登录</u-button>
		</view>
		<view @click="toReg" class="register">家长注册 ></view>
	</view>
</template>

<script>
import { setStore, actions } from './store/index.js';
export default {
	data() {
		return {
			type: 1, // 密码
			phone: '',
			code: '',
			total: 60,
			tip: '获取验证码'
		};
	},
	computed: {},
	components: {},
	mounted() {
		this.getOpenid();
		// 处理界面错位问题
		document.body.addEventListener('focusin', () => {
			this.isReset = false;
		});
		document.body.addEventListener('focusout', () => {
			this.isReset = true;
			setTimeout(() => {
				if (this.isReset) {
					window.scrollTo(0, 0);
				}
			}, 200);
		});
	},
	methods: {
		changTab(type) {
			this.type = type;
			this.code = '';
		},
		// 获取openid
		async getOpenid() {
			const url = window.location.href;
			const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''));
			this.schoolCode = params.get('schoolCode') || '';
			// 本地测试使用
			if (!params.get('openid') && !params.get('code')) {
				this.$tools.toast('请在地址栏输入openid进行绑定');
				return;
			}
			if (params.get('openid') || !params.get('code')) {
				const openid = params.get('openid');
				this.getUserInfo(openid);
				this.setOpenid(openid);
				return;
			}
			const code = params.get('code');
			if (uni.getStorageSync('openid')) {
				const openid = uni.getStorageSync('openid');
				this.setOpenid(openid);
				this.getUserInfo(openid);
			} else {
				const res = await uniRequest.get('/getOpenid', {
					params: {
						code
					}
				});
				const openid = res.data.data.openid;
				uni.setStorageSync('openid', openid);
				this.setOpenid(openid);
			}
		},
		// 存储openid
		setOpenid(openid) {
			this.openid = openid;
			setStore({
				key: 'openid',
				data: openid
			});
		},
		// 验证手机号
		testPhone() {
			var reg = /^1[3456789]\d{9}$/;
			if (this.phone === '' || !reg.test(this.phone)) {
				this.$tools.toast('请输入正确手机号');
				return false;
			}
			return true;
		},
		// 获取验证码
		async getYzm() {
			if (!this.testPhone()) return;
			try {
				const res = await actions.getCode(this.phone);
				this.$tools.toast('验证码发送成功');
				this.timer = setInterval(() => {
					if (this.total === 1) {
						this.tip = '获取验证码';
						this.total = 5;
						clearInterval(this.timer);
						return;
					}
					this.total--;
					this.tip = `${this.total} s`;
				}, 1000);
			} catch (err) {}
		},
		// 通过openid获取用户信息
		async getUserInfo(openid) {
			const res = await actions.getUserInfo(openid);
			if (res.data) {
				setStore({
					key: 'userInfo',
					data: res.data
				});
				this.$tools.navTo({
					url: './main'
				});
			}
		},
		// 登录
		async login() {
			if (!this.testPhone()) return;
			if (this.code === '') {
				this.$tools.toast('请输入验证码');
				return;
			}
			const res = await actions.login({
				mobile: this.phone,
				openid: this.openid,
				passCode: this.code,
				schoolCode: this.schoolCode,
				type: this.type
			});
			clearInterval(this.timer);
			setStore({
				key: 'userInfo',
				data: res.data
			});
			this.$tools.toast('登录成功');
			this.$tools.goNext(() => {
				this.$tools.navTo({
					url: './main'
				});
			});
		},
		toReg() {
			this.$tools.navTo({
				title: '家长注册',
				url: './register'
			});
		}
	}
};
</script>

<style lang="scss">
.login {
	padding-top: 160rpx;
	.logo {
		margin: 0 auto 100rpx auto;
		width: 428rpx;
		height: 89rpx;
		display: block;
	}
	.login-tab {
		width: 60%;
		height: 68rpx;
		line-height: 68rpx;
		border-radius: 6rpx;
		margin: 0 auto;
		overflow: hidden;
		letter-spacing: 2rpx;
		background-color: $u-bg-color;
		color: $u-content-color;
		.act {
			height: 68rpx;
			background-color: $u-type-primary-dark;
			color: #fff;
		}
	}
	.input-box {
		width: 80%;
		margin: 60rpx auto 60rpx;
		border-bottom: 1px $u-border-color-four solid;
	}
	.item-input {
		width: 100%;
		padding-left: 10rpx;
		color: #333;
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
		background-color: $u-type-info;
		color: #fff;
		&.act {
			width: 120rpx;
			background-color: $u-type-info-disabled;
		}
	}
	.register {
		position: fixed;
		z-index: 99;
		bottom: 80rpx;
		right: 100rpx;
		color: $u-type-primary-dark;
	}
	.btn-mar {
		margin: 80rpx 100rpx;
	}
}
</style>
