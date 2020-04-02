<template>
	<view class="qui-page">
		<view class="head">我创建的通行权限组</view>
		<scroll-view @refresherpulling="haha" scroll-y="true" class="scroll-h">
			<view class="content">
				<view class="record-box">
					<view class="leave-box" v-for="list in 20" :key="list.id">
						<view class="work-box qui-fx-jsb">
							<view>
								<view class="work-til">小学部教师组</view>
								<view class="div-btn" @click="goDetail()">...</view>
								<view class="work-title normal-time" style="">2020年3月21日 12:00</view>
								<view class="work-title normal-equ" style="">校大门设备组</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import eventBus from '@u/eventBus.js';
import { store, actions } from '../store/index.js';
export default {
	name: 'index',
	components: {},
	onLoad(options) {
		console.log(options);
	},
	onPullDownRefresh() {
		this.showList();
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {},
	methods: {
		goDetail() {
			this.$tools.navTo({
				url: './detail',
				title: '查看列表'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.scroll-h {
	height: calc(100vh - 100rpx);
}
.work-title {
	margin-top: 30rpx;
}
.work-til {
	display: inline-block;
}
.div-btn {
	display: inline-block;
	cursor: pointer;
	font-size: 1.5rem;
	margin-left: 10.6rem;
}
.normal-time {
	color: #555555;
}
.normal-equ {
	font-size: 13px;
	color: #c8c7cc;
}
.work-box {
	background-color: #fff;
	border-radius: 8rpx;
	margin: 20rpx;
	padding: 50rpx;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid #cfd0d1;
	.work-line {
		border-left: 2rpx 7b92f5 dashed;
	}
}
.head {
	font-size: 18px;
	text-align: center;
	height: 100rpx;
	padding-top: 30rpx;
}
</style>
