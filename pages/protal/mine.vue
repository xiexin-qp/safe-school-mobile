<template>
	<view class="mine">
		<view class="person-bg qui-fx-jsb" style="background: url(/mobile-img/person-bg-one.png) no-repeat; backgroundSize: 100% 100%">
			<text>{{ userInfo.schoolName }}</text>
			<text>{{ date }}</text>
		</view>
		<view class="person-info">
			<view class="info qui-fx-ac-jc" style="background: url('/mobile-img/person-bg-two.png') no-repeat; backgroundSize: 100% 312rpx">
				<view><image class="person-icon" :src="userInfo.photoUrl || '/mobile-img/person-auto.png'" alt="" /></view>
				<view class="qui-fx-ac">
					<text>{{ userInfo.userName }}</text>
					<text class="tip"></text>
					<text>{{ userInfo.typeName }}</text>
				</view>
			</view>
		</view>
		<view class="person-item">
			<view class="item qui-fx-jsb qui-bd-b">
				<text>手机号：</text>
				<text class="qui-fx-f1 qui-tx-r u-content-color">{{ userInfo.mobile }}</text>
			</view>
		</view>
		<view class="person-item">
			<view class="item qui-fx-jsb qui-bd-b">
				<text>我的身份：</text>
				<text class="qui-fx-f1 qui-tx-r u-content-color" @click="changeType">{{ userInfo.typeName }}</text>
				<view class="rit-icon"></view>
			</view>
			<view class="item qui-fx-jsb qui-fx-ac qui-bd-b">
				<text>当前绑定：</text>
				<text v-if="userInfo.typeCode == 4" class="qui-fx-f1 qui-tx-r u-content-color">{{ classInfo.gradeName || '暂未绑定' }}{{ classInfo.className }}</text>
				<view v-if="userInfo.typeCode == 16" @click="bindChild('1')" class="bind-child">绑定</view>
			</view>
		</view>
		<view v-if="userInfo.typeCode == 16">
			<view v-for="child in childList" :key="child.userCode" class="qui-fx-ac child-list qui-bd-b u-content-color u-bg-fff">
				<image class="img" :src="child.photoUrl" alt="" />
				<view class="qui-fx-f1">
					<view>姓名: {{ child.userName }}</view>
					<view>班级: {{ child.gradeName }}{{ child.className }}</view>
				</view>
			</view>
		</view>
		<view class="mine-btn school" v-if="false">切换学校</view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus'
import { store, setStore, actions } from './store/index.js'
import apiFun from './store/apiFun.js'
export default {
	data() {
		return {
			date: this.$tools.getDateTime().substr(0, 10),
			classInfo: {},
			childList: [],
			typeList: []
		};
	},
	computed: {
		userInfo: () => store.userInfo,
		enjoyParentApp: () => store.enjoyParentApp,
		enjoyTeacherApp: () => store.enjoyTeacherApp
	},
	async mounted() {
		eventBus.$on('getChild', () => {
			this.getChildList()
			apiFun.getMenuList()
		})
		if (this.userInfo.typeCode == 4) {
			this.getClassInfo()
		} else {
			this.getChildList()
		}
		this.getTypeList()
	},
	methods: {
		// 查询用户拥有的身份
		async getTypeList () {
			const res = await actions.getTypeList({
				schoolCode: this.userInfo.schoolCode,
				userCode: this.userInfo.userCode
			})
			this.typeList = res.data
			// 初次进入身份为家长，并且获取身份类型只有家长
			if (this.userInfo.typeCode === '16' && this.typeList.length === 1) {
				this.typeMenuList = []
			} else {
				this.typeMenuList = ['教职工', '家长']
			}
		},
		// 切换身份
		changeType() {
			if (this.typeMenuList.length === 0) return
			this.$tools.actionsheet(this.typeMenuList, index => {
				if (this.typeMenuList[index] === this.userInfo.typeName) return
				if (index === 0) { // 切换教职工
					this.addLog('4', '教职工')
				} else {
					if (this.typeList.length === 1) {
						this.bindChild('0')
					} else {
						this.addLog('16', '家长')
					}
				}
			});
		},
		// 添加登录日志
		async addLog (typeCode, typeName) {
			const { openid, schoolCode, schoolName, userCode, userName } = this.userInfo
			await actions.addLog({
				id: this.userInfo.userId,
				openid,
				schoolCode,
				schoolName,
				typeCode,
				typeName,
				userCode,
				userName
			})
			setStore({
				key: 'userInfo',
				data: {
					...this.userInfo,
					typeCode,
					typeName
				}
			})
			// 切换首页收藏应用
			if (typeCode == '4') {
				this.getClassInfo()
				setStore({
					key: 'enjoyApp',
					data: this.enjoyTeacherApp
				})
			} else {
				this.getChildList()
				setStore({
					key: 'enjoyApp',
					data: this.enjoyParentApp
				})
			}
			apiFun.getMenuList()
		},
		// 绑定孩子
		bindChild (type) {
			this.$tools.navTo({
				title: '绑定孩子',
				url: `./bindChild?type=${type}`
			})
		},
		// 获取绑定的班级信息
		async getClassInfo () {
			const res = await actions.getClassInfo({
				SchoolCode: this.userInfo.schoolCode,
				userType: this.userInfo.typeCode,
				userCode: this.userInfo.userCode
			});
			this.classInfo = res.data;
		},
		// 获取绑定的孩子
		async getChildList () {
			const {schoolCode, userCode, typeCode} = this.userInfo
			const res = await actions.getChildList({
				schoolCode,
				userCode,
				userType: typeCode
			})
			this.childList = res.data
			setStore({
				key: 'childList',
				data: res.data
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.mine {
	.person-bg {
		height: 350rpx;
		color: #fff;
		padding: 30rpx;
	}
	.person-info {
		margin: -220rpx 30rpx 0 30rpx;
	}
	.person-icon {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin-bottom: 20rpx;
		display: block;
	}
	.info {
		height: 312rpx;
		overflow: hidden;
		border-radius: 10rpx;
		z-index: 99;
		.tip {
			display: inline-block;
			border-radius: 100%;
			height: 8rpx;
			width: 8rpx;
			margin: 0 8rpx;
			background-color: #333;
		}
		img {
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			display: block;
			margin-bottom: 20rpx;
		}
	}
}
.person-item {
	margin-top: 20rpx;
	background-color: #fff;
	.item {
		padding: 30rpx 20rpx;
	}
}
.mine-btn {
	border-radius: $radius;
	margin: 30rpx 20rpx;
	height: 75rpx;
	line-height: 75rpx;
	text-align: center;
	color: #fff;
}
.bind-child {
	margin-left: 10rpx;
	background-color: $main-color;
	border-radius: $radius;
	padding: 8rpx 20rpx;
	color:#fff;
}
.child-list {
	.img {
		margin-right: 20rpx;
		width: 120rpx;
		height: 120rpx;
		display: block;
		background-color: #eee;
	}
	line-height: 60rpx;
	padding: 20rpx;
}
.role {
}
.school {
	margin-top: 80rpx;
}
.quit {
}
</style>
