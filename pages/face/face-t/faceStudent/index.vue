<template>
	<view class="face-student u-bg-fff">
		<cp-select-item @confirm="confirmGrade" v-model="gradeTag" :items="gradeList"></cp-select-item>
		<cp-select-item @confirm="confirmClass" v-model="classTag" :items="classList"></cp-select-item>
		<u-popup v-model="dialogShow" mode="bottom">
		</u-popup>
		<u-popup v-model="photoShow" mode="bottom">
			<view class="padd-t20">
				<view class="photo-div" @click="chooseImg">
					<view class="click-photo">点击拍照</view>
					<image :src="baseImg" class="photo-img"></image>
				</view>
				<div class="padd-t20 padd-b20">
					<view class="info">
						<view class="tip">
							<text>注意事项</text>
						</view>
						<view>1. 请确认照片是本人</view>
						<view>2. 请确认露出清晰完整人脸部位</view>
						<view v-if="false">3. 保持光线充足，不要戴眼镜</view>
						<view v-if="false">4. 正对摄像头，不要戴帽子</view>
						<view v-if="false">5. 拍照时不要晃动，保证照片清晰度</view>
					</view>
					<view class="u-fx-ac u-fx-jsa">
						<view class="rule-list u-fx-ac-jc">
							<image class="rule-img" src="/mobile-img/zdsj.png"></image>
							<view>正对手机</view>
						</view>
						<view class="rule-list u-fx-ac-jc">
							<image class="rule-img" src="/mobile-img/gxcz.png"></image>
							<view>光线充足</view>
						</view>
						<view class="rule-list u-fx-ac-jc">
							<image class="rule-img" src="/mobile-img/fmdz.png"></image>
							<view>放慢动作</view>
						</view>
					</view>
				</div>
				<view class="mar-t20 mar-b20 u-fx-jc">
					<u-button @click="photoShow = false">取消</u-button>
					<u-button v-if="oldUrl !== baseImg" @click="uploadImg" type="primary" class="mar-l20">上传头像</u-button>
				</view>
			</view>
		</u-popup>
		<view class="tab-select u-bd-b u-fx-ac">
			<view class="u-fx-f1 u-fx-ac u-fx-jc u-bd-r" @click="gradeTag = true">{{ gradeInfo.label }}<view class="rit-icon"></view></view>
			<view class="u-fx-f1 u-fx-ac u-fx-jc u-bd-r"  @click="classTag = true">{{ classInfo.label }}<view class="rit-icon"></view></view>
		</view>
		<div class="block">
			点击学生头像进行上传和更新操作
		</div>
		<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
			<no-data v-if="studentList.length === 0"></no-data>
			<view @click="showPhoto(list)" class="student-list u-bd-r u-fx-ac-jc" v-for="list in studentList" :key="list.userCode">
				<view>
					<image :src="list.photoUrl || '/mobile-img/child-auto-icon.png'" class="student-img"></image>
				</view>
				<view class="name">{{ list.userName }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { actions, store } from '../store/index.js'
	export default {
		data() {
			return {
				oldUrl: '',
				baseImg: '',
				dialogShow: false,
				photoShow: false,
				gradeTag: false,
				classTag: false,
				gradeInfo: {
					label: '请选择年级'
				},
				classInfo: {
					label: '请选择班级'
				},
				gradeList: [],
				classList: [],
				studentList: []
			}
		},
		components:{
		},
		computed: {
			userInfo: () => store.userInfo
		},
		async mounted () {
			const res = await actions.gradeList({
				schoolCode: this.userInfo.schoolCode
			})
			this.gradeList = res.data.list.map(item => {
				return {
					key: item.code,
					label: item.name
				}
			})
		},
		methods: {
			async uploadImg () {
				try {
					const { userCode } = this.currentStudent
					await actions.updatePhoto({
						schoolCode: this.userInfo.schoolCode,
						userCode,
						photoUrl: this.baseImg
					})
					this.$tools.confirm('上传成功', null, false)
					this.oldUrl = this.baseImg
					this.$tools.goNext(() => {
						this.photoShow = false
					})
					const index = this.studentList.findIndex(item => {
						return item.userCode === userCode
					})
					this.studentList[index].photoUrl = this.baseImg
					this.$forceUpdate()
				} catch(err) {}
			},
			showPhoto (item) {
				this.photoShow = true
				this.currentStudent = item
				this.oldUrl = item.photoUrl || ''
				this.baseImg = item.photoUrl || ''
			},
			chooseImg () {
				this.$tools.choosePhoto(async (baseImg) => {
					this.baseImg = baseImg
				})
			},
			async confirmGrade (item) {
				if (!item) return
				this.gradeInfo = item
				this.classInfo = {
					label: '请选择班级'
				}
				const res = await actions.classList({
					schoolCode: this.userInfo.schoolCode,
					gradeCode: item.key
				})
				if (res.data.list.length > 0) {
					this.schoolYearId = res.data.list[0].schoolYearId
				}
				this.classList = res.data.list.map(item => {
					return {
						key: item.classCode,
						label: item.className
					}
				})
			},
			async confirmClass (item) {
				console.log(item)
				if (!item) {return}
				this.classInfo = item
				const res = await actions.studentList({
					schoolCode: this.userInfo.schoolCode,
					page: 1,
					size: 100,
					gradeId: this.gradeInfo.key,
					classId: item.key,
					schoolYearId: this.schoolYearId
				})
				this.studentList = res.data.list
			}
		}
	}
</script>

<style lang="scss">
	.tab-select {
		height: 80rpx;
		text-align: center;
		color: $u-tips-color;
		.tip {
			width: 38rpx;
			height: 38rpx;
			display: block;
			margin: 0 20rpx;
		}
	}
	.block {
		text-align: center;
		line-height: 75rpx;
		color: $u-tips-color;
		height: 75rpx;
		border-bottom: 1px $u-border-color solid;
	}
	.scroll-h {
		height: calc(100vh - 155rpx);
	}
	.student-list {
		border-bottom: 1px $u-border-color solid;
		float: left;
		width: 25%;
		height: 180rpx;
		.student-img {
			width: 100rpx;
			height: 100rpx;
			display: block;
		}
		.name {
			color: $u-content-color;
			padding-top: 5rpx;
		}
	}
	.photo-div {
		width: 550rpx;
		height: 650rpx;
		margin: 0 auto;
		position: relative;
		background-color: #ccc;
		.click-photo {
			position: absolute;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			color:$u-border-color;
			bottom: 0px;
			letter-spacing: 4rpx;
			z-index: 99;
			text-align: center;
			background: rgba(0,0,0,.4);
		}
		.photo-img {
			width: 550rpx;
			height: 650rpx;
			display: block;
		}
	}
	.rule-list {
		margin-top: 30rpx;
		width: 160rpx;
		padding: 10px 0;
		color: #666;
		font-weight: bold;
		background-color: $u-type-primary-light;
		.rule-img {
			width: 40rpx;
			height: 50rpx;
			display: block;
			margin-bottom: 20rpx;
		}
	}
	.info {
		color: $u-content-color;
		line-height: 60rpx;
		font-size: 30rpx;
		text-indent: 30rpx;
		.tip {
			color: $u-type-error;
			font-size: 34rpx;
			font-weight: bold;
		}
		.tip-demo {
			font-size: 28rpx;
			color: $u-type-warning;
			font-weight: bold;
		}
	}
</style>
