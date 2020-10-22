<template>
	<view class="home u-page u-fx-f1 u-bg-fff">
		<choose-child v-if="userType === 1" @change="childInfo"></choose-child>
		<view
			class="user-info u-fx-ac u-mar-b10 u-border-radius u-padd-40 u-bd-b u-content-color u-bg-fff"
			style="background: url('/mobile-img/intro-background.png') no-repeat; backgroundSize: contain"
		>
			<image class="img u-border-radius" src="" alt="" />
			<view class="u-fx-f1 u-line3 u-mar-l20">
				<view class="u-type-white">张一山</view>
				<view class="u-font-01 u-type-white">ID：35251254</view>
			</view>
			<view class="u-fx-jc-ac u-line3 u-mar-r20">
				<view class="u-type-white u-font-3 u-mar-b10">￥360.00</view>
				<view class="unbind-btn u-fx-ac-jc" @click="goRecharge">充值</view>
			</view>
		</view>
		<view class="content u-padd-20">
			<view class="title u-fx-jsb">
				<view class="">我的账单</view>
				<view class="" @click="goRule">消费规则</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-h">
				<view class="u-auto">
					<no-data v-if="false" msg="暂无数据~"></no-data>
					<view v-else class="list u-padd-20 u-mar-20 u-bg-fff u-border-radius u-bd-1px" v-for="(item, i) in 20" :key="i" @click="billDetail(item)">
						<view class="u-fx-jsb u-fx-ac u-padd-10">
							<view class="u-fx-f1">
								<view class="u-mar-b10 u-font-1">消费</view>
								<view class="u-tips-color">2020/02/02 11:58:00</view>
							</view>
							<view class="">
								<view class="u-mar-b10 u-font-1">￥10.00</view>
								<view class="u-tips-color">已成功</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from './store/index.js';
export default {
	data() {
		return {
			userType: 2, // 1.学生，2.教职工
			dataList: []
		};
	},
	components: {
		noData
	},
	computed: {},
	async mounted() {
		if (store.userInfo.typeCode === '4') {
			this.userType = 2;
			this.userCode = store.userInfo.userCode
			this.userName = store.userInfo.userName
			this.photoUrl = store.userInfo.photoUrl
		} else if (store.userInfo.typeCode === '16') {
			this.userType = 1;
			this.userCode = store.childList[0].userCode;
			this.userName = store.childList[0].userName;
			this.photoUrl = store.childList[0].photoUrl
			uni.setStorageSync('bindInfo', {
				...store.childList[0]
			});
			eventBus.$on('getList', () => {
				this.showList();
			});
			this.showList();
		}
		console.log(this.userType);
	},
	methods: {
		// 家长切换学生
		childInfo(item) {
			if (item.userCode !== this.userCode) {
				this.userCode = item.userCode;
				this.userName = item.userName
				this.photoUrl = item.photoUrl
				this.showList();
			}
		},
		// 账单列表
		async showList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				...this.pageList,
				name: this.name,
				schoolCode: store.userInfo.schoolCode,
				schoolYearId: this.schoolYearId
			};
			console.log(req);
			const res = await actions.getStudyList(req);
			if (!res.data) {
				return;
			}
			if (tag) {
				this.dataList = this.dataList.concat(res.data.list);
			} else {
				this.dataList = res.data.list;
			}
			this.morePage = res.data.hasNextPage;
		},
		// 下拉刷新
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.showList(true);
		},
		//充值
		goRecharge(){
			this.$tools.navTo({
				url: `./recharge?userCode=${this.userCode}`
			});
		},
		//编辑消费规则
		goRule(){
			this.$tools.navTo({
				url: `./consumeRule?userCode=${this.userCode}`
			});
		},
		//账单详情
		billDetail(record){
			this.$tools.navTo({
				url: `./billDetail?id=${record.id}`
			});
		}
	}
};
</script>

<style lang="scss">
.home {
	.user-info {
		height: 230rpx;
		.img {
			width: 140rpx;
			height: 150rpx;
			display: block;
			background-color: #eee;
		}
		.unbind-btn {
			width: 120rpx;
			height: 50rpx;
			background-color: $u-type-white;
			color: $u-type-primary;
			border-radius: 60rpx;
			margin: 0 auto;
		}
	}
	.content{
		.scroll-h {
			height: calc(100vh - 320rpx);
		}
		.list {
			.sub {
				color: $u-type-primary;
				background-color: $u-type-primary;
				padding: 30rpx 36rpx;
				image {
					width: 30rpx;
					height: 40rpx;
				}
			}
			.tag {
				.u-tag {
					width: 100rpx;
				}
			}
		}
	}
}
</style>
