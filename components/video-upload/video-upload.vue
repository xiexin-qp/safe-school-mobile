<template>
	<view>
		<view class="upload">
			<block v-for="(upload, index) in uploads" :key="index">
				<view class="uplode-file">
					<image v-if="types == 'image'" class="uploade-img" :src="upload.url" :data-src="upload" @tap="previewImage($event, index)"></image>
					<image v-if="types == 'image'" class="clear-one-icon" :src="clearIcon" @tap="delImage(upload, index)"></image>
					<video v-if="types == 'video'" class="uploade-video" :src="upload.url" controls enable-play-gesture>
						<cover-image v-if="types == 'video'" class="clear-one-icon" :src="clearIcon" @tap="delImage(upload, index)"></cover-image>
					</video>
				</view>
			</block>
			<view v-if="uploads.length < uploadCount" class="an-img-add u-fx-ac-jc" @tap="chooseUploads">+</view>
		</view>
		<w-compress ref="wCompress" />
	</view>
</template>

<script>
import WCompress from '@/components/w-compress/w-compress.vue';
export default {
	components: {
		WCompress
	},
	props: {
		types: {
			type: String,
			default: 'image'
		},
		value: {
			type: Array,
			default: function() {
				return [];
			}
		},
		clearIcon: {
			type: String,
			default: 'http://canpointtest.com/mobile-img/del-app-icon.png'
		},
		isCheck: {
			type: Boolean,
			default: false
		},
		uploadIcon: {
			type: String,
			default: ''
		},
		uploadUrl: {
			type: String,
			default: ''
		},
		uploadCount: {
			type: Number,
			default: 1
		},
		pixels: {
			type: Number,
			default: 500000
		},
		//上传内容大小 默认3M
		upload_max: {
			type: Number,
			default: 3
		}
	},
	computed: {
		uploads: {
			get () {
				return this.value
			},
			set (val) {
				this.$emit('input', val)
			}
		}
	},
	data() {
		return {
			// 超出限制数组
			exceeded_list: [],
			successTag: false
		};
	},
	beforeDestroy() {
		if (this.uploadTask) {
			this.uploadTask.abort();
		}
	},
	mounted() {
		console.log(this.uploads)
	},
	methods: {
		previewImage(e, index) {
			uni.previewImage({
				current: index,
				urls: this.uploads.map(el => {
					return el.url;
				})
			});
		},
		chooseUploads() {
			switch (this.types) {
				case 'image':
					uni.chooseImage({
						count: this.uploadCount - this.uploads.length, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: res => {
							for (let i = 0; i < res.tempFiles.length; i++) {
								if (Math.ceil(res.tempFiles[i].size / 1024) < this.upload_max * 1024) {
									uni.showLoading({
										title: '上传中'
									});
									this.$refs.wCompress
										.start(res.tempFiles[i].path, {
											pixels: this.pixels, // 最大分辨率，默认二百万
											quality: 0.8, // 压缩质量，默认0.8
											type: 'png', // 图片类型，默认jpg
											base64: true // 是否返回base64，默认false，非H5有效
										})
										.then(data => {
											if (this.isCheck) {
												this.$tools.checkUserPhoto(data,(res)=>{
													uni.hideLoading();
													this.successTag = true;
													this.uploads.push({
														url: res
													});
													this.$emit('success', res);
												})
											} else {
												this.$emit('progress', false);
												this.uploadTask = uni.uploadFile({
													url: this.uploadUrl, //仅为示例，非真实的接口地址
													filePath: data,
													name: 'fileList',
													success: uploadFileRes => {
														uni.hideLoading();
														this.successTag = true;
														this.uploads.push(JSON.parse(uploadFileRes.data).data);
														this.$emit('success', JSON.parse(uploadFileRes.data));
														this.$emit('progress', true);
													},
													fail: err => {
														console.log(err);
														uni.showModal({
															content: JSON.stringify(err)
														});
													}
												});
											}
										});
								} else {
									this.exceeded_list.push(i === 0 ? 1 : i + 1);
									uni.showModal({
										title: '提示',
										content: `限制图片大小${this.upload_max}MB，第${[...new Set(this.exceeded_list)].join(',')}张图片超出,已过滤`
									});
								}
							}
						},
						fail: err => {
							uni.showModal({
								content: JSON.stringify(err)
							});
						}
					});
					break;
				case 'video':
					uni.chooseVideo({
						sourceType: ['camera', 'album'],
						success: res => {
							console.log(res);
							if (Math.ceil(res.size / 1024) < this.upload_max * 1024) {
								uni.showLoading({
									title: '上传中'
								});
								this.$emit('progress', false);
								this.uploadTask = uni.uploadFile({
									url: this.uploadUrl, //仅为示例，非真实的接口地址
									filePath: res.tempFilePath,
									name: 'fileList',
									success: uploadFileRes => {
										uni.hideLoading();
										this.successTag = true;
										this.uploads.push(JSON.parse(uploadFileRes.data).data);
										this.$emit('success', JSON.parse(uploadFileRes.data));
										this.$emit('progress', true);
									}
								});
							} else {
								uni.showModal({
									title: '提示',
									content: `限制视频大小${this.upload_max}MB，该视频已超出`
								});
							}
						},
						fail: err => {
							uni.showModal({
								content: JSON.stringify(err)
							});
						}
					});
					break;
			}
		},
		delImage(item, index) {
			const i = this.uploads.findIndex(list => {
				return list.url === item.url;
			});
			this.$emit('delImage', this.uploads[i]);
			uni.hideLoading();
			this.uploads.splice(index, 1);
		}
	}
};
</script>

<style scoped>
.an-img-add {
	float: left;
	font-size: 60rpx;
	margin: 10rpx;
	height: 210upx;
	width: 210upx;
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
	margin: 10upx;
	width: 210upx;
	height: 210upx;
	position: relative;
}
.uploade-img {
	display: block;
	width: 210upx;
	height: 210upx;
}
.uploade-video {
	display: block;
	max-width: 650rpx;
	max-height: 450upx;
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
	top: 0;
	right: 0;
	z-index: 9;
}
</style>
