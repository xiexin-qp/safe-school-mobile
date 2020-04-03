<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>被访人学校：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="selector" :value="formData.school" :range="schoolList" @change="chooseSchool">{{ schoolList[formData.school] || '请选择' }}</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>被访人姓名：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.userName" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>被访人手机号：</view>
				<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.phone" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>开始时间：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="time" :value="formData.startTime" @change="startTimeChange">
						<view class="uni-input">{{ formData.startTime }}</view>
					</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>结束时间：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="date" :value="formData.endTime" @change="endTimeChange">
						<view class="uni-input">{{ formData.endTime }}</view>
					</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>来访时长：</view>
				<view class="qui-fx-f1 qui-fx-je">{{ formData.time }}</view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>来访事由：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="selector" :value="formData.cause" :range="cause" @change="chooseCause">{{ cause[formData.cause] || '请选择' }}</picker>
				</view>
				<view>></view>
			</view>
			<view class="log">
				<view class="item-list">
					<view>我的照片：</view>
					<view class="qui-fx-f1"><an-upload-img total="1" v-model="imgList" style="margin: 20rpx"></an-upload-img></view>
					<view class="sub-title">请上传1张本人正脸清晰照片用于来访识别。</view>
				</view>
			</view>
		</scroll-view>
		<view class="common-btn" @click="confirm">提交</view>
	</view>
</template>

<script>
import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			cause: ['家长会', '拜访老师', '看望学生'],
			schoolList: ['武汉一中', '武汉二中', '武汉三中'],
			formInfo: {},
			imgList: [],
			formData: {
				userName: '',
				school: '',
				phone: '',
				isMarry: false,
				startTime: '请选择',
				endTime: '请选择',
				time: '5小时',
				cause: 0
			}
		};
	},
	computed: {},
	async mounted() {},
	methods: {
		confirm() {},
		changeRadio(e) {
			this.formData.sex = e.target.value;
		},
		switch1Change(e) {
			this.formData.isMarry = e.target.value;
		},
		startTimeChange(e) {
			this.formData.startTime = e.target.value;
		},
		endTimeChange(e) {
			this.formData.endTime = e.target.value;
		},
		chooseCause(e) {
			this.formData.cause = e.target.value;
		},
		chooseSchool(e) {
			this.formData.school = e.target.value;
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh - 88rpx);
}
.item-list {
	padding: 25rpx 15rpx;
	background: #fff;
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	color: #999;
}
.radio {
	padding-left: 25rpx;
}
.checkbox {
	padding: 30rpx 10px 10px 2px;
}
.sub-title {
	font-size: 24rpx;
	color: #999;
}
</style>
