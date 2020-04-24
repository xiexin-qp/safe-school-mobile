<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="qui-fx-ac qui-bd-b item-list">
				<view class="tip">被访人学校：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker :disabled="disabledTag" mode="selector" :value="formData.school" :range="schoolNameList" @change="chooseSchool">
						{{ schoolNameList[formData.school] || '请选择' }}
					</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view class="tip">被访人姓名：</view>
				<view class="qui-fx-f1"><input :disabled="disabledTag" class="item-input" v-model="formData.visitorName" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view class="tip">被访人手机号：</view>
				<view class="qui-fx-f1 qui-fx-je"><input :disabled="disabledTag" class="item-input" v-model="formData.phone" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view class="tip">预计到达时间：</view>
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
				<view class="tip">来访事由：</view>
				<view class="qui-fx-f1 qui-fx-je">
					<picker mode="selector" :value="formData.cause" :range="causeNameList" @change="chooseCause">{{ causeNameList[formData.cause] || '请选择' }}</picker>
				</view>
				<view>></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>随行人数：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.togetherNum" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="log">
				<view class="item-list">
					<view class="tip">我的照片：</view>
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
import { store, actions } from '../store/index.js';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			disabledTag: false,
			causeNameList: [],
			causeList: [],
			schoolNameList: [],
			schoolList: [],
			id: '',
			defaultDate: '',
			type: '', // 0-修改  1-再次邀约
			formInfo: {},
			imgList: [],
			formData: {
				school: 0,
				visitorName: '',
				phone: '',
				startDate: this.$tools.getDateTime(new Date(), 'date'),
				startTime: this.$tools.getDateTime(new Date(), 'time'),
				endDate: this.$tools.getDateTime(new Date(), 'date'),
				endTime: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'time'),
				duration: '2小时',
				cause: '',
				accessStartTime: '',
				accessEndTime: '',
				togetherNum: 0
			}
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.type = options.id;
	},
	computed: {},
	created() {
		// this.defaultDate = this.$tools.getDateTime(new Date(), 'date')
		console.log(this.defaultDate)
	},
	async mounted() {
		await this.getSchool();
		this.getCause()
		if (this.id) {
			const res = await actions.getInviteDetail(this.id);
			if (!res.data.id) {
				return;
			}
			this.disabledTag = true;
			this.formData.visitorName = res.data.visitorName;
			this.formData.address = res.data.address;
			this.formData.phone = res.data.visitorMobile;
			this.formData.duration = res.data.duration + '小时';
			this.formData.startDate = this.$tools.getDateTime(res.data.accessStartTime).split(' ')[0];
			this.formData.startTime = this.$tools.getDateTime(res.data.accessStartTime).split(' ')[1];
			this.formData.endDate = this.$tools.getDateTime(res.data.accessEndTime).split(' ')[0];
			this.formData.endTime = this.$tools.getDateTime(res.data.accessEndTime).split(' ')[1];
			this.formData.cause = this.causeNameList.findIndex(item => {
				return item === res.data.causeName;
			});
		}
	},
	methods: {
		async getSchool() {
			const res = await actions.getSchoolList(store.userInfo.userCode);
			if (!res.data) {
				this.$tools.toast('请绑定学校');
				return;
			}
			res.data.forEach(ele => {
				this.schoolNameList.push(ele.schoolName);
				this.schoolList.push({
					text: ele.schoolName,
					value: ele.schoolCode
				});
			});
			
		},
		async getCause() {
			if (!this.schoolList[this.formData.school]) {
				this.$tools.toast('请选择拜访学校');
			}
			const req = {
				schoolCode: this.schoolList[this.formData.school].value
			};
			const res = await actions.getCauseList(req);
			if (res.data.list.length === 0) {
				return;
			}
			res.data.list.forEach(ele => {
				this.causeNameList.push(ele.causeName);
				this.causeList.push({
					text: ele.causeName,
					value: ele.id
				});
			});
		},
		async confirm() {
			this.formData.accessStartTime = this.formData.startDate + ' ' + this.formData.startTime;
			this.formData.accessEndTime = this.formData.endDate + ' ' + this.formData.endTime;
			console.log(this.formData);
			if (this.formData.school === '') {
				this.$tools.toast('请选择被访人学校');
			} else if (this.formData.visitorName === '') {
				this.$tools.toast('请填写被访人姓名');
			} else if (this.formData.phone === '') {
				this.$tools.toast('请填写被访人手机号');
			} else if (!/^1[3456789]\d{9}$/.test(this.formData.phone)) {
				this.$tools.toast('请填写正确手机号');
			} else if (this.formData.cause === '') {
				this.$tools.toast('请选择来访事由');
			} else if (new Date(this.formData.accessStartTime).getTime() < new Date().getTime()) {
				this.$tools.toast('请填写正确到达时间');
			} else if (this.imgList.length === 0) {
				this.$tools.toast('请上传照片');
			} else {
				let school = this.schoolList.filter(ele => {
					return ele.text === this.schoolNameList[this.formData.school];
				})[0];
				console.log(school);
				if (!school) {
					this.$tools.toast('请选择被访人学校');
					return;
				}
				let cause = this.causeList.filter(ele => {
					return ele.text === this.causeNameList[this.formData.cause];
				})[0];
				console.log(cause);
				if (!cause) {
					this.$tools.toast('请选择来访事由');
					return;
				}
				let yzreq = {
					mobile: this.formData.phone,
					schoolCode: school.value
				};
				actions.verifUser(yzreq).then(res => {
					if (!res.data) {
						this.$tools.toast('该手机号不是该校教职工');
						return;
					}
					const req = {
						schoolCode: school.value,
						schoolName: school.text,
						accessStartTime: new Date(this.formData.accessStartTime),
						respondentName: this.formData.visitorName,
						resMobile: this.formData.phone,
						togetherNum: this.formData.togetherNum,
						visitorMobile: store.userInfo.mobile,
						visitorName: store.userInfo.userName,
						causeId: cause.value,
						causeName: cause.text,
						id: this.type === '0' ? this.id : null,
						type: '0',
						respondentType: '1'
					};
					console.log(req);
					actions.addInviteInfo(req).then(res => {
						this.$tools.toast('提交成功', 'success');
						this.$tools.goNext(() => {
							this.$tools.navTo({
								url: './index',
								title: '来访邀约'
							});
						});
					});
				});
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
			this.formData.duration = parseInt(Math.ceil(new Date(this.formData.accessEndTime).getTime() - new Date(this.formData.accessStartTime).getTime()) / 1000 / 60 / 60) + '小时';
		},
		chooseSchool(e) {
			if (!e.target) {
				return;
			}
			this.formData.school = e.target.value;
			this.getCause();
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
.tip::before {
	position: absolute;
	content: '*';
	color: red;
	left: 10rpx;
	width: 10rpx;
	height: 10rpx;
}
.item-list {
	padding: 25rpx 10rpx 25rpx 30rpx;
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
	padding: 40rpx 0rpx;
	margin: 20rpx 0 40rpx 0;
	border-bottom: 1px solid #ddd;
}
</style>
