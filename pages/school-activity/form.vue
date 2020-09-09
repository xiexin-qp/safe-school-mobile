<template>
	<view class="u-page u-bg-fff">
		<u-popup v-model="showPopTag" mode="center" border-radius="14" width="90%" height="80%">
			<choose-control :type="type" :schoolCode="schoolInfo.schoolCode" :bindList="controlList" @close="popclose" @confirm="popselcet"></choose-control>
		</u-popup>
		<u-picker @confirm="changeTime" v-model="signDateTag" mode="time" :params="params"></u-picker>
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">活动主题：</view>
				<view class="u-fx-f1 mar-r20">
					<input :disabled="type === '1'" class="item-input" maxlength="20" v-model="formData.remark" style="text-align: right;" placeholder="请输入活动主题" />
				</view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">活动地点：</view>
				<view class="u-fx-f1 mar-r20">
					<input :disabled="type === '1'" class="item-input" maxlength="10" v-model="formData.placeName" style="text-align: right;" placeholder="请输入活动地点" />
				</view>
			</view>
			<view class="u-bd-b item-list">
				<view class="tip mar-b20">活动时间：</view>
				<view class="u-fx-jsa u-padd-t u-fx-ac" v-for="(item, index) in timeList" :key="index">
					<picker :disabled="type === '1'" mode="date" :value="item.date" :start="startDate" :end="endDate" @change="changeDate([...arguments, 1, index])">
						<view class="date u-fx-jc">
							<view class="uni-input">{{ item.date }}</view>
						</view>
					</picker>
					<picker :disabled="type === '1'" mode="time" :value="item.startTime" @change="changeDate([...arguments, 2, index])">
						<view class="date u-fx-jc">
							<view class="uni-input">{{ item.startTime }}</view>
						</view>
					</picker>
					<view class="">至</view>
					<picker :disabled="type === '1'" mode="time" :value="item.startTime" @change="changeDate([...arguments, 3, index])">
						<view class="date u-fx-jc">
							<view class="uni-input">{{ item.endTime }}</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="u-fx u-bd-b item-list">
				<view class="tip">活动内容：</view>
				<view class="u-fx-f1 mar-r20" v-if="type !== '1'">
					<textarea
						:auto-height="true"
						:disabled="type === '1'"
						class="item-input u-content-color"
						maxlength="100"
						v-model="formData.content"
						style="text-align: right;"
						placeholder="请输入活动内容"
					/>
				</view>
				<view v-else class="u-fx-f1 u-fx-je">{{ formData.content }}</view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">活动发布:</view>
				<view @click="showPopTag = true" class="u-fx-f1 u-fx-je u-content-color">{{ controlTitle }}</view>
				<view class="rit-icon"></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>开启学生报名：</view>
				<view class="u-fx-f1 u-fx-je"><u-switch :disabled="type === '1'" v-model="formData.isSign"></u-switch></view>
			</view>
			<view v-if="formData.isSign" class="u-fx-ac u-bd-b item-list">
				<view class="tip">报名截止时间:</view>
				<view class="u-fx-f1 u-fx-je u-content-color" @click="signDateTag = true">{{ formData.signEnddate }}</view>
				<view class="rit-icon"></view>
			</view>
		</scroll-view>
		<view v-if="type !== '1'" class="submit-btn"><u-button type="primary" @click="submitForm">提交</u-button></view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import validateForm from '@u/validate';
