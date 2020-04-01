<template>
	<view>
		<scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>访客姓名：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.userName" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>访客手机：</view>
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
			  <text>邀请函</text>
			  <view class="qui-fx-ac">
			    <icon type="email" size="24"/>
			    <view class="qui-fx-ver">
			      <text>访客,您好！</text>
			      <text>学校邀约人姓名邀请你于开始时间至结束时间来访进行来访事由，地址：手动填写。</text>
			      <text>请准时到达，如有问题请联系邀约人姓名邀约人手机号。</text>
			    </view>
			  </view>
			</view> 
		</scroll-view>
		<view class="submit-box"><view class="btn" @click="confirm">提交</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cause: ['家长会', '拜访老师', '看望学生'],
			formInfo: {},
			formData: {
				userName: '',
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
		confirm() {
			this.$tools.confirm('确定删除吗', () => {
				console.log(4);
			});
		},
		actionsheet() {
			const arr = ['苹果', '梨子', '香蕉'];
			this.$tools.actionsheet(['苹果', '梨子', '香蕉'], index => {
				console.log(arr[index]);
			});
		},
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
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh - 100rpx);
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
.log{
      background: #fff;
      padding: 40rpx 20rpx;
      margin: 20rpx 0 40rpx 0;
      border-bottom: 1px solid #ddd;
    }
.submit-box {
	height: 100rpx;
	.btn {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		letter-spacing: 8rpx;
		margin: 0 20rpx;
		background-color: $main-color;
		color: #fff;
		border-radius: $radius;
	}
}
</style>
