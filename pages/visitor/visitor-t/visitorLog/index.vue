<template>
	<view class="qui-page">
		<uni-search-bar placeholder="输入姓名搜索" @confirm="search"></uni-search-bar>
		<view class="dropDown qui-fx">
			<ms-dropdown-menu><ms-dropdown-item v-model="value0" :list="casueList"></ms-dropdown-item></ms-dropdown-menu>
			<ms-dropdown-menu><ms-dropdown-item v-model="value1" :list="dateList"></ms-dropdown-item></ms-dropdown-menu>
		</view>
		<no-data v-if="false" msg="暂无数据"></no-data>
		<view v-else class="list">
			<view class="th qui-fx-jsa qui-fx-ac qui-fx-jc">
				<text class="left">访客姓名</text>
				<view class="md qui-fx-ac qui-fx-jc">
					<text>最近来访时间</text>
					<view class="icon qui-fx-ver">
						<view class="up"><text class="iconfont">&#xe851;</text></view>
						<view class="down"><text class="iconfont">&#xe851;</text></view>
					</view>
				</view>
				<text class="right">来访总次数</text>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
				<view @click="goDetail(list.id)" v-for="list in 20" :key="list.id" class="tbody qui-bd-b qui-fx-jsb">
					<text class="left">李毅</text>
					<text class="md">2020-04-05</text>
					<text class="right">5</text>
					<view class="icon"><text class="iconfont">&#xe851;</text></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import noData from '@/components/no-data/no-data.vue';
import { actions } from '../store/index.js';
export default {
	components: {
		msDropdownMenu,
		msDropdownItem,
		noData
	},
	data() {
		return {
			dataList: [],
			value0: '0',
			value1: '0',
			casueList: [
				{
					text: '全部事由',
					value: '0'
				},
				{
					text: '看望孩子',
					value: '1'
				},
				{
					text: '家长会',
					value: '2'
				},
				{
					text: '商务拜访',
					value: '3'
				}
			],
			dateList: [
				{
					text: '全部时间',
					value: '0'
				},
				{
					text: '一周内',
					value: '1'
				},
				{
					text: '一个月内',
					value: '2'
				},
				{
					text: '六个月内',
					value: '3'
				}
			]
		};
	},
	watch: {
		value0(val) {
			console.log(val);
		},
		value1(val) {
			console.log(val);
		}
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
		search(value) {
			console.log(value);
		},
		goDetail(id) {
			this.$tools.navTo({
				url: './detail?id=' + id,
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
			top: 30rpx;
			transform: rotateZ(-90deg);
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
.dropdown {
	padding: 4rpx 18rpx 18rpx 18rpx;
	background: #fff;
	font-size: 12px;
}
.dropdown-menu {
	width: 50%;
	padding: 2rpx 0;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
}
.dropdown-menu:first-child {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-right: none;
}
.dropdown-menu:last-child {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
.dropdown-item__selected {
	padding: 10rpx;
}
@font-face {
	font-family: 'iconfont'; /* project id 1564327 */
	src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
	src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
		url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'), url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
		url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
}
.icon {
	margin-left: 10rpx;
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 24rpx;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
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
