<template>
	<view class="qui-page">
		<view class="detail">
			<view class="top qui-fx-jsb">
				<view class="info qui-fx-ac">
					<image :src="comeLog.resUrl ? comeLog.resUrl : errorImg" alt="">
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
				<view class="log qui-fx-jsb qui-fx-ac">
					<view class="qui-fx-ver">
						<view class="start qui-fx-ac">
							<text>到</text>
							<text>{{ comeLog.accessStartTime | gmtToDate }}</text>
						</view>
					</view>
					<view class="qui-fx-ver">
						<view class="end qui-fx-ac">
							<icon type="info" size="24" />
							<view style="margin-left: 10rpx;" v-if="state !== '0'">随行人数：{{ comeLog.togetherNum || 0 }}</view>
							<view style="margin-left: 10rpx;" v-else class="qui-fx-ac togethernum">随行人数：<input type="number" v-model="comeLog.togetherNum" focus placeholder="" /></view>
						</view>
					</view>
				</view>
				<view v-if="refuseTag || state == '2'" class="log qui-fx-jsb">
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
			errorImg: '/mobile-img/person-auto.png',
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
				togetherNum: '0',
				duration: '',
				reason: '',
				visitorUrl: '',
				resUrl: ''
			}
		};
	},
	onLoad(options) {
		this.id = options.id;
		console.log(store);
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
				if(this.imgList.length===0){
					this.$tools.toast('请上传访客人脸识别照片');
					return
				}
				const req = {
					registPhoto: this.imgList[0].split(',')[1],
					id: this.id,
					state: '1',
					visitorCode: store.userInfo.userCode,
					visitorName: store.userInfo.userName,
					visitorMobile: store.userInfo.mobile,
					schoolCode: store.userInfo.schoolCode,
					togetherNum: this.comeLog.togetherNum,
					openid: store.openid,
					type: 1
				};
				console.log(req);
				actions.approval(req).then(res => {
					this.$tools.toast('操作成功', 'success');
					this.$tools.goNext(()=>{
						this.$tools.navTo({
							url: './index'
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
					visitorMobile: store.userInfo.mobile,
					schoolCode: store.userInfo.schoolCode,
					openid: store.openid,
					reason: this.refuseText,
					type: 1
				};
				console.log(req);
				actions.approval(req).then(res => {
					this.$tools.toast('操作成功', 'success');
					this.refuseText = '';
					this.$tools.goNext(()=>{
						this.$tools.navTo({
							url: './index'
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
		height: calc(100vh - 440rpx);
	}
	.top {
		width: 100%;
		height: 362rpx;
		background: url('/mobile-img/person-bg.png') no-repeat;
		background-size: 100% 362rpx;
		margin: 20rpx 0 40rpx 0;
		color: $uni-bg-color;
		.state {
			margin: 30rpx 30rpx 0 0;
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			.trigon{
				border-width:30rpx 20rpx 30rpx 0;
				border-style:solid;
				border-color:transparent $uni-bg-color transparent transparent;
				position:relative;
			}
			text{
				background-color: $uni-bg-color;
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
		background: $uni-bg-color;
		padding: 40rpx 20rpx;
		margin: 20rpx 0 40rpx 0;
		border: 1px solid $u-border-color;
		border-radius: 16rpx;
		box-shadow: 2rpx 2rpx 1rpx 1rpx $u-border-color;
		.start,
		.end {
			margin: 10rpx 0;
			text:first-child {
				border: 1rpx solid $u-type-primary;
				padding: 6rpx 12rpx;
				border-radius: 100%;
				margin-right: 20rpx;
			}
		}
		.sub-title {
			font-size: 24rpx;
			color: $u-tips-color;
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
		background-color: $uni-bg-color;
		color: $u-main-color;
		border-radius: $radius;
	}
	.btn2 {
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $u-type-primary;
		color: $uni-bg-color;
		border-radius: $radius;
	}
}
.pop {
	text-align: center;
	.title {
		padding: 20rpx 0 0 0;
	}
	input {
		border: 1rpx solid $u-border-color;
		margin: 20rpx 0;
	}
	.btn {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $u-type-primary;
		color: $uni-bg-color;
	}
}
/deep/ uni-input{
	    line-height: 2.1em;
	    height: 2.1em;
	    min-height: 2.1em;
}
.togethernum{
	/deep/ uni-input{
		    line-height: 1.4em;
		    height: 1.4em;
		    min-height: 1.4em;
				max-width: 60rpx;
				.uni-input-input{
					padding: 0 10rpx;
					border: 1rpx solid $u-border-color;
					border-radius: 4rpx;
				}
	}
}
/deep/ .uni-popup__wrapper-box{
	width: 80%;
	border-radius: 6rpx;
}
</style>
