<template>
	<view class="" @tap="closeActive">
		<choose-child v-if="userType === 3" @change="childInfo"></choose-child>
		<view class="top u-fx-jsb u-padd-20">
			<view class="dropdown u-fx">
				<ms-dropdown-menu v-if="userType !== 3 && showClass"><ms-dropdown-item v-model="value0" :list="classList" :title="defTitle"></ms-dropdown-item></ms-dropdown-menu>
			</view>
			<u-icon class="camera u-mar-r10" size="46" name="camera-fill" color="white" @tap="goAdd"></u-icon>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-h">
			<y-refresh ref="mixPulldownRefresh" @refresh="onPulldownReresh">
				<no-data v-if="false" msg="暂无数据,下拉刷新~"></no-data>
				<detail-show :newsList="dataList" :showNewTag="true" @handleComment="handleComment" :userType="userType"></detail-show>
			</y-refresh>
		</scroll-view>
		<!-- 底部聊天输入框-->
		<view class="input-box u-bg-color" v-show="showInput" id="input-box" :style="{ bottom: inputOffsetBottom > 0 ? inputOffsetBottom + 'px' : '0' }">
			<view class="input-box-flex u-fx-ac u-flex-nowrap u-padd-l20 u-padd-r20">
				<view class="input-box-flex-grow">
					<input
						type="text"
						class="content u-bg-fff u-padd-l20 u-padd-r20 u-border-radius"
						id="input"
						v-model="content"
						:adjust-position="false"
						:confirm-type="'send'"
						:confirm-hold="true"
						placeholder-style="color:#DDD;"
						:cursor-spacing="6"
						:placeholder="placeholder"
						:focus="showInput"
						@blur="blurInput"
						@confirm="sendMsg"
					/>
				</view>
				<button class="btn u-mar-l20" type="primary" size="mini" @touchend.prevent="sendMsg">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
import chooseChild from '@/components/choose-child/choose-child.vue';
import eventBus from '@u/eventBus';
import noData from '@/components/no-data/no-data.vue';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import YRefresh from './component/y-Refresh.vue';
import { store, actions } from './store/index.js';
import DetailShow from './component/DetailShow.vue';
export default {
	name: 'ClassHomeWork-t',
	components: {
		msDropdownMenu,
		msDropdownItem,
		YRefresh,
		noData,
		DetailShow,
		chooseChild
	},
	data() {
		return {
			userType: 2, // 1.班主任，2.教职工，3.家长
			showAction: false,
			value0: '',
			classList: [],
			defTitle: '',
			pageList: {
				page: 1,
				size: 20
			},
			morePage: false,
			showClass: false,
			classCode: '',
			schoolYearId: '',
			dataList: [],
			showInput: false,
			placeholder: '',
			content: '',
			inputOffsetBottom: 0, //键盘的高度
			viewOffsetBottom: 0 //视窗距离页面的距离
		};
	},
	watch: {
		value0(val, oldval) {
			if (this.userType === 3) {
				return;
			}
			if (val !== oldval) {
				this.defTitle = this.classList.filter(el => {
					return el.value === val;
				})[0].text;
				this.classCode = val;
				this.showList();
				if (val === store.isBZR.classCode) {
					this.userType = 1;
				} else {
					this.userType = 2;
				}
				console.log(this.userType);
			}
		}
	},
	async created() {
		if (store.userInfo.typeCode === '4') {
			this.userType = 2;
		} else if (store.userInfo.typeCode === '16') {
			this.userType = 3;
		}
		console.log(this.userType);
		this.schoolYearId = store.schoolYear.schoolYearId;
		this.classList = store.teachClassList;
		if (this.classList.length > 0) {
			this.showClass = true;
			this.defTitle = this.classList[0].text;
			this.value0 = this.classList[0].value;
		}
	},
	methods: {
		childInfo(item) {
			if (item.userCode !== this.userCode) {
				this.userCode = item.userCode;
				this.gradeCode = item.gradeCode;
				this.classCode = item.classCode;
				this.showList();
			}
		},
		//下拉刷新
		onPulldownReresh() {
			this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
			this.showList();
		},
		async showList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				...this.pageList,
				schoolCode: store.userInfo.schoolCode,
				classCode: this.classCode,
				schoolYearId: this.schoolYearId
			};
			console.log(req);
			const res = await actions.getClassMotto(req);
			if (tag) {
				this.dataList = this.dataList.concat(res.data.list);
			} else {
				this.dataList = res.data.list;
			}
			this.morePage = res.data.hasNextPage;
		},
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.showList(true);
		},
		//发送消息
		sendMsg() {
			if (!this.$u.trim(this.content)) {
				return;
			}
		},
		//点击评论 唤出输入框和键盘
		handleComment(value) {
			this.showInput = value;
		},
		//关闭键盘 关闭输入框
		closeInputModel() {
			this.showInput = false;
			this.content = '';
			this.circleMegId = '';
			this.commentInfo = {};
			uni.hideKeyboard();
		},
		//失去焦点触发
		blurInput() {
			this.closeInputModel();
		},
		closeActive() {
			this.showAction = false;
		},
		goAdd() {
			this.$tools.actionsheet(
				[
					{
						key: 1,
						label: '照片'
					},
					{
						key: 2,
						label: '视频'
					}
				],
				item => {
					this.$tools.navTo({
						url: `./form?type=${item.key}`
					});
				}
			);
			/* ; */
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	margin-top: -60rpx;
	height: calc(100vh - 80rpx);
}

.top {
	height: 140rpx;
	background: url(/mobile-img/class-circle-top.png) no-repeat;
	background-size: 100% 140rpx;
	position: relative;
	.camera {
		height: 60rpx;
	}
	.dropdown {
		height: 60rpx;
		/deep/ .dropdown-item__selected {
			width: 270rpx;
			height: 60rpx;
			background: url(/mobile-img/class-circle-button.png) no-repeat;
			background-size: 270rpx 60rpx;
			.selected__name {
				color: $u-type-white;
				font-size: $u-font-03;
			}
		}
		/deep/ .iconfont {
			color: $u-type-white;
		}
	}
}
.input-box {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	&-flex {
		height: 100rpx;
		&-grow {
			flex-grow: 1;
			.content {
				height: 60rpx;
				caret-color: $uni-color-success;
			}
		}
		.btn {
			background-color: $u-type-success;
			border: none;
		}
	}
}
</style>
