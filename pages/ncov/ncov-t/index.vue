<template>
	<view class="qui-page u-bg-fff">
		<u-tabs class="padd-b10" :list="tabList" :current="current" @change="tabChange"></u-tabs>
		<view class="calendar"><uni-calendar @monthSwitch="monthSwitch" :selected="selected" :end-date="endDate" @change="change"></uni-calendar></view>
		<view v-if="current === 0" class="title qui-fx-jsb">
			<text>今日上报 2 次</text>
			<text @click="nowReport(1)">立即上报</text>
		</view>
		<view v-else class="qui-bd-1px"></view>
		<scroll-view v-if="current === 0" scroll-y="true" class="scroll-h"><steps :talk="talk"></steps></scroll-view>
		<view class="report qui-fx-jsa" v-else>
			<view class="info qui-fx-ac-jc" @click="countDetail(1, 32)">
				<text>上报</text>
				<text>32人</text>
			</view>
			<view class="info qui-fx-ac-jc" @click="countDetail(0, 3)">
				<text>未上报</text>
				<text>3人</text>
			</view>
			<view class="info qui-fx-ac-jc err" @click="countDetail(2, 30)">
				<text>异常</text>
				<text>30人</text>
			</view>
			<view class="info qui-fx-ac-jc err" @click="countDetail(3, 2)">
				<text>发热</text>
				<text>2人</text>
			</view>
		</view>
		<u-popup ref="popup" mode="center" length="75%" border-radius="8" :mask-close-able="false">
			<view class="common-btn bg-top">{{ title }}{{ count }}人</view>
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore">
				<view class="student-list">
					<view class="qui-fx-jsb qui-fx-ac" v-for="(item, i) in 10" :key="i" @click="reportDetail(item)">
						<view class="student qui-fx-ac">
							<image :src="item.photoImg ? item.photoImg : errorImg" />
							<span>张三</span>
						</view>
						<text>未上报</text>
					</view>
				</view>
			</scroll-view>
			<view class="common-btn" @click="confirm">确定</view>
		</u-popup>
	</view>
</template>

<script>
import { store, actions } from './store/index.js';
import steps from './steps.vue';
export default {
	data() {
		return {
			errorImg: '/mobile-img/person-auto.png',
			tabList: [
				{
					name: '我的'
				},
				{
					name: '班级'
				}
			],
			current: 0,
			dayInfo: {},
			day: this.$tools.getDateTime(new Date(), 'date'),
			endDate: this.$tools.getDateTime(new Date(), 'date'),
			selected: [
				{
					date: '2020-04-23',
					info: '发热'
				},
				{
					date: '2020-04-21',
					info: '发热'
				}
			],
			talk: [
				{
					id: 1,
					time: '08:38',
					heat: '36.5',
					status: 0
				},
				{
					id: 2,
					time: '13:02',
					heat: '37.5',
					status: 1
				},
				{
					id: 3,
					time: '19:05',
					heat: '36.1',
					status: 0
				}
			],
			title: '未上报',
			count: 0
		};
	},
	components: {
		steps
	},
	async mounted() {
		this.showList();
	},
	methods: {
		async showList(tag = false) {
			const req = {
				userCode: store.userInfo.userCode,
				day: this.day
			};
			const res = await actions.getIndex(req);
			this.dayInfo = res.data;
		},
		//切换选项卡
		tabChange(index) {
			this.current = index;
			console.log(this.current);
		},
		//切换日期
		change(data) {
			this.day = data.fulldate;
			this.showList();
		},
		//切换月份
		monthSwitch(e) {
			console.log(e.year + '-' + e.month);
			this.showList();
		},
		nowReport() {
			this.$tools.navTo({
				url: './form'
			});
		},
		reportDetail(record) {
			this.$tools.navTo({
				url: './detail?id=' + record.id
			});
		},
		countDetail(type = 0, count) {
			console.log(type);
			this.count = count
			this.title = type === 0 ? '未上报' : type === 1 ? '上报'  : type === 2 ? '异常' :  '发热' 
			this.$refs.popup.open();
		},
		confirm() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="scss">
.padd-b10 {
	padding-bottom: 10rpx;
}
.scroll-h {
	height: calc(100vh - 970rpx);
}
.scroll {
	height: calc(78vh - 100rpx);
}
.title {
	padding: 30rpx 20rpx 20rpx 20rpx;
	background-color: $u-bg-color;
	text:nth-child(1) {
		font-size: 28rpx;
	}
	text:nth-child(2) {
		font-size: 24rpx;
		color: $u-type-primary;
	}
}
.report {
	margin: 60rpx 10rpx;
	.info {
		background-color: $u-bg-color;
		border-radius: $radius;
		padding: 30rpx 40rpx;
		text:first-child {
			margin-bottom: 10rpx;
		}
	}
	.err {
		color: $u-type-error;
	}
}
.student-list {
	margin: 20rpx 40rpx;
	view {
		padding: 10rpx 0;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 100%;
			margin-right: 20rpx;
		}
	}
	.err{
		color: $u-type-error;
	}
}
.bg-top {
	background-color: $u-bg-color;
	color: $u-main-color;
}
</style>
