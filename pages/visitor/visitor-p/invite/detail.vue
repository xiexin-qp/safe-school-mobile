<template>
	<view class="qui-page">
		<view class="detail">
			<view class="top qui-fx-jsb">
				<view class="info qui-fx-ac">
					<image :src="photo ? photo :errorImg" alt="">
					<view class="qui-fx-ver">
						<text class="name">{{ comeLog.respondentName }}</text>
						<text class="phone">{{ comeLog.resMobile }}</text>
						<text class="name">{{ comeLog.causeName }}</text>
					</view>
				</view>
				<view class="state qui-fx">
					<view class="trigon">
					</view>
					<text :class="state === '2' ? 'refuse' : state === '1' ? 'agree' : state === '0' ? 'wait' : 'cancel'">{{ state | approveState }}</text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-h">
				<view class="log qui-fx-jsb">
					<view class="qui-fx-ver">
						<view class="start qui-fx-ac">
							<text>起</text>
							<text>{{ comeLog.accessStartTime | gmtToDate }}</text>
						</view>
					</view>
					<view class="qui-fx-ver">
						<view class="end qui-fx-ac">
							<icon type="info" size="24" />
							<text style="margin-left: 10rpx;">随行人数：{{ comeLog.togetherNum }}</text>
						</view>
					</view>
				</view>
				<view v-if="refuseTag" class="log qui-fx-jsb">
					<view class="start qui-fx-ac">
						<icon type="cancel" size="24" />
						<text style="margin-left: 10rpx;">拒绝原因：{{ comeLog.reason }}</text>
					</view>
				</view>
				<view v-if="state == '0'" class="log">
					<view class="item-list">
						<view>我的照片：</view>
						<view class="qui-fx-f1"><an-upload-img total="1" v-model="imgList" style="margin: 20rpx"></an-upload-img></view>
						<view class="sub-title">请上传1张本人正脸清晰照片用于来访识别。</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="state == '0'" class="submit-box qui-fx">
			<view class="btn1" @click="open">拒绝</view>
			<view class="btn2" @click="clickConfirm">同意</view>
		</view>
		<uni-popup ref="refuse" type="center">
			<view class="pop qui-fx-ver">
				<view class="title">请输入拒绝原因</view>
				<input v-model="refuseText" focus placeholder="" />
				<view class="btn" @click="sure(0)">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { store, actions } from '../store/index.js';
import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			errorImg: require('@s/img/person.png'),
			showTag: false,
			refuseTag: false,
			refuseText: '',
			imgList: [],
			id: '',
			visitorName: '',
			visitorPhone: '',
			causeName: '',
			state: '',
			photo: ',',
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
		this.photo = res.data.registPhoto;
		this.state = res.data.state;
	},
	methods: {
		clickCancel() {
			this.showTag = false;
		},
		clickConfirm() {
			this.$tools.confirm(`确定同意吗?`, () => {
				const req = {
					registPhoto: this.imgList[0],
					id: this.id,
					state: '1',
					visitorCode: store.userInfo.userCode,
					visitorName: store.userInfo.userName,
					visitorMobile: store.userInfo.visitorMobile,
					schoolCode: store.userInfo.schoolCode,
					openid: store.userInfo.openid,
					type: 1
				};
				console.log(req);
				actions.approval(req).then(res => {
					this.$tools.toast('操作成功', 'success');
					this.$tools.goNext(()=>{
						this.$tools.navTo({
							url: './index',
							title: '邀约处理'
						});
					})
				});
			});
		},
		open() {
			this.$refs.refuse.open();
		},
		sure() {
			this.$tools.confirm(`确定拒绝吗?`, () => {
				console.log(this.refuseText);
				this.refuseTag = true;
				this.$refs.refuse.close();
				const req = {
					id: this.id,
					state: '2',
					visitorCode: store.userInfo.userCode,
					visitorName: store.userInfo.userName,
					visitorMobile: store.userInfo.visitorMobile,
					schoolCode: store.userInfo.schoolCode,
					openid: store.userInfo.openid,
					reason: this.refuseText,
					type: 1
				};
				console.log(req);
				actions.approval(req).then(res => {
					this.$tools.toast('操作成功', 'success');
					this.refuseText = '';
					this.$tools.goNext(()=>{
						this.$tools.navTo({
							url: './index',
							title: '邀约处理'
						});	
					})
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.detail {
	padding: 0 20rpx;
	.scroll-h {
		height: calc(100vh - 500rpx);
	}
	.top {
		width: 100%;
		height: 362rpx;
		background: url('../../../../static/img/bg.png') no-repeat;
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
		.sub-title {
			font-size: 24rpx;
			color: #999;
		}
	}
}
.submit-box {
	height: 100rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	.btn1 {
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: #fff;
		color: #000;
		border-radius: $radius;
	}
	.btn2 {
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $main-color;
		color: #fff;
		border-radius: $radius;
	}
}
.pop {
	text-align: center;
	.title {
		padding: 20rpx 0 0 0;
	}
	input {
		border: 1rpx solid #ddd;
		margin: 20rpx 0;
	}
	.btn {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $main-color;
		color: #fff;
	}
}
</style>
