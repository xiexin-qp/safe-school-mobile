<template>
	<scroll-view scroll-y="true" class="scroll-h bg-fff">
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>学校：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="schoolName" :range="schoolList" @change="chooseSchool">{{ schoolName }}</picker>
			<view class="rit-icon"></view>
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
		<view v-if="false" class="qui-fx-ac qui-bd-b item-list">
			<view>孩子性别：</view>
			<view class="qui-fx-f1 qui-fx-je col-666">
				<radio-group @change="changeRadio">
					<label>
						<radio value="1" checked="true" />
						男
					</label>
					<label class="radio">
						<radio value="2" />
						女
					</label>
				</radio-group>
			</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子学号：</view>
			<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.workNo" placeholder="请输入学号" /></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>亲属关系：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="relationShip" :range="relationShipList" @change="chooseRelation">{{ relationShip }}</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>家长姓名：</view>
			<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.parentName" placeholder="请输入姓名" /></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>手机号：</view>
			<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.mobile" placeholder="请输入手机号" /></view>
		</view>
		<view class="qui-bd-b item-list">
		  <view>上传头像：</view>
		  <view class="qui-fx-f1">
				<an-upload-img total="1" v-model="formData.photoUrl" style="margin: 20rpx"></an-upload-img>
		  </view>
		</view>
		<view v-if="false" class="qui-fx-ac qui-bd-b item-list">
			<view>验证码：</view>
			<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.code" placeholder="请输入验证码" /></view>
			<view class="yzm-btn">获取验证码</view>
		</view>
		<view class="submit-box" @click="register">注册</view>
		<view class="go-login" @click="goLogin">
			已有账号,
			<span class="act">直接登录></span>
		</view>
	</scroll-view>
</template>

<script>
import { store, actions } from './store/index.js'
import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
export default {
	data() {
		return {
			schoolList: [],
			schoolName: '请选择学校',
			gradeList: [],
			gradeName: '请选择年级',
			classList: [],
			className: '请选择班级',
			relationShip: '请选择关系',
			formInfo: {},
			formData: {
				userName: '',
				workNo: '',
				parentName: '',
				mobile: '',
				schoolCode: '',
				gradeCode: '',
				classCode: '',
				relationShip: '',
				// photoUrl: []
			}
		}
	},
	components: {
		anUploadImg
	},
	computed: {
		openid: () => store.openid,
		relationShipList: () => store.relationShipList.map(item => item.relationShip)
	},
	async mounted() {
		const res = await actions.getSchoolList({
			page: 1,
			size: 100
		})
		console.log(res)
		this.schoolTotal = res.data.list
		this.schoolList = res.data.list.map(item => {
			return item.schoolName
		})
	},
	methods: {
		// 返回登录
		goLogin() {
			this.$tools.navTo({
				url: './index',
				title: '平安校园'
			});
		},
		// 选择学校
		async chooseSchool(item) {
			if (this.schoolList.length === 0) return
			const index = item.target.value
			this.schoolName = this.schoolList[index]
			this.formData.schoolCode = this.schoolTotal[index].schoolCode
			const res = await actions.getGradeList({
				schoolCode: this.formData.schoolCode,
				page: 1,
				size: 100
			})
			this.formData.gradeCode = ''
			this.gradeName = '请选择年级'
			this.formData.classCode = ''
			this.className = '请选择班级'
			this.classList = []
			this.gradeTotal = res.data.list
			this.gradeList = res.data.list.map(item => {
				return item.name
			})
		},
		// 选择年级
		async chooseGrade (item) {
			if (this.gradeList.length === 0) return
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
			this.formData.classCode = ''
			this.className = '请选择班级'
			this.classTotal = res.data.list
			this.classList = res.data.list.map(item => {
				return item.className
			})
		},
		// 选择班级
		chooseClass (item) {
			if (this.classList.length === 0) return
			const index = item.target.value
			this.className = this.classList[index]
			this.formData.classCode = this.classTotal[index].classCode
		},
		// 选择关系
		chooseRelation (item) {
			if (this.relationShipList.length === 0) return
			const index = item.target.value
			this.relationShip = this.relationShipList[index]
			this.formData.relationShip = index + 1
		},
		// 注册
		async register () {
			console.log(this.formData)
			for (let key in this.formData) {
				if (!this.formData[key]) {
					this.$tools.toast('请填写完整信息')
					return
				}
			}
			var reg = /^1[3456789]\d{9}$/;
			if (!reg.test(this.formData.mobile)) {
				this.$tools.toast('请输入正确手机号')
				return
			}
			this.formData.photoUrl = ''
			await actions.parentAdd({
				...this.formData,
				openid: this.openid
			})
			this.$tools.toast('注册成功')
			this.$tools.goNext(() => {
				this.$tools.navTo({
					url: './index'
				})
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
