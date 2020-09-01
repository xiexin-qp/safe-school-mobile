<template>
	<view class="parent-manage u-page u-fx-ver u-auto">
		<view class="header u-fx-ver u-mar u-type-white-bg u-border-radius-big u-shadow">
			<view class="u-padd-30 u-font-3 u-bold u-type-primary">{{isBZR.gradeName}}{{isBZR.className}}</view>
			<view class="u-fx-ac u-fx-f1">
				<view class="u-fx-f1 u-mar-l40">
					<view class=""><span class="u-bold u-padd-r" style="font-size: 50rpx;">{{sTotal}}</span><span>学生(人)</span></view>
				</view>
			</view>
		</view>
		<view class="u-shadow u-fx-ver u-mar-l u-mar-r u-mar-b u-padd-30 u-type-white-bg u-border-radius tab-box u-fx-f1">
			<view class="">
				<u-subsection @change="change" active-color="#2979ff" :list="typeList" mode="subsection" :current="current"></u-subsection>
			</view>
			<view class="u-fx u-padd u-bold u-font u-type-primary-light-bg u-content-color u-mar-t30">
				<view class="u-fx-f1 u-tx-c">学生</view>
				<view class="u-fx-f1 u-tx-c">性别</view>
				<view class="u-fx-f1 u-tx-c">走住读</view>
				<view class="rit-icon" style="background: none;"></view>
			</view>
			<view class="u-fx-f1">
				<view class="u-pos-box u-scroll-y">
					<no-data v-if="dataList.length === 0"></no-data>
					<view @tap="showDetail(user.userCode)" class="u-fx-ac u-padd u-bd-b" v-for="user in dataList" :key="user.id">
						<view class="u-fx-f1">
							<view class="u-fx-ac">
								<view class="u-border-radius-all u-of u-user-img-small u-mar-r30">
									<image class="u-user-img-small" :src="user.photoUrl"></image>
								</view>
								<text class="u-content-color">{{user.userName || user.studentName}}</text>
							</view>
						</view>
						<view class="u-fx-f1 u-fx-jc">{{$tools.getSex(user.sex)}}</view>
						<view class="u-fx-f1 u-fx-jc u-type-primary">
							<u-tag v-if="user.hasDorm === '1'" text="住读" type="primary" />
							<u-tag v-if="user.hasDorm === '0'" text="走读" type="warning" />
						</view>
						<view class="rit-icon"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { store, actions } from './store/index.js'
export default {
	computed: {
		isBZR: () => store.isBZR,
		userInfo: () => store.userInfo,
		schoolYearId: () => store.schoolYear.schoolYearId,
	},
	data() {
		return {
			detail: {},
			current: 0,
			sTotal: 0,
			dataList: [],
			typeList: [
				{
					name: '全部'
				},
				{
					name: '走读'
				},
				{
					name: '住读'
				}
			]
		};
	},
	async mounted() {
		const sRes = await actions.getStudentList({
			classId: this.isBZR.classCode,
			gradeId: this.isBZR.gradeCode,
			schoolYearId: this.schoolYearId,
			page: 1,
			size: 100,
			schoolCode: this.userInfo.schoolCode,
		})
		this.autoList = sRes.data.list
		this.dataList = sRes.data.list
		this.sTotal = this.dataList.length
	},
	methods: {
		/**
		 * @description 学生详情页
		 * @param {object} item 学生详情   
		 */
		showDetail (userCode) {
			this.$tools.navTo({
				url: './detail?userCode=' + userCode,
				title: '学生详情'
			})
		},
		/**
		 * @description 点击切换tab栏
		 * @param {number} index 点击tab栏的索引
		 */
		change (index) {
			if (index === 0) {
				this.dataList = JSON.parse(JSON.stringify(this.autoList))
			} else if (index === 1) {
				this.dataList = this.autoList.filter(item => {
					return parseInt(item.hasDorm) === 0
				})
			} else {
				this.dataList = this.autoList.filter(item => {
					return parseInt(item.hasDorm) === 1
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.parent-manage {
		.header {
			height: 288rpx;
			background: #fff url('./images/class-bg.png') no-repeat;
			background-size: 100% 288rpx;
		}
		.bg-header {
			height: 240rpx;
			background-size: 100% 240rpx;
		}
	}
</style>
