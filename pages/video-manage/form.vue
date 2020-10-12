<template>
	<view class="u-page u-bg-fff">
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">视频名称：</view>
				<view class="u-fx-f1 mar-r20"><input class="item-input" maxlength="20" v-model="fileName" style="text-align: right;" placeholder="请输入视频名称" /></view>
			</view>
			<view class="item-list">
				<view class="tip mar-b20">上传视频：</view>
				<view class="u-fx-f1">
					<view class="upload">
						<view v-if="videoSrc === ''" class="an-img-add u-fx-ac-jc" @tap="chooseUploads">+</view>
						<view v-else class="uplode-file">
							<video class="uploade-video" :src="videoSrc" controls enable-play-gesture>
								<cover-image class="clear-one-icon" src="http://canpointtest.com/mobile-img/deletephoto.png" @tap="delImage"></cover-image>
							</video>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-circle-progress v-if="uploadTag" type="success" :percent="percent" class="progress">
			<view class="u-progress-content">
				<view class="u-progress-dot"></view>
				<text class="u-progress-info">上传中</text>
			</view>
		</u-circle-progress>
		<view class="common-btn u-mar-20" @click="confirm">提交</view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import { store, actions } from './store/index.js';
import hostEnv from '../../config/index.js';
export default {
	data() {
		return {
			type: '',
			id: '',
			classCode: '',
			schoolYearId: '',
			uploadUrl: '',
			fileName: '',
			videoSrc: '',
			percent: 0,
			uploadTag: false
		};
	},
	computed: {},
	created() {
		this.uploadUrl = `${hostEnv.zk_news}/school/media/uploadFile?schoolCode=${store.userInfo.schoolCode}&videoName=${this.fileName}`;
	},
	async mounted() {},
	methods: {
		chooseUploads() {
			uni.chooseVideo({
				sourceType: ['camera', 'album'],
				success: res => {
					console.log(res);
					if (Math.ceil(res.size / 1024) < 100 * 1024) {
						this.videoSrc = res.tempFilePath;
					} else {
						uni.showModal({
							title: '提示',
							content: `限制视频大小100MB，该视频已超出`
						});
					}
				},
				fail: err => {
					uni.showModal({
						content: JSON.stringify(err)
					});
				}
			});
		},
		delImage() {
			this.$tools.delTip('确定删除吗？', () => {
				this.uploadTag = false
				this.videoSrc = '';
				if (this.uploadTask) {
					this.uploadTask.abort();
				}
			});
		},
		async confirm() {
			if(this.uploadTag){
				this.$tools.toast('正在上传中，请稍候');
				return;
			}
			if (this.fileName === '') {
				this.$tools.toast('请输入视频名称');
				return;
			}
			if (this.videoSrc === '') {
				this.$tools.toast('请选择视频');
				return;
			}
			this.$emit('progress', false);
			this.uploadTask = uni.uploadFile({
				url: `${hostEnv.zk_news}/school/media/uploadFile?schoolCode=${store.userInfo.schoolCode}&videoName=${this.fileName}`,
				filePath: this.videoSrc,
				name: 'multipartFile',
				success: uploadFileRes => {
					this.uploadTag = false
					this.$tools.toast('上传成功', 'success');
					this.$tools.goNext(() => {
						eventBus.$emit('getList');
						this.$tools.goBack();
					});
				}
			});
			this.uploadTask.onProgressUpdate(res => {
				/* console.log('上传进度' + res.progress);
				console.log('已经上传的数据长度' + res.totalBytesSent);
				console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend); */
				this.uploadTag = true
				this.percent = res.progress
			});
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh - 128rpx);
}
.tip::before {
	position: absolute;
	content: '*';
	color: red;
	left: 10rpx;
	width: 10rpx;
	height: 10rpx;
}
.item-list {
	padding: 25rpx 10rpx 25rpx 30rpx;
	background: $uni-bg-color;
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	color: $u-tips-color;
}
.al-r {
	text-align: right;
}
.an-img-add {
	float: left;
	font-size: 60rpx;
	margin: 10rpx;
	height: 210upx;
	width: calc(33.3% - 20rpx);
	color: #666;
	background-color: #c8c7cc;
	line-height: 210upx;
}
.upload {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.uplode-file {
	margin: 10rpx;
	width: calc(33.3% - 20rpx);
	height: 210rpx;
	position: relative;
}
.uploade-img {
	display: block;
	width: 100%;
	height: 210rpx;
}
.uploade-video {
	display: block;
	max-width: 650rpx;
	max-height: 450rpx;
}
.clear-one {
	position: absolute;
	top: -10rpx;
	right: 0;
}
.clear-one-icon {
	position: absolute;
	width: 20px;
	height: 20px;
	top: -10rpx;
	right: -10rpx;
	z-index: 9;
}
.progress{
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -100rpx;
	transform: translateY(-50%);
}
</style>
