<template>
	<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
		<view v-if="isSchool" class="u-fx-ac u-bd-b item-list">
			<view>学校：</view>
			<picker class="u-fx-f1 u-tx-r col-666" mode="selector" :value="schoolName" :range="schoolList" @change="chooseSchool">
				<span class="u-content-color">{{ schoolName }}</span>
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>年级：</view>
			<picker class="u-fx-f1 u-tx-r col-666" mode="selector" :value="gradeName" :range="gradeList" @change="chooseGrade">
				<span class="u-content-color">{{ gradeName }}</span>
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>班级：</view>
			<picker class="u-fx-f1 u-tx-r col-666" mode="selector" :value="className" :range="classList" @change="chooseClass">
			  <span class="u-content-color">{{ className }}</span>
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>孩子姓名：</view>
			<view class="u-fx-f1"><input class="item-input" v-model="formData.userName" placeholder="请输入姓名" /></view>
		</view>
		<view v-if="false" class="u-fx-ac u-bd-b item-list">
			<view>孩子性别：</view>
			<view class="u-fx-f1 u-fx-je col-666">
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
		<view class="u-fx-ac u-bd-b item-list">
			<view>孩子学号：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.workNo" placeholder="请输入学号" /></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>亲属关系：</view>
			<picker class="u-fx-f1 u-tx-r col-666" mode="selector" :value="relationShip" :range="relationShipList" @change="chooseRelation">
				<span class="u-content-color">{{ relationShip }}</span>
		  </picker>
			<view class="rit-icon"></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>家长姓名：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.parentName" placeholder="请输入姓名" /></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>手机号：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.mobile" placeholder="请输入手机号" /></view>
		</view>
		<view class="u-fx-ac u-bd-b item-list">
			<view>验证码：</view>
			<view class="u-fx-f1 u-fx-je"><input class="item-input" v-model="formData.captchaCode" placeholder="请输入验证码" /></view>
			<view class="yzm-btn" @tap="getCode">{{ total === 60 ? '获取验证码' : total + 'S' }}</view>
		</view>
		<view class="u-bd-b item-list">
		  <view>上传头像：</view>
		  <view class="u-fx-f1 u-mar-t">
				<div class="upload-user-img" @click="chooseImg">
					<image v-if="formData.photoUrl" :src="formData.photoUrl" class="upload-user-img"></image>
					<view v-if="!formData.photoUrl" class="upload-user-img">+</view>
				</div>
		  </view>
		</view>
		<view class="btn-mar">
			<u-button type="primary" @click="register">注册</u-button>
		</view>
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
			total: 60,
			isSchool: false,
			schoolList: [],
			schoolName: '请选择学校',
			gradeList: [],
			gradeName: '请选择年级',
			classList: [],
			className: '请选择班级',
			relationShip: '请选择关系',
			formInfo: {},
			formData: {
				captchaCode: '',
				userName: '',
				workNo: '',
				parentName: '',
				mobile: '',
				schoolCode: '',
				gradeCode: '',
				classCode: '',
				relationShip: '',
				photoUrl: ''
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
		const schoolCode = uni.getStorageSync('schoolCode')
		if (schoolCode) {
			this.chooseSchool(schoolCode)
		} else {
			this.isSchool = true
			const res = await actions.getSchoolList({
				page: 1,
				size: 100
			})
			this.schoolTotal = res.data.list
			this.schoolList = res.data.list.map(item => {
				return item.schoolName
			})
		}
	},
	methods: {
		// 上传图片
		chooseImg () {
			this.$tools.choosePhoto((baseImg) => {
				this.formData.photoUrl = baseImg
			})
		},
		// 返回登录
		goLogin() {
			this.$tools.navTo({
				url: './index',
				title: '平安校园'
			});
		},
		// 选择学校
		async chooseSchool(item) {
			if (typeof item === 'string') {
				this.formData.schoolCode = item
			} else {
				if (this.schoolList.length === 0) return
				const index = item.target.value
				this.schoolName = this.schoolList[index]
				this.formData.schoolCode = this.schoolTotal[index].schoolCode
			}
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
		async getCode() {
			if (!this.formData.mobile || !/^1[3456789]\d{9}$/.test(this.formData.mobile)) {
				this.$tools.toast('请输入正确手机号')
				return
			}
			if (this.total != 60) return
			try {
				await actions.getCode(this.formData.mobile)
				this.$tools.toast('获取成功')
				this.timer = setInterval(() => {
					this.total--
					if (this.total <= 0) {
						this.total = 60
						clearInterval(this.timer)
					}
				}, 1000)
			} catch (err) {
				this.$tools.toast('获取失败')
			}
		},
		// 注册
		async register () {
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
			const photoUrl = this.formData.photoUrl.length > 0 ? this.formData.photoUrl[0].split(',')[1] : ''
			await actions.parentAdd({
				...this.formData,
				photoUrl,
				openid: this.openid
			})
			this.$tools.toast('注册成功')
			this.$tools.goNext(() => {
				this.$tools.goBack()
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: 100vh;
}
.item-list {
	padding: 28rpx 15rpx;
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	text-align: right;
	color: $u-content-color;
}
.radio {
	padding-left: 25rpx;
}
.checkbox {
	padding: 30rpx 10px 10px 2px;
}
.yzm-btn {
	background-color: $u-type-primary;
	height: 60rpx;
	line-height: 60rpx;
	width: 180rpx;
	color: #fff;
	margin-left: 30rpx;
	text-align: center;
	border-radius: 4rpx;
}
.btn-mar {
	margin: 40rpx 20rpx;
}
.go-login {
	text-align: center;
	color: #666;
	padding-bottom: 40rpx;
	letter-spacing: 2rpx;
	.act {
		padding-left: 6rpx;
		color: $u-type-primary;
	}
}
</style>