import ChooseControl from '@/components/choose-control/choose-control.vue';
import { store, actions } from './store/index.js';
const yzForm = {
	remark: '请输入活动主题',
	placeName: '请输入活动地点',
	content: '请输入活动内容'
};
export default {
	components: {
		ChooseControl
	},
	data() {
		return {
			canClick: true,
			signDateTag: false,
			showPopTag: false,
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: false
			},
			formData: {
				remark: '',
				isSign: false,
				content: '',
				date: '请选择日期',
				placeName: '',
				signEnddate: '请选择报名截止日期'
			},
			timeList: [],
			controlList: [],
			type: '', // 0新增 1查看 2编辑
			controlTitle: '请选择',
			schoolInfo: {
				schoolYearId: 0,
				schoolCode: ''
			}
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	created() {
		this.schoolInfo.schoolCode = store.userInfo.schoolCode;
		this.schoolInfo.schoolYearId = store.schoolYear ? store.schoolYear.schoolYearId : '';
		this.type = this.$tools.getQuery().get('type');
		this.id = this.$tools.getQuery().get('id');
		if (this.type !== '0') {
			this.showData();
		} else {
			this.timeList = [{ date: this.$tools.getDateTime(new Date(), 'date'), startTime: '请选择时间', endTime: '请选择时间' }];
		}
	},
	methods: {
		// 表单回填
		async showData() {
			const res = await actions.reserveDetail(this.id);
			this.formData.placeName = res.data.placeName;
			this.timeList = [
				{
					date: this.$tools.getDateTime(res.data.reserveDate, 'date'),
					startTime: res.data.startTime,
					endTime: res.data.endTime
				}
			];
			this.formData.remark = res.data.description;
			this.formData.content = res.data.content;
			this.formData.isSign = res.data.openSign === '1';
			this.controlList = res.data.placeReserveDeviceList;
			this.controlTitle = `已选择${this.controlList.length}个设备`;
		},
		changeTime(item) {
			this.formData.signEnddate = `${item.year}-${item.month}-${item.day} ${item.hour}:${item.minute}`;
		},
		changeAddress(item) {
			this.formData.addressTag = item;
			if (item === 2) {
				this.timeList = [{ date: this.$tools.getDateTime(new Date(), 'date'), startTime: '请选择时间', endTime: '请选择时间' }];
			} else {
				this.timeList = [];
			}
		},
		popclose() {
			this.showPopTag = false;
		},
		popselcet(data) {
			this.controlList = data.map(el => {
				return {
					deviceName: el.deviceName,
					deviceSn: el.deviceSn
				};
			});
			this.controlTitle = `已选择${this.controlList.length}个设备`;
			this.showPopTag = false;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		changeDate([e, type, index]) {
			if (type === 1) {
				this.timeList[index].date = e.target.value;
			} else {
				console.log(this.timeList[index].date);
				console.log(this.$tools.getDateTime(new Date(), 'date'));
				if (
					this.timeList[index].date === this.$tools.getDateTime(new Date(), 'date') &&
					new Date(this.timeList[index].date + ' ' + e.target.value).getTime() < new Date().getTime()
				) {
					e.target.value = this.$tools.getDateTime(new Date(), 'time');
				}
				if (type === 2) {
					this.timeList[index].startTime = e.target.value;
				} else if (type === 3) {
					this.timeList[index].endTime = e.target.value;
				}
			}
		},
		// 验证时间
		yzTime(data) {
			const arr = [];
			let isOverLap = 1;
			data.forEach(ele => {
				if (ele.startTime === '请选择时间' || ele.endTime === '请选择时间') {
					isOverLap = 4;
					return false;
				}
				arr.push({
					startTime: new Date(`${ele.date} ${ele.startTime}`),
					endTime: new Date(`${ele.date} ${ele.endTime}`)
				});
			});
			const tempList = [];
			arr.forEach((item, index) => {
				// 转换为时间戳
				const startTimeStamp = item.startTime.getTime();
				const endTimeStamp = item.endTime.getTime();
				if (startTimeStamp >= endTimeStamp) {
					isOverLap = 3;
				}
			});
			return isOverLap;
		},
		submitForm() {
			if (!this.canClick) {
				return;
			}
			validateForm(yzForm, this.formData, () => {
				if (this.formData.room === '请选择' && this.formData.addressTag === 1) {
					this.$tools.toast('请选择活动场地');
					return;
				}
				if (this.yzTime(this.timeList) === 4) {
					this.$tools.toast('请选择活动时间');
					return;
				}
				if (this.yzTime(this.timeList) === 3) {
					this.$tools.toast('开始时间不能大于结束时间');
					return;
				}
				if (this.controlList.length === 0) {
					this.$tools.toast('请选择设备');
					return;
				}
				if (this.formData.isSign && this.formData.signEnddate === '请选择报名截止日期') {
					this.$tools.toast('请选择报名截止日期');
					return;
				}
				this.canClick = false;
				const req = {
					schoolCode: store.userInfo.schoolCode,
					createName: store.userInfo.userName,
					createCode: store.userInfo.userCode,
					placeName: this.formData.placeName,
					description: this.formData.remark,
					content: this.formData.content,
					placeReserveDateDtoList: {
						reserveDate: this.timeList[0].date,
						startTime: this.timeList[0].startTime,
						endTime: this.timeList[0].endTime
					},
					placeReserveDeviceList: this.controlList,
					openSign: this.formData.isSign ? '1' : '2',
					type: '3'
				};
				if (this.formData.isSign) {
					req.signEnddate = this.formData.signEnddate;
				}
				if (this.type === '2') {
					req.id = this.id;
				}
				console.log(req);
				actions
					.addReserve(req)
					.then(res => {
						console.log(res);
						this.canClick = true;
						this.$tools.toast('发布成功', 'success');
						this.$tools.goNext(() => {
							eventBus.$emit('getList');
							this.$tools.goBack();
						});
					})
					.catch(err => {
						this.canClick = true;
						console.log(err);
					});
			});
		},
		goBack() {
			eventBus.$emit('getList');
			this.$tools.goBack();
		},
		addTime(tag, index) {
			console.log(index);
			if (tag) {
				if (index > 1) {
					this.$tools.toast('最多添加三个时段');
					return;
				}
				this.timeList.push({ date: this.$tools.getDateTime(new Date(), 'date'), startTime: '请选择时间', endTime: '请选择时间' });
			} else {
				if (this.timeList.length === 1) {
					this.$tools.toast('已经是最后一项了');
					return;
				}
				this.timeList.splice(index, 1);
				console.log(this.timeList);
			}
		}
	}
};
</script>

<style lang="scss">
.u-bg-fff {
	background-color: $uni-bg-color;
}
.scroll-h {
	height: calc(100vh - 120rpx);
}
.item-list {
	padding: 25rpx 15rpx 25rpx 25rpx;
	.tip::before {
		position: absolute;
		z-index: 99;
		content: '*';
		top: 30rpx;
		color: red;
		font-weight: bold;
		left: 8rpx;
	}
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	color: $u-content-color;
}
.radio-mar {
	padding-left: 35rpx;
}
.item-text-area {
	height: 120rpx;
	width: 100%;
	line-height: 40rpx;
	padding-top: 15rpx;
	color: $u-content-color;
	font-size: 24rpx;
}
.checkbox {
	padding: 30rpx 10px 10px 2px;
}
.submit-btn {
	height: 120rpx;
	padding: 20rpx;
}
.date {
	padding: 10rpx 20rpx;
	border: 1rpx solid $u-border-color;
	border-radius: 8rpx;
	margin: 10rpx 0;
}
.action {
	width: 100rpx;
}
.sign-list {
	margin: 20rpx 0 0 0;
	.day {
		border-radius: 8rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: $u-type-primary;
		color: $uni-bg-color;
		font-size: 24rpx;
		view:first-child {
			font-size: 34rpx;
		}
	}
	.box {
		width: calc(100% - 120rpx);
		margin-left: 18rpx;
		.list {
			font-size: 24rpx;
			padding: 10rpx 20rpx;
			border: 1rpx solid $u-border-color;
			border-radius: 8rpx;
			margin: 0 10rpx 20rpx 10rpx;
			float: left;
			min-height: 110rpx;
			min-width: 176rpx;
		}
	}
}
.mar-lt10 {
	margin: 10rpx 0 0 10rpx;
}
.u-icon-40 {
	width: 40rpx;
	height: 40rpx;
}
.u-icon-36 {
	width: 36rpx;
	height: 36rpx;
}
</style>
