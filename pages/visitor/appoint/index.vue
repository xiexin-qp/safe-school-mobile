<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>访客姓名：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.visitorName" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="qui-fx-ac qui-bd-b item-list">
				<view>访客手机号：</view>
				<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.visitorMobile" style="text-align: right;" placeholder="请输入" /></view>
			</view>

			<view class="item-list qui-bd-b">
				<view>访客照片：</view>
				<view class="qui-fx-f1"><an-upload-img total="1" v-model="imgList" style="margin: 20rpx"></an-upload-img></view>
				<view class="sub-title">请上传1张本人正脸清晰照片用于来访识别。</view>
			</view>

			<view class="qui-fx-ac qui-bd-b item-list">
				<view>随行人数：</view>
				<view class="qui-fx-f1"><input class="item-input" v-model="formData.togetherNum" style="text-align: right;" placeholder="请输入" /></view>
			</view>
			<view class="log">
				<view class="qui-fx-ac qui-bd-b item-list">
					<view>被访人学校：</view>
					<view class="qui-fx-f1 qui-fx-je">
						<picker mode="selector" :value="formData.school" :range="schoolNameList" @change="chooseSchool">{{ schoolNameList[formData.school] || '请选择' }}</picker>
					</view>
					<view>></view>
				</view>
				<view class="qui-fx-ac qui-bd-b item-list">
					<view>被访人姓名：</view>
					<view class="qui-fx-f1"><input class="item-input" v-model="formData.respondentName" style="text-align: right;" placeholder="请输入" /></view>
				</view>
				<view class="qui-fx-ac qui-bd-b item-list">
					<view>被访人手机号：</view>
					<view class="qui-fx-f1 qui-fx-je"><input class="item-input" v-model="formData.resMobile" style="text-align: right;" placeholder="请输入" /></view>
				</view>
				<view class="qui-fx-ac qui-bd-b item-list">
					<view>预计到达时间：</view>
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
					<view>来访事由：</view>
					<view class="qui-fx-f1 qui-fx-je">
						<picker mode="selector" :value="formData.cause" :range="causeNameList" @change="chooseCause">{{ causeNameList[formData.cause] || '请选择' }}</picker>
					</view>
					<view>></view>
				</view>
			</view>
		</scroll-view>
		<view class="common-btn" @click="confirm">提交</view>
	</view>
</template>

<script>
import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
import { store, actions } from './store/index.js';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			causeNameList: [],
			causeList: [],
			schoolNameList: ['全品中学'],
			schoolList: [
				{
					text: '全品中学',
					value: 'CANPOINT'
				}
			],
			id: '',
			type: '', // 0-修改  1-再次邀约
			formInfo: {},
			imgList: [],
			formData: {
				school: 0,
				visitorName: '',
				visitorMobile: '',
				startDate: this.$tools.getDateTime(new Date(), 'date'),
				startTime: this.$tools.getDateTime(new Date(), 'time'),
				endDate: this.$tools.getDateTime(new Date(), 'date'),
				endTime: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'time'),
				duration: '2小时',
				cause: '',
				accessStartTime: '',
				accessEndTime: '',
				togetherNum: 0,
				respondentName: '',
				resMobile: ''
			}
		};
	},
	computed: {},
	created() {},
	mounted() {
		this.getCause();
	},
	methods: {
		async getCause() {
			if (!this.schoolList[this.formData.school].value) {
				this.$tools.toast('请选择被访人学校');
				return;
			}
			const req = {
				schoolCode: this.schoolList[this.formData.school].value,
				pageNum: 1,
				pageSize: 100
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
			if (this.formData.visitorName === '') {
				this.$tools.toast('请填写访客姓名');
			} else if (this.formData.visitorMobile === '') {
				this.$tools.toast('请填写访客手机号');
			} else if (this.imgList.length === 0) {
				this.$tools.toast('请上传访客照片');
			} else if (this.formData.school === '') {
				this.$tools.toast('请选择被访人学校');
			} else if (this.formData.respondentName === '') {
				this.$tools.toast('请填写被访人姓名');
			} else if (this.formData.resMobile === '') {
				this.$tools.toast('请填写被访人手机号');
			} else if (!/^1[3456789]\d{9}$/.test(this.formData.visitorMobile) || !/^1[3456789]\d{9}$/.test(this.formData.resMobile)) {
				this.$tools.toast('请填写正确手机号');
			} else if (this.formData.cause === '') {
				this.$tools.toast('请选择来访事由');
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
				const req = {
					registPhoto: this.imgList[0],
					schoolCode: school.value,
					accessStartTime: new Date(this.formData.accessStartTime),
					respondentName: this.formData.respondentName,
					resMobile: this.formData.resMobile,
					visitorName: this.formData.visitorName,
					visitorMobile: this.formData.visitorMobile,
					togetherNum: this.formData.togetherNum,
					causeId: cause.value,
					causeName: cause.text,
					type: 0,
					respondentType: 1
				};
				console.log(req);
				const res = await actions.addInviteInfo(req);
				this.$tools.toast('提交成功', 'success');
				uni.navigateBack();
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
		chooseSchool(e) {
			this.formData.school = e.target.value;
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
	margin: 20rpx 0 40rpx 0;
	border-bottom: 1px solid #ddd;
}
</style>
