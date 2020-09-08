<template>
	<view class="content u-type-primary-bg">
		1212
		<avatar selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url" avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;"></avatar>
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
			url: '',
			path: '',
			width: 300 * system.pixelRatio,
			height: 300 * system.pixelRatio
		};
	},
	onLoad() {},
	methods: {
		myUpload(rsp) {
			console.log(rsp.path)
			this.url = rsp.path; //更新头像方式一
			//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
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
.image {
	width: 200px;
	height: 200px;
}
</style>
