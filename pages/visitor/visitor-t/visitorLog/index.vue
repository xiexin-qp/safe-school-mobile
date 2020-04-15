<template>
	<view class="qui-page qui-fff">
		<uni-search-bar placeholder="输入姓名搜索" @confirm="search"></uni-search-bar>
		<dropdown-menu :hasStatus="false" @value0Change="value0Change" @value1Change="value1Change"></dropdown-menu>
		<no-data v-if="dataList.length === 0" msg="暂无数据"></no-data>
		<view v-else class="list">
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc">
				<text class="left">访客姓名</text>
				<view class="md qui-fx-ac qui-fx-jc">
					<text>最近来访时间</text>
					<!-- <view class="icon qui-fx-ver">
						<view class="up"><text class="iconfont">&#xe851;</text></view>
						<view class="down"><text class="iconfont">&#xe851;</text></view>
					</view> -->
				</view>
				<text class="right">来访总次数</text>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
				<view @click="goDetail(item.userCode)" v-for="(item, i) in dataList" :key="i" class="tbody qui-bd-b qui-fx-jsb">
					<text class="left">{{ item.userName }}</text>
					<text class="md">{{ item.accessTime }}</text>
					<text class="right">{{ item.visitSum }}</text>
					<view class="icon"><text class="iconfont">&#xe851;</text></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import DropdownMenu from '../component/DropdownMenu.vue';
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from '../store/index.js';
export default {
	components: {
		DropdownMenu,
		noData
	},
	data() {
		return {
			dataList: [],
			searchName: '',
			value0: '0',
			value1: '0',
			pageList: {
				page: 1,
				size: 15
			}
		};
	},
	mounted() {
		this.showList();
	},
	methods: {
		value0Change(val) {
			console.log(val);
			this.value0 = val;
			this.showList();
		},
		value1Change(val) {
			console.log(val);
			this.value1 = val;
			this.showList();
		},
		// 访客记录
		async showList(tag = false) {
			let queryTime = new Date();
			if (this.value1 === '0') {
				queryTime = '';
			} else if (this.value1 === '1') {
				queryTime = new Date(new Date().setDate(new Date().getDate() - 7));
			} else if (this.value1 === '2') {
				queryTime = new Date(new Date().setDate(new Date().getDate() - 30));
			} else if (this.value1 === '3') {
				queryTime = new Date(new Date().setDate(new Date().getDate() - 180));
			}
			console.log(queryTime);
			const req = {
				schoolCode: store.schoolCode,
				pageNum: this.pageList.page,
				pageSize: this.pageList.size,
				userName: this.searchName,
				userCode: store.userCode,
				causeId: this.value0 === '0' ? '' : this.value0,
				queryTime: queryTime
			};
			const res = await actions.getVisitList(req);
			if (tag) {
				this.pageList.page++;
				this.dataList = this.dataList.concant(res.data);
			} else {
				this.dataList = res.data.list;
				uni.stopPullDownRefresh();
				console.log(this.dataList);
				if (!res.data.hasNextPage) {
				}
			}
		},
		search(value) {
			console.log(value);
			this.searchName = value.value;
			this.showList();
		},
		goDetail(userCode) {
			this.$tools.navTo({
				url: './detail?userCode=' + userCode,
				title: '查看详情'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	padding: 25rpx 20rpx;
	font-size: 28rpx;
	.th {
		background: #7b92f5;
		padding: 20rpx 0;
		border-radius: 8rpx;
		color: #fff;
	}
	.tbody {
		position: relative;
		padding: 25rpx 10rpx;
		.icon {
			position: absolute;
			right: 10rpx;
			top: 24rpx;
			transform: rotateZ(-90deg);
			.iconfont{
				font-size:28rpx;
			}
		}	
	}
	.tbody:nth-child(even) {
		background: #f5f5f5;
	}
	.left {
		width: 25%;
		text-align: center;
	}
	.md {
		width: calc(50% - 40rpx);
		text-align: center;
	}
	.right {
		width: 25%;
		text-align: center;
	}
}
.scroll-h {
	height: calc(100vh - 330rpx);
}
.down {
	transition: transform 0.3s;
	transform: rotateZ(0);
}
.up {
	transition: transform 0.3s;
	transform: rotateZ(-180deg);
}
</style>
