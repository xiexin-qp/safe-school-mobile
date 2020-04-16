<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
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
					<picker mode="date" :value="formData.startDate" @change="dateChange($event, 'startDate')">
						<view class="uni-input">{{ formData.startDate }}</view>
					</picker>
				</view>
				<view class="qui-fx-je" style="margin-left:10rpx">
					<picker mode="time" :value="formData.startTime" @change="dateChange($event, 'startTime')">
						<view class="uni-input">{{ formData.startTime }}</view>
					</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>结束时间：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="date" :value="formData.endDate" @change="dateChange($event, 'endDate')">
						<view class="uni-input">{{ formData.endDate }}</view>
					</picker>
				</view>
				<view class="qui-fx-je" style="margin-left:10rpx">
					<picker mode="time" :value="formData.endTime" @change="dateChange($event, 'endTime')">
						<view class="uni-input">{{ formData.endTime }}</view>
					</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>来访时长：</view>
				<view class="qui-fx-f1 qui-fx-je">{{ formData.duration }}</view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>来访事由：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="selector" :value="formData.cause" :range="casueNameList" @change="chooseCause">{{ casueNameList[formData.cause] || '请选择' }}</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>来访地址：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.address" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<!-- <view class="log">
				<text>邀请函</text>
				<view class="qui-fx-ac">
					<icon type="email" size="24" />
					<view class="qui-fx-ver">
						<text>访客,您好！</text>
						<text>学校邀约人姓名邀请你于开始时间至结束时间来访进行来访事由，地址：手动填写。</text>
						<text>请准时到达，如有问题请联系邀约人姓名邀约人手机号。</text>
					</view>
				</view>
			</view> -->
		</scroll-view>
		<view class="common-btn" @click="confirm">提交</view>
	</view>
</template>

<script>
import { store, actions } from '../store/index.js';
export default {
	data() {
		return {
			casueNameList: [],
			casueList: [],
			id: '',
			formInfo: {},
			formData: {
				userName: '',
				phone: '',
				startDate: this.$tools.getDateTime(new Date(), 'date'),
				startTime: this.$tools.getDateTime(new Date(), 'time'),
				endDate: this.$tools.getDateTime(new Date(), 'date'),
				endTime: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'time'),
				duration: '2小时',
				cause: 0,
				address: '',
				accessStartTime: '',
				accessEndTime: ''
			}
		};
	},
	onLoad(options) {
		this.id = options.id;
	},
	computed: {},
	created() {
		this.getCause();
	},
	async mounted() {
		if (this.id) {
			const res = await actions.getInviteDetail(this.id);
			if (!res.data) {
				return;
			}
			this.formData.userName = res.data.visitorName;
			this.formData.address = res.data.address;
			this.formData.phone = res.data.visitorMobile;
			this.formData.duration = res.data.duration + '小时';
			this.formData.startDate = this.$tools.getDateTime(res.data.accessStartTime).split(' ')[0];
			this.formData.startTime = this.$tools.getDateTime(res.data.accessStartTime).split(' ')[1];
			this.formData.endDate = this.$tools.getDateTime(res.data.accessEndTime).split(' ')[0];
			this.formData.endTime = this.$tools.getDateTime(res.data.accessEndTime).split(' ')[1];
			this.casueNameList.forEach((item, i) => {
				if (item === res.data.causeName) {
					this.formData.cause = i;
				}
			});
		}
	},
	methods: {
		async getCause() {
			const req = {
				schoolCode: store.schoolCode,
				pageNum: 1,
				pageSize: 100
			};
			const res = await actions.getCauseList(req);
			if (res.data.list.length === 0) {
				return;
			}
			res.data.list.forEach(ele => {
				this.casueNameList.push(ele.causeName);
				this.casueList.push({
					text: ele.causeName,
					value: ele.id
				});
			});
		},
		confirm() {
			this.formData.accessStartTime = this.formData.startDate + ' ' + this.formData.startTime;
			this.formData.accessEndTime = this.formData.endDate + ' ' + this.formData.endTime;
			console.log(this.formData);
			if (this.formData.userName === '') {
				this.$tools.toast('请填写访客姓名');
			} else if (this.formData.phone === '') {
				this.$tools.toast('请填写访客手机号');
			} else if (!/^1[3456789]\d{9}$/.test(this.formData.phone)) {
				this.$tools.toast('请填写正确手机号');
			} else if (this.formData.cause === '') {
				this.$tools.toast('请选择来访事由');
			} else if (new Date(this.formData.accessEndTime).getTime() <= new Date(this.formData.accessStartTime).getTime()) {
				this.$tools.toast('请选择正确时间段');
			} else {
			}
		},
		dateChange(e, type) {
			if (type === 'startDate') {
				this.formData.startDate = e.target.value;
			} else if (type === 'startTime') {
				this.formData.startTime = e.target.value;
			} else if (type === 'endDate') {
				this.formData.endDate = e.target.value;
			} else if (type === 'endTime') {
				this.formData.endTime = e.target.value;
			}
			this.formData.accessStartTime = this.formData.startDate + ' ' + this.formData.startTime;
			this.formData.accessEndTime = this.formData.endDate + ' ' + this.formData.endTime;
			console.log(new Date(this.formData.accessStartTime).getTime());
			this.formData.duration =
				parseInt(Math.ceil(new Date(this.formData.accessEndTime).getTime() - new Date(this.formData.accessStartTime).getTime()) / 1000 / 60 / 60) + '小时';
		},
		chooseCause(e) {
			this.formData.cause = e.target.value;
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
.log {
	background: #fff;
	padding: 40rpx 20rpx;
	margin: 20rpx 0 40rpx 0;
	border-bottom: 1px solid #ddd;
}
</style>
