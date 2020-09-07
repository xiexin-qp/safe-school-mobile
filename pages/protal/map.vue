<template>
	<view class="content">
		<button @tap="chooseImage()">选择图片</button>
		<image class="image" :src="path"></image>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :width="width" :height="height"></kps-image-cutter>
	</view>
</template>
<script>
import kpsImageCutter from '../../components/ksp-image-cutter/ksp-image-cutter.vue';
let system = uni.getSystemInfoSync();
export default {
	components: { kpsImageCutter },
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
		chooseImage() {
			this.$tools.choosePhoto(async (url) => {
				this.url = url
			}, true)
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
