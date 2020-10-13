<template>
	<view class="u-page login u-bg-fff">
		<view><image src="/mobile-img/logo.png" class="auto-bg-img logo"></image></view>
		<view class="u-fx-ac login-tab" v-if="isPass">
			<view @click="changTab(0)" class="u-fx-f1 u-tx-c" :class="{ act: type === 0 }">短信登录</view>
			<view @click="changTab(1)" class="u-fx-f1 u-tx-c" :class="{ act: type === 1 }">密码登录</view>
		</view>
		<view v-if="type === 0" class="u-fx-ac input-box u-bd-b u-padd-b20">
			<input type="number" v-model="phone" class="item-input" placeholder="请输入手机号" />
			<view class="yzm" :class="{ act: total !== 60 }" @click="getYzm">{{ tip }}</view>
		</view>
		<view v-if="type === 1" class="u-fx-ac input-box"><input type="text" v-model="phone" class="item-input" placeholder="请输入手机号" /></view>
		<view v-if="type === 1" class="u-fx-ac input-box"><input type="password" v-model="code" class="item-input" placeholder="请输入密码" /></view>
		<view v-if="type === 0" class="u-fx-ac input-box u-bd-b u-padd-b20"><input type="text" v-model="code" class="item-input" placeholder="请输入验证码" /></view>
		<view class="btn-mar"><u-button type="primary" @click="login">登录</u-button></view>
		<view @click="toReg" class="register u-fx-ac u-fx-je">
			家长注册
			<view class="rit-icon"></view>
		</view>
	</view>
</template>

<script>
import { setStore, actions } from './store/index.js';
import uniRequest from 'uni-request';
import wxApi from '@u/wxApi'
import config from '@config';
export default {
	data() {
		return {
			isPass: false,
			type: 0, // 短信
			phone: '',
			code: '',
			total: 60,
			tip: '获取验证码'
		};
	},
	computed: {},
	components: {},
	mounted() {
		uni.setStorageSync('tabIndex', 0)
		if (process.env.NODE_ENV === 'development') {
			this.isPass  = true
		}
		this.getOpenid();
		wxApi.getConfig();
		this.$tools.inputScroll();
	},
	methods: {
		changTab(type) {
			this.type = type;
			this.code = '';
		},
		// 微信js-api授权
		// 获取openid
		async getOpenid() {
			const url = window.location.href;
			const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''));
			this.schoolCode = params.get('schoolCode') || '';
			if (this.schoolCode) {
				uni.setStorageSync('schoolCode', this.schoolCode);
			} else {
				uni.removeStorageSync('schoolCode');
			}
			// 本地测试使用
			if (!params.get('openid') && !params.get('code')) {
				this.$tools.toast('请在地址栏输入openid进行绑定');
				return;
			}
			if (params.get('openid') && !params.get('code')) {
				const openid = params.get('openid');
				this.getUserInfo(openid);
				this.setOpenid(openid);
				return;
			}
			const code = params.get('code');
			if (uni.getStorageSync('openid') && uni.getStorageSync('openid') !== 'undefined') {
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
						this.total = 60;
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
				setStore({
					key: 'dangerList',
					data:  []
				})
				this.$tools.redirectTo({
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
				this.$tools.redirectTo({
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

<style lang="scss" scoped>
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
		border-bottom: 1px ￥u-border-color solid;
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
		margin-top: 100rpx;
		text-align: right;
		padding-right: 120rpx;
		color: #999;
	}
	.btn-mar {
		margin: 80rpx;
	}
}
</style>
