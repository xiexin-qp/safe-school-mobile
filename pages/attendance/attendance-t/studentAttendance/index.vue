<template>
	<view class="student-attendance qui-page qui-fx qui-fx-ver">
		<view>
			<view><uni-calendar @change="getDate"></uni-calendar></view>
			<view class="record-box">
				<view class="attandence-title qui-fx-ac-jc">上下学考勤统计</view>
				<view class="attandence-box">
					<view class="attandence-info qui-fx-ac-jc" v-for="item in attandenceInfo" :key="item.id" @click="detail(item)">
						<view>{{ item.title }}</view>
						<view class="attandence-num">{{ item.num }}人</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
				<view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
					<text>{{ list.name }}</text>
					<image :src="person" mode=""></image>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
import person from '@s/img/person.png';
// import { store, actions } from './store/index.js'
export default {
	data() {
		return {
			person,
			dayInfo: [
				{
					id: 1,
					workOnTime: '2020-03-30',
					recordOnTime: '2020-03-30',
					stateOn: 1
				}
			],
			leaveList: [],
			exceptionList: [],
			zcList: [],
			currentDay: '',
			isOther: false,
			dataList: [],
			attandenceInfo: [
				{
					title: '正常',
					num: 38
				},
				{
					title: '上学缺卡',
					num: 2
				},
				{
					title: '迟到',
					num: 7
				},
				{
					title: '早退',
					num: 4
				},
				{
					title: '放学缺卡',
					num: 9
				},
				{
					title: '缺勤',
					num: 13
				}
			]
		};
	},
	mounted() {
		this.showList();
	},
	methods: {
		async showList(tag = false) {
			const res = await actions.getIndex();
			if (tag) {
				this.dataList = this.dataList.concat(res.data);
			} else {
				this.dataList = res.data;
				uni.stopPullDownRefresh();
			}
		},
		detail(item) {
			console.log('item', item);
			this.$refs.popup.open();
		}
	}
};
</script>

<style lang="less" scoped>
.student-attendance {
	.record-box {
		padding-top: 20rpx;
		background-color: #f2f8fe;
		.attandence-title {
			height: 60rpx;
			line-height: 60rpx;
			font-size: 36rpx;
		}
		.attandence-box {
			height: 320rpx;
			.attandence-info {
				width: 31%;
				float: left;
				margin-bottom: 30rpx;
				background-color: #fff;
				margin: 15rpx 0 5rpx 15rpx;
				padding: 20rpx 0;
				border-radius: 15rpx;
				image {
					width: 60rpx;
					margin-bottom: 10rpx;
				}
			}
			:nth-child(3n) {
				border-right: none;
			}
			.attandence-num {
				color: #ccc;
				font-size: 28rpx;
			}
		}
	}
	.scroll-h {
		height: 70vh;
		.list {
			padding: 15rpx;
			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
}
</style>
