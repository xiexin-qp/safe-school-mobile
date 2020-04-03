<template>
	<view class="add">
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>标题：</view>
				<view class="qui-fx-f1"><input class="item-input" /></view>
			</view>
			<view class="qui―fx qui-bd-b item-list ">
				<view>正文：</view>
				<view class="qui-fx-f1 ">
					<textarea class="item-input" />
					<view class="text_num">0/800</view>
				</view>
			</view>
			<view class="qui-bd-b item-list">
				<view>上传附图：</view>
				<view class="qui-fx-f1"><an-upload-img total="3" v-model="imgList" style="margin: 20rpx"></an-upload-img></view>
			</view>
		</scroll-view>
		<view class="submit-box"><view class="btn" @click="confirm">提交</view></view>
	</view>
</template>

<script>
import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			imgList: []
		};
	},
	computed: {},
	async mounted() {},
	methods: {}
};
</script>

<style lang="scss">
.add {
	.scroll-h {
		height: calc(100vh - 100rpx);
	}
	.item-list {
		padding: 25rpx 15rpx;
		background-color: #fff;
		.item-input {
			width: 100%;
			font-size: 26rpx;
			color: #999;
		}
		.radio {
			padding-left: 25rpx;
		}
		.text_num {
			text-align: right;
			color: #999;
		}
	}
	.submit-box {
		height: 100rpx;
		.btn {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			letter-spacing: 8rpx;
			margin: 0 20rpx;
			background-color: $main-color;
			color: #fff;
			border-radius: $radius;
		}
	}
}
</style>
