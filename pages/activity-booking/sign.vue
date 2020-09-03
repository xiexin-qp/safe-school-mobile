<template>
	<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
		<view class="u-fx-ac u-bd-b item-list">
			<view class="tip">姓名：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.userName" placeholder="请输入姓名" /></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view class="tip">手机号：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.phone" placeholder="请输入手机号" /></view>
		</view>
		<view class="u-bd-b item-list">
		  <view class="tip">上传头像：</view>
		  <view class="u-fx-f1 u-mar-t">
				<video-upload
					class="u-fx-f1 u-padd-l20 u-padd-r10 u-padd-b20"
					isCheck
					:uploadUrl="uploadUrl"
					 types="image"
					:uploadCount="1"
					:upload_max="10"
					@success="success"
				></video-upload>
		  </view>
		</view>
		<view class="btn-mar">
			<u-button type="primary" @click="sign">提交</u-button>
		</view>
	</scroll-view>
</template>

<script>
import { store, actions } from './store/index.js'
import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
export default {
	data() {
		return {
			id: 0,
			schoolCode: '',
			formData: {
				userName: '',
				phone: '',
				base64Url: ''
			},
			uploadUrl: ''
		}
	},
	components: {
		anUploadImg
	},
	async mounted() {
		this.uploadUrl = ``;
		this.id = this.$tools.getQuery().get('id');
		this.schoolCode = this.$tools.getQuery().get('schoolCode');
	},
	methods: {
		success(e) {
			console.log(e);
			this.formData.base64Url = e
		},
		async sign () {
			for (let key in this.formData) {
				if (!this.formData[key]) {
					this.$tools.toast('请填写完整信息')
					return
				}
			}
			var reg = /^1[3456789]\d{9}$/;
			if (!reg.test(this.formData.phone)) {
				this.$tools.toast('请输入正确手机号')
				return
			}
			await actions.signInById({
				...this.formData,
				placeReserveId: this.id
			})
			this.$tools.toast('签到成功', 'success')
			this.$tools.goNext(() => {
				this.$tools.goBack()
			})
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: 100vh;
}
.item-list {
	padding: 25rpx 15rpx 25rpx 25rpx;
	.tip::before {
		position: absolute;
		z-index: 99;
		content: '*';
		top: 30rpx;
		color: red;
		font-weight: bold;
		left: 8rpx;
	}
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	text-align: right;
	color: $u-content-color;
}
.btn-mar {
	position: fixed;
	bottom: 0;
	width: calc(100% - 40rpx);
	margin: 40rpx 20rpx;
}
</style>
