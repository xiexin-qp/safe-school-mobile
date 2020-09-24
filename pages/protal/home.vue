<template>
	<view class="home">
		<view @tap="goModule" class="module-dialog" v-if="isModule">模块</view>
		<view class="banner">
			<view class="banner">
				<swiper class="swiper" :indicator-active-color="actColor" :indicator-color="autoColor" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval">
					<swiper-item><image class="banner-img" src="/mobile-img/banner-one.png"></image></swiper-item>
					<swiper-item><image class="banner-img" src="/mobile-img/banner-two.png"></image></swiper-item>
				</swiper>
			</view>
		</view>
		<view class="enjoy">
			<view @click="goApp(enjoy)" v-for="enjoy in enjoyApp.concat(addMore)" :key="enjoy.id" class="enjoy-list u-fx-ac-jc">
				<view><image class="app-icon" :src="enjoy.icon || '/mobile-img/app-auto-icon.png'" alt=""></image></view>
				<text class="title u-content-color u-font-01">{{ enjoy.name.split('-')[0] }}</text>
			</view>
		</view>
		<view class="todo" v-if="false">您还有5个待办事项需要处理, 请尽快处理...</view>
		<view class="tab-list">
			<view class="u-fx-jc">
				<view class="tab-title u-fx">
					<view v-for="tab in tabList" :key="tab.id" @click="changTab(tab)" :class="{ act: tabIndex === tab.id }" class="tab">{{ tab.title }}</view>
				</view>
			</view>
			<new-list v-if="tabIndex === 0" :news-list="newsList"></new-list>
			<notice v-if="tabIndex === 1" :notice-list="noticeList"></notice>
		</view>
	</view>
</template>

