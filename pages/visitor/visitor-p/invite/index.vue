<template>
	<view class="invite qui-page">
		<uni-popup ref="refuse" type="center">
			<view class="pop qui-fx-ver">
				<view class="title">请输入拒绝原因</view>
				<input v-model="refuseText" focus placeholder="" />
				<view class="btn" @click="sure(0)">确定</view>
			</view>
		</uni-popup>
		<uni-search-bar class="search" placeholder="输入姓名搜索" @confirm="search"></uni-search-bar>
		<dropdown-menu :statusList="statusList" @value0Change="value0Change" @value1Change="value1Change" @value2Change="value2Change"></dropdown-menu>
		<no-data v-if="appointList.length === 0" msg="暂无数据"></no-data>
		<scroll-view v-else scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="approve-list" v-for="(item, i) in appointList" :key="i">
				<view class="detail qui-fx">
					<view class="process-type" style="right: 20rpx" v-if="item.state == '0'"><view class="wait" @click="appoint(item)">···</view></view>
					<view class="process-type" style="right: 20rpx" v-else><view class="cancel">···</view></view>
					<view class="info qui-fx-ac">
						<view class="img"><image :src="item.registPhoto ? item.registPhoto : errorImg" alt="" /></view>
						<view class="list qui-fx-f1">
							<view class="name">{{ item.visitorName }}</view>
							<view>开始时间：{{ item.accessStartTime | getFullDate }}</view>
							<!-- <view>结束时间：{{ item.accessEndTime | getFullDate }}</view> -->
							<view>来访事由：{{ item.causeName }}</view>
							<view>状态：{{ item.state | approveState }}</view>
						</view>
					</view>
				</view>
				<view class="line qui-bd-t"></view>
				<view class="see qui-fx-jsb">
					<text>{{ item.createTime | getFullDate }}</text>
					<view class="qui-fx qui-fx-ac">
						<text @click="goDetail(item.id)">查看详情</text>
						<view class="icon right"><text class="iconfont">&#xe851;</text></view>
					</view>
				</view>
			</view>
		</scroll-view>
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
			errorImg: require('@s/img/person.png'),
			statusList: [
				{
					text: '全部状态',
					value: '0'
				},
				{
					text: '待处理',
					value: '00'
				},
				{
					text: '同意',
					value: '1'
				},
				{
					text: '拒绝',
					value: '2'
				},
				{
					text: '撤销',
					value: '3'
				}
			],
			pageList: {
				page: 1,
				size: 15
			},
			appointList: [],
			value0: '0',
			value1: '0',
			value2: '0',
			record: {},
			refuseText: ''
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
		value2Change(val) {
			console.log(val);
			this.value2 = val;
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
			let state = '';
			if (this.value2 === '0') {
				state = '';
			} else if (this.value2 === '00') {
				state = '0';
			} else {
				state = this.value2;
			}
			const req = {
				schoolCode: store.schoolCode,
				pageNum: this.pageList.page,
				pageSize: this.pageList.size,
				userName: this.searchName,
				visitorCode: store.userCode,
				causeId: this.value0 === '0' ? '' : this.value0,
				queryTime,
				state,
				type: 1
			};
			const res = await actions.getInviteList(req);
			if (tag) {
				this.pageList.page++;
				this.appointList = this.appointList.concat(res.data.list);
			} else {
				this.appointList = res.data.list;
				uni.stopPullDownRefresh();
				console.log(this.appointList);
				if (!res.data.hasNextPage) {
				}
			}
		},
		search(value) {
			console.log(value);
			this.searchName = value.value;
			this.showList();
		},
		goDetail(id) {
			this.$tools.navTo({
				url: './detail?id=' + id,
				title: '查看详情'
			});
		},
		appoint(record) {
			const arr1 = ['同意', '拒绝'];
			this.record = record;
			this.check(arr1);
		},
		check(arr) {
			this.$tools.actionsheet(arr, index => {
				if (index === 1) {
					this.$refs.refuse.open();
				} else {
					this.$tools.confirm(`确定${arr[index]}吗?`, () => {
						const req = {
							id: this.record.id,
							state: '1',
							visitorCode: store.userCode,
							visitorName: this.record.visitorName,
							registPhoto: store.registPhoto
						};
						console.log(req);
						actions.approval(req).then(res => {
							this.$tools.toast('操作成功', 'success');
							this.showList();
						});
					});
				}
			});
		},
		sure() {
			this.$tools.confirm(`确定拒绝吗?`, () => {
				console.log(this.refuseText);
				this.refuseTag = true;
				this.$refs.refuse.close();
				const req = {
					id: this.record.id,
					state: '2',
					visitorCode: store.userCode,
					visitorName: this.record.visitorName,
					reason: this.refuseText
				};
				console.log(req);
				actions.approval(req).then(res => {
					this.$tools.toast('操作成功', 'success');
					this.refuseText = ''
					this.showList()
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	height: 104rpx;
}
.approve-list {
	background-color: #fff;
	border-radius: 16rpx;
	margin: 20rpx;
	position: relative;
	.detail {
		padding: 20rpx;
	}
	.process-type {
		top: 0;
		right: 20rpx;
		position: absolute;
		font-size: 48rpx;
		.wait {
			color: #0079ff;
		}
		.agree {
			color: #69c08f;
		}
		.refuse {
			color: #e37e7e;
		}
		.cancel {
			color: #333333;
		}
	}
	.see {
		padding: 20rpx 10rpx 20rpx 20rpx;
		text {
			color: #999;
			font-size: 24rpx;
		}
	}
	.info {
		.img {
			width: 160rpx;
			height: 200rpx;
			margin-right: 20rpx;
			image {
				width: 160rpx;
				height: 200rpx;
				background-color: #ddd;
			}
		}
		.list {
			view {
				font-size: 24rpx;
				margin: 10rpx 0;
			}
			.name {
				padding-bottom: 10rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
}
.scroll-h {
	height: calc(100vh - 190rpx);
}
.dropdown {
	height: 86rpx;
	padding: 4rpx 18rpx 18rpx 18rpx;
	background: #fff;
	font-size: 12px;
}
.dropdown-menu {
	width: 50%;
	padding: 2rpx 0;
	border: 1rpx solid #ddd;
}
.dropdown-menu:first-child {
	border-top-left-radius: 8rpx;
	border-bottom-left-radius: 8rpx;
}
.dropdown-menu:last-child {
	border-top-right-radius: 8rpx;
	border-bottom-right-radius: 8rpx;
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
.right {
	transform: rotateZ(-90deg);
}
.pop {
	text-align: center;
	text {
		padding: 20rpx 0;
	}
	text:not(:last-child) {
		border-bottom: 1rpx solid #ddd;
	}
	.title {
		padding: 20rpx 0 0 0;
	}
	input {
		border: 1rpx solid #ddd;
		margin: 20rpx 0;
	}
	.btn {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $main-color;
		color: #fff;
	}
}
</style>
