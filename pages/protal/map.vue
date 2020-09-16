<template>
	<view class="content u-type-primary-bg">
		{{ length }}
		<img class="user-img" :src="myUrl" alt="">
		<u-button @click="fSelect">选择</u-button>
		<avatar ref="uploadImg" selWidth="450upx" selHeight="600upx" @upload="myUpload"></avatar>
	</view>
</template>
<script>
import kpsImageCutter from '../../components/ksp-image-cutter/ksp-image-cutter.vue';
import avatar from '../../components/yq-avatar/yq-avatar.vue';
let system = uni.getSystemInfoSync();
export default {
	components: { avatar },
	data() {
		return {
			myUrl: '',
			length: ''
		};
	},
	onLoad() {},
	methods: {
		fSelect () {
			this.$refs.uploadImg.fSelect()
		},
		compress : function(source_img_obj, imgType) {
			const _self = this
				source_img_obj.onload = function() {
						var cvs = document.createElement('canvas');
						var scale = this.height / this.width;
						cvs.width = 400;
						cvs.height = 450 * scale;
						var ctx = cvs.getContext("2d");
						ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
						var newImageData = cvs.toDataURL(imgType, 0.6);
						console.log(newImageData)
						_self.$tools.checkUserPhoto(newImageData, (url) => {
							_self.$tools.confirm('图片上传成功', null, false)
							console.log(url)
						})
				}
		},
		myUpload(rsp) {
			this.myUrl = rsp.base64
			this.length = rsp.base64.length / 1024
			console.log(rsp)
			var i = new Image();
			i.src = rsp.base64;
			this.compress(i, 'image/jpeg')
		},
		chooseImage() {
			this.$tools.choosePhoto(async url => {
				this.url = url;
			}, true);
		},
		onok(ev) {
			this.path = ev.path;
			this.url = '';
		},
		oncancle() {
			// url设置为空，隐藏控件
			this.url = '';
		}
	}
};
</script>

<style>
.user-img {
	width: 300rpx;
	height: 400rpx;
	margin: 0 auto;
}
.image {
	width: 400px;
	height: 400px;
}
</style>
