<template>
	<view class="qui-page">
		<view class="detail">
			<view class="top qui-fx-jsb">
			    <view class="info qui-fx-ac">
					<image :src="errorImg" alt="">
					<view class="qui-fx-ver">
					  <text class="name">{{ visitorName }}</text>
					  <text class="phone">{{ visitorPhone }}</text>
					  <text class="times">{{ causeName }}</text>
					</view>
				</view>
			    <view class="state">{{ state | approveState }}</view>
			</view>
			<view class="log qui-fx-jsb">
				<view class="qui-fx-ver">
					<view class="start qui-fx-ac">
						<text>起</text>
						<text>{{ comeLog.accessStartTime | gmtToDate }}</text>
					</view>
				</view>
				<view class="qui-fx-ver">
					<view class="end qui-fx-ac">
						<text>止</text>
						<text>{{ comeLog.accessEndTime | gmtToDate }}</text>
					</view>
				</view>
			</view>
			<view class="log qui-fx-jsb">
				<view class="start qui-fx-ac">
					<icon type="info" size="24" />
					<text style="margin-left: 10rpx;">随行人数：{{ comeLog.togetherNum }}</text>
				</view>
				<view class="end qui-fx-ac">
					<icon type="waiting" size="24" />
					<text style="margin-left: 10rpx;">来访时长：{{ comeLog.duration }}小时</text>
				</view>
			</view>
			<!-- <view class="log">
				<text>邀请函</text>
				<view class="qui-fx-ac">
					<icon type="email" size="24" />
					<view class="qui-fx-ver">
						<text>{{ visitorName }},您好！</text>
						<text>学校邀约人姓名邀请你于开始时间至结束时间来访进行来访事由，地址：手动填写。</text>
						<text>请准时到达，如有问题请联系邀约人姓名邀约人手机号。</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import { store, actions } from '../store/index.js';
export default {
	components: {},
	data() {
		return {
			errorImg: require('@s/img/person.png'),
			id: '',
			visitorName: '',
			visitorPhone: '',
			causeName: '',
			state: '',
			photo: '',
			comeLog: {
				accessStartTime: '',
				accessEndTime: '',
				togetherNum: '',
				duration: ''
			}
		};
	},
	onLoad(options) {
		this.id = options.id;
	},
	async mounted() {
		const res = await actions.getInviteDetail(this.id);
		if (!res.data) {
			return;
		}
		this.comeLog = res.data;
		this.photo = res.data.registPhoto;
		this.visitorName = res.data.visitorName;
		this.visitorPhone = res.data.mobile;
		this.causeName = res.data.causeName;
		this.state = res.data.state;
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.detail {
	padding: 0 20rpx;
	.top {
		width: 100%;
		height: 362rpx;
		background: url('../../../../static/img/bg.png') no-repeat;
		background-size: 100% 362rpx;
		margin: 20rpx 0 40rpx 0;
		color: #fff;
		.state {
			margin: 30rpx 60rpx 0 0;
			font-size: 28rpx;
		}
		.info {
			margin: 0 0 0 10%;
			height: 300rpx;
			image {
				width: 160rpx;
				height: 160rpx;
				margin-right: 38rpx;
				background: rgba(255, 255, 255, 0.6);
				padding: 6rpx;
				border-radius: 100%;
			}
			text {
				margin-bottom: 10rpx;
			}
			.name {
			}
			.phone {
			}
		}
	}
	.log {
		background: #fff;
		padding: 40rpx 20rpx;
		margin: 20rpx 0 40rpx 0;
		border: 1px solid #ddd;
		border-radius: 16rpx;
		box-shadow: 2rpx 2rpx 1rpx 1rpx #ddd;
		.start,
		.end {
			margin: 10rpx 0;
			text:first-child {
				border: 1rpx solid #0079ff;
				padding: 6rpx 12rpx;
				border-radius: 100%;
				margin-right: 20rpx;
			}
		}
	}
}
</style>
