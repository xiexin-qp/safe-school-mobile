<template>
	<scroll-view scroll-y="true" class="scroll-h bg-fff">
		<view class="qui-fx-ac qui-bd-b qui-fx-jsb item-list">
			<view>学校：</view>
			<view class="qui-tx-r">{{ schoolName }}</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>年级：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="gradeName" :range="gradeList" @change="chooseGrade">{{ gradeName }}</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>班级：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="className" :range="classList" @change="chooseClass">{{ className }}</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子姓名：</view>
			<view class="qui-fx-f1"><input class="item-input" v-model="formData.userName" placeholder="请输入姓名" /></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子学号：</view>
			<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.workNo" placeholder="请输入学号" /></view>
		</view>
		<view class="submit-box" @click="bindChild">绑定</view>
	</scroll-view>
</template>

<script>
import { store, actions } from './store/index.js';
export default {
	data() {
		return {
			schoolList: [],
			schoolName: '请选择学校',
			gradeList: [],
			gradeName: '请选择班级',
			classList: [],
			className: '请选择年级',
			relationShip: '请选择关系',
			formInfo: {},
			formData: {
				userName: '',
				workNo: '',
				parentName: '',
				mobile: '',
				schoolCode: 'CANPOINT11',
				gradeCode: '',
				classCode: '',
				relationShip: ''
			}
		}
	},
	components: {},
	computed: {
		userInfo: () => store.userInfo,
		relationShipList: () => store.relationShipList.map(item => item.relationShip)
	},
	mounted() {
		this.getGradeList()
	},
	methods: {
		// 获取年级
		async getGradeList () {
			const res = await actions.getGradeList({
				schoolCode: this.formData.schoolCode,
				page: 1,
				size: 100
			})
			this.gradeTotal = res.data.list
			this.gradeList = res.data.list.map(item => {
				return item.name
			})
		},
		// 选择年级
		async chooseGrade (item) {
			const index = item.target.value
			this.gradeName = this.gradeList[index]
			this.formData.gradeCode = this.gradeTotal[index].code
			const res = await actions.getClassList({
				schoolCode: this.formData.schoolCode,
				page: 1,
				size: 100,
				gradeCode: this.formData.gradeCode,
				schoolYearId: ''
			})
			this.classTotal = res.data.list
			this.classList = res.data.list.map(item => {
				return item.className
			})
		},
		// 选择班级
		chooseClass (item) {
			const index = item.target.value
			this.className = this.classList[index]
			this.formData.classCode = this.classTotal[index].classCode
		},
		// 绑定孩子
		async bindChild () {
			console.log(this.formData)
			for (let key in this.formData) {
				if (!this.formData[key]) {
					this.$tools.toast('请填写完整信息')
					return
				}
			}
			await actions.bindChild(this.formData)
			this.$tools.toast('绑定成功')
			this.$tools.goNext(() => {
				this.$tools.goBack()
			})
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: 100vh;
}
.item-list {
	padding: 28rpx 15rpx;
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	color: #666;
	text-align: right;
}
.col-666 {
	color: #999;
}
.radio {
	padding-left: 25rpx;
}
.checkbox {
	padding: 30rpx 10px 10px 2px;
}
.yzm-btn {
	background-color: $main-color;
	height: 60rpx;
	line-height: 60rpx;
	width: 180rpx;
	color: #fff;
	margin-left: 30rpx;
	text-align: center;
	border-radius: 4rpx;
}
.submit-box {
	margin: 50rpx 20rpx;
	text-align: center;
	padding: 0 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	letter-spacing: 8rpx;
	background-color: $main-color;
	color: #fff;
	border-radius: $radius;
}
.go-login {
	text-align: center;
	color: #666;
	padding-bottom: 40rpx;
	letter-spacing: 2rpx;
	.act {
		padding-left: 6rpx;
		color: $main-color;
	}
}
</style>