<script>
import newList from './component/new-list.vue';
import notice from './component/notice.vue';
import { setStore, store, actions } from './store/index.js';
import apiFun from './store/apiFun.js';
export default {
	data() {
		return {
			currentClass: uni.getStorageSync('currentClass') || 0,
			isModule: false,
			autoColor: 'rgba(0, 0, 0, .2)',
			actColor: '#ffffff',
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			bannerList: [
				{
					image: '/mobile-img/banner-one.png',
					title: '平安校园全面升级啦'
				},
				{
					image: '/mobile-img/banner-two.png',
					title: '平安校园保证中小学的生命财产安全'
				},
				{
					image: '/mobile-img/banner-one.png',
					title: '新品上线'
				}
			],
			tabIndex: 0,
			newsList: [],
			noticeList: [],
			tabList: [
				{
					id: 0,
					title: '学校新闻'
				},
				{
					id: 1,
					title: '通知公告'
				}
			],
			addMore: [
				{
					icon: '/mobile-img/more-add-icon.png',
					id: 0,
					name: '更多'
				}
			],
			pageList: {
				page: 1,
				size: 4
			}
		};
	},
	computed: {
		userInfo: () => store.userInfo,
		enjoyApp: () => store.enjoyApp,
		appList: () => store.appList,
	},
	components: {
		newList,
		notice
	},
	mounted() {
		if (process.env.NODE_ENV === 'development') {
			this.isModule = true;
		}
		// 初始化学年
		this.$tools.getSchoolYear(this.userInfo, data => {
			console.log('school', data)
			setStore({
				key: 'schoolYear',
				data: data
			});
		});
		// 判断是否是班主任
		if (this.userInfo.typeCode === '4') {
			this.$tools.isBZR(this.userInfo, data => {
				if (!data) return
				let classInfo = {}
				if (parseInt(this.currentClass) > data.length - 1) {
					classInfo = data[0]
				} else {
					this.classInfo = data[this.currentClass]
				}
				setStore({
					key: 'isBZR',
					data: this.classInfo
				});
			});
		}
		// 教职工任课班级列表
		if (this.userInfo.typeCode === '4') {
			let classList = [];
			actions
				.getClassListByTeacher({
					schoolCode: store.userInfo.schoolCode,
					userCode: store.userInfo.userCode
				})
				.then(res => {
					if (!res.data || res.data.length === 0) {
					} else {
						res.data.forEach(el => {
							classList.push({
								text: el.gradeName + el.className,
								value: el.classCode,
								isBZR: false,
								gradeCode: el.gradeCode,
								subjectList: el.subjectList,
								className: el.className,
								gradeName: el.gradeName,
								classId: el.classId
							});
						});
					}
					if (this.classInfo) {
						const index = classList.findIndex(list => {
							return list.value === this.classInfo.classCode;
						});
						if (index !== -1) {
							classList[index].isBZR = true;
							classList.unshift(classList[index]);
							classList.splice(index + 1, 1);
						} else {
							classList.unshift({
								text: this.classInfo.gradeName + this.classInfo.className,
								value: this.classInfo.classCode,
								className: this.classInfo.className,
								gradeName: this.classInfo.gradeName,
								gradeCode: this.classInfo.gradeCode,
								classId: this.classInfo.classId,
								isBZR: true
							});
						}
					}
					setStore({
						key: 'teachClassList',
						data: classList
					});
				});
		}
		this.newsListGet();
	},
	methods: {
		goModule() {
			this.$tools.navTo({
				url: '../index/index'
			});
		},
		async newsListGet() {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				page: this.pageList.page,
				size: this.pageList.size
			};
			const res = await actions.getNewsList(req);
			this.newsList = res.data.list;
		},
		async noticeListGet() {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				page: this.pageList.page,
				size: this.pageList.size,
				userCode: store.userInfo.userCode
			};
			if (store.userInfo.typeCode === '4') {
				const res = await actions.getlistByTeacher(req);
				this.noticeList = res.data.list;
			} else {
				const res = await actions.getlistByUser(req);
				this.noticeList = res.data.list;
			}
		},
		changTab(tab) {
			this.tabIndex = tab.id;
			if (tab === 0) {
				this.newsListGet();
			} else {
				this.noticeListGet();
			}
		},
		goApp(enjoy) {
			if (this.userInfo.typeCode === '16' && store.childList.length === 0) {
				this.$tools.toast('请先绑定孩子');
				return;
			}
			if (enjoy.id === 0) {
				setStore({
					key: 'tabIndex',
					data: 1
				});
			} else {
				if (!apiFun.isRoleApp(enjoy.url)) {
					this.$tools.toast('您没有访问权限');
					return;
				}
				if (enjoy.url.indexOf('#') > -1) {
					window.location.href= enjoy.url
				} else {
					this.$tools.navTo({
						title: enjoy.name,
						url: enjoy.url
					})
				}
			}
		},
		// 获取绑定的孩子
		async getChildList() {
			const { schoolCode, userCode, typeCode } = this.userInfo;
			const res = await actions.getChildList({
				schoolCode,
				userCode,
				userType: typeCode
			});
			this.childList = res.data;
			setStore({
				key: 'childList',
				data: res.data
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.module-dialog {
	position: fixed;
	text-align: center;
	line-height: 80rpx;
	z-index: 99;
	bottom: 50rpx;
	left: 10rpx;
	background-color: $u-type-primary;
	color: $u-type-white;
	width: 80rpx;
	height: 80rpx;
	border-radius: 100%;
}
.banner {
	border-radius: 12rpx;
	overflow: hidden;
	// margin: 5rpx;
	padding: 5rpx;
	.swiper {
		width: 100%;
		overflow: hidden;
		height: 350rpx;
		view {
			height: 350rpx;
		}
	}
	.banner-img {
		width: 100%;
		height: 350rpx;
		display: block;
	}
}
.todo {
	height: 78rpx;
	padding: 0 20rpx;
	line-height: 78rpx;
	background-color: #fff;
	margin: 20rpx 0;
}
.enjoy {
	background-color: #fff;
	height: 280rpx;
	.enjoy-list {
		width: 25%;
		float: left;
		height: 140rpx;
		.app-icon {
			width: 50rpx;
			height: 50rpx;
			display: block;
		}
		.title {
			padding-top: 10rpx;
		}
	}
}
.tab-list {
	margin-top: 20rpx;
	background-color: #fff;
	.scroll-h {
		height: calc(100vh - 870rpx);
	}
}
.tab-title {
	margin: 20rpx 0;
	border: 1px $u-border-color solid;
	overflow: hidden;
	border-radius: 10rpx;
	.tab {
		line-height: 60rpx;
		height: 60rpx;
		padding: 0 44rpx;
		border-left: 1px $u-border-color solid;
		&:first-child {
			border-left: none;
		}
	}
	.act {
		background-color: $u-type-primary;
		color: #fff;
	}
}
</style>
