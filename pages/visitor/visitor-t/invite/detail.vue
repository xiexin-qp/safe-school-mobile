<template>
	<view class="qui-page">
		<view class="detail">
			<view class="top qui-fx-jsb">
			    <view class="info qui-fx-ac">
							<image :src="photo ? photo :errorImg" alt="">
							<view class="qui-fx-ver">
								<text class="name">{{ visitorName }}</text>
								<text class="phone">{{ visitorPhone }}</text>
								<text class="times">{{ causeName }}</text>
							</view>
					</view>
			    <view class="state qui-fx">
						<view class="trigon">
						</view>
						<text :class="state === '2' ? 'refuse' : state === '1' ? 'agree' : state === '0' ? 'wait' : 'cancel'">{{ state | approveState }}</text>
					</view>
			</view>
			<view class="log qui-fx-jsb">
				<view class="qui-fx-ver">
					<view class="start qui-fx-ac">
						<text>到</text>
						<text>{{ comeLog.accessStartTime | gmtToDate }}</text>
					</view>
				</view>
				<view class="qui-fx-ver">
					<view class="end qui-fx-ac">
						<icon type="info" size="24" />
						<text style="margin-left: 10rpx;">随行人数：{{ comeLog.togetherNum || 0 }}</text>
					</view>
				</view>
			</view>
			<view v-if="state == 2" class="log qui-fx-jsb">
				<view class="start qui-fx-ac">
					<icon type="cancel" size="24" />
					<text style="margin-left: 10rpx;">拒绝原因：{{ comeLog.reason }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { store, actions } from '../store/index.js';
export default {
	components: {},
	data() {
		return {
			errorImg: '/mobile-img/person.png',
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
				duration: '',
				reason: ''
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
		this.photo = res.data.visitorUrl;
		this.visitorName = res.data.visitorName;
		this.visitorPhone = res.data.visitorMobile;
		this.causeName = res.data.causeName;
		this.reason = res.data.reason;
		this.state = res.data.state;
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.detail {
	padding: 0 20rpx;
	.top {
		width: 100%;
		height: 362rpx;
		background: url('/mobile-img/bg.png') no-repeat;
		background-size: 100% 362rpx;
		margin: 20rpx 0 40rpx 0;
		color: #fff;
		.state {
			margin: 30rpx 30rpx 0 0;
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			.trigon{
				border-width:30rpx 20rpx 30rpx 0;
				border-style:solid;
				border-color:transparent #fff transparent transparent;
				position:relative;
			}
			text{
				background-color: #fff;
				padding: 0 20rpx;
			}
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
