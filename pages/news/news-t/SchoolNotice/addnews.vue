<template>
	<view class="add">
		<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">公告标题：</view>
				<view class="u-fx-f1"><input maxlength="30" v-model="newsInfo.title" class="item-input" /></view>
			</view>
			<view class="qui―fx u-bd-b item-list">
				<view class="tip">正文:</view>
				<view class="u-fx-f1 u-mar-t"><textarea class="item-input" v-model="newsInfo.content" maxlength="600" /></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>选择教职工:</view>
				<view @click="check" class="u-fx-f1 u-fx">
					<view class="copyer u-fx-f1 u-content-color u-tx-r">
						<view v-for="(item, index) in userCodeList" :key="index">
							<u-tag v-if="item.userCode != userCode" @close="tagClick(item)" :text="item.userName" mode="light" type="info" closeable class="mar-l10" />
						</view>
					</view>
				</view>
				<view class="rit-icon"></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>选择班级:</view>
				<view @click="check1" class="u-fx-f1 u-fx">
					<view class="copyer u-fx-f1 u-content-color u-tx-r">
						<u-tag
							@close="tagClass(item)"
							v-for="(item, index) in classList"
							:key="index"
							:text="item.gradeName + item.className"
							mode="light"
							type="info"
							closeable
							class="mar-l10"
							style="margin: 4px"
						/>
					</view>
				</view>
				<view class="rit-icon"></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>开启全屏通知：</view>
				<view class="u-fx-f1 u-fx-je"><u-switch v-model="newsInfo.showFull" @change="showTime" active-value="1" inactive-value="2"></u-switch></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list" v-if="isShow">
				<view class="tip">全屏开始时间：</view>
				<view class="u-fx-f1 u-fx-je" @click="startShow = true">
					<u-picker mode="time" v-model="startShow" :params="params" @confirm="startConfirm"></u-picker>
					<view class="uni-input u-content-color">{{ newsInfo.startDate }}</view>
					<view class="rit-icon"></view>
				</view>
			</view>
			<view class="u-fx-ac u-bd-b item-list" v-if="isShow">
				<view class="tip">全屏结束时间：</view>
				<view class="u-fx-f1 u-fx-je" @click="endShow = true">
					<u-picker mode="time" v-model="endShow" :params="params" @confirm="endConfirm"></u-picker>
					<view class="uni-input u-content-color">{{ newsInfo.endDate }}</view>
					<view class="rit-icon"></view>
				</view>
			</view>
		</scroll-view>
		<view class="submit-box u-fx-ac"><view class="btn u-fx-f1" @click="submit">提交</view></view>
		<u-popup ref="checkPopup1" mode="center" length="75%" :mask-close-able="false">
			<view class="search"><u-search placeholder="请输入姓名" v-model="keyword" shape="square" height="75" :show-action="false" :clearabled="false"></u-search></view>
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore">
				<view>
					<u-checkbox-group>
						<label class="list u-bd-b u-fx-jsb" v-for="item in dataList" :key="item.userCode">
							<label :for="item.userName">
								<text>{{ item.userName }}</text>
							</label>
							<u-checkbox :disabled="disabled" @change="checkBox" v-model="item.checked" :name="`${item.userCode}^${item.userName}`"></u-checkbox>
						</label>
					</u-checkbox-group>
				</view>
			</scroll-view>
			<view class="submit-btn u-fx-ac"><u-button class="btn u-font-01" type="primary" size="mini" @click="ok">确定</u-button></view>
		</u-popup>
		<u-popup ref="checkPopup2" mode="center" length="75%" :mask-close-able="false">
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore">
				<view>
					<u-checkbox-group>
						<label class="list u-bd-b u-fx-jsb" v-for="item in selectList" :key="item.classCode">
							<label :for="item.className">
								<text>{{ item.gradeName }}{{ item.className }}</text>
							</label>
							<u-checkbox @change="checkclass" v-model="item.checked" :name="`${item.classCode}^${item.className}=${item.schoolYearId}=${item.gradeName}`"></u-checkbox>
						</label>
					</u-checkbox-group>
				</view>
			</scroll-view>
			<view class="submit-btn u-fx-ac"><u-button class="btn u-font-01" type="primary" size="mini" @click="ok">确定</u-button></view>
		</u-popup>
	</view>
</template>

<script>
import { actions, store } from '../store/index';
import eventBus from '@u/eventBus';
import tools from '.../../../utils/tools';
export default {
	components: {},
	data() {
		return {
			newsInfo: {
				title: '',
				content: '',
				showFull: false,
				startDate: this.$tools.getPhoneTime(new Date(), 'noSecond'),
				endDate: this.$tools.getPhoneTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'noSecond')
			},
			id: '',
			keyword: '',
			dataList: [],
			selectList: [],
			pageList: {
				page: 1,
				size: 20
			},
			checkList: [],
			getList: [],
			userList: [],
			classCode: [],
			userCodeList: [],
			classList: [],
			schoolYearId: '',
			startShow: false,
			endShow: false,
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: false
			},
			isShow: false,
			disabled: false
		};
	},
	watch: {
		keyword(val, oldval) {
			this.keyword = val;
			this.orgUserGet();
		},
		checkList(val, oldval) {
			this.userCodeList = [];
			this.userList = [];
			val.map(el => {
				this.userCodeList.push({
					userCode: el.split('^')[0],
					userName: el.split('^')[1].split('=')[0]
				});
				this.userList.push(el.split('^')[0]);
			});
		},
		getList(val, oldval) {
			this.classList = [];
			this.classCode = [];
			val.map(el => {
				this.classList.push({
					classCode: el.split('^')[0],
					className: el.split('^')[1].split('=')[0],
					schoolYearId: el.split('^')[1].split('=')[1],
					gradeName: el.split('^')[1].split('=')[2]
				});
				this.classCode.push(el.split('^')[0]);
			});
			console.log(this.classList);
		}
	},
	computed: {},
	async mounted() {
		this.userCode = store.userInfo.userCode;
		this.id = this.$tools.getQuery().get('id');
		if (this.id) {
			this.detailGet(this.id);
		}
		// this.orgUserGet();
		// this.getclassList();
	},
	methods: {
		showTime() {
			if (this.newsInfo.showFull === false) {
				this.isShow = false;
			} else {
				this.isShow = true;
			}
		},
		startConfirm(params) {
			this.newsInfo.startDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`;
			this.newsInfo.endDate = this.newsInfo.endDate.replace(/-/g, '-');
			const time = new Date(new Date(this.newsInfo.endDate).getTime()).getTime() - new Date(new Date(this.newsInfo.startDate).getTime()).getTime() - 1000 - 60 - 60;
			if (time > 0) {
				this.newsInfo.duration = Math.ceil(time);
			} else {
				this.newsInfo.duration = Math.floor(time);
			}
		},
		endConfirm(params) {
			this.newsInfo.endDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`;
			this.newsInfo.startDate = this.newsInfo.startDate.replace(/-/g, '-');
			const time = new Date(new Date(this.newsInfo.endDate).getTime()).getTime() - new Date(new Date(this.newsInfo.startDate).getTime()).getTime() - 1000 - 60 - 60;
			if (time > 0) {
				this.newsInfo.duration = Math.ceil(time);
			} else {
				this.newsInfo.duration = Math.floor(time);
			}
		},
		//获取教职工
		async orgUserGet(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				keyword: this.keyword,
				orgCode: '',
				schoolCode: store.userInfo.schoolCode,
				page: this.pageList.page,
				size: this.pageList.size
			};
			const res = await actions.getOrgUser(req);
			const data = res.data.list;
			data.forEach(el => {
				this.userCodeList.forEach(element => {
					if (element.userCode === el.userCode) {
						el.checked = true;
					}
				});
			});
			if (tag) {
				this.dataList = this.dataList.concat(data);
			} else {
				this.dataList = data;
			}
			this.morePage = res.data.hasNextPage;
		},
		//获取班级
		async getclassList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				schoolYearId: this.schoolYearId,
				gradeCode: '',
				schoolCode: store.userInfo.schoolCode,
				page: this.pageList.page,
				size: this.pageList.size
			};
			const res = await actions.classList(req);
			const data = res.data.list;
			data.forEach(el => {
				this.classList.forEach(element => {
					if (element.classCode === el.classCode) {
						el.checked = true;
					}
				});
			});
			if (tag) {
				this.selectList = this.selectList.concat(data);
			} else {
				this.selectList = data;
			}
			this.morePage = res.data.hasNextPage;
		},
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.orgUserGet(true);
			this.getclassList(true);
		},
		check() {
			this.keyword = '';
			this.orgUserGet();
			this.$refs.checkPopup1.open();
		},
		check1() {
			this.getclassList();
			this.$refs.checkPopup2.open();
		},
		cancel() {
			this.$refs.checkPopup1.close();
			this.$refs.checkPopup2.close();
		},
		ok() {
			this.$refs.checkPopup1.close();
			this.$refs.checkPopup2.close();
		},
		checkBox(e) {
			if (this.userCode === e.name.split('^')[0]) {
				this.$tools.toast('发布对象不能为自己!');
				return;
			}
			if (e.value) {
				this.checkList.push(e.name);
			} else {
				this.checkList.splice(this.checkList.indexOf(e.name), 1);
			}
		},
		checkclass(e) {
			if (e.value) {
				this.getList.push(e.name);
			} else {
				this.getList.splice(this.getList.indexOf(e.name), 1);
			}
		},
		tagClick(item) {
			const data = `${item.userCode}^${item.userName}`;
			this.checkList.splice(this.checkList.indexOf(data), 1);
		},
		tagClass(item) {
			const data = `${item.classCode}^${item.className}=${item.schoolYearId}=${item.gradeName}`;
			this.getList.splice(this.getList.indexOf(data), 1);
		},
		async detailGet(id) {
			const res = await actions.getNoticeDetail(id);
			this.newsInfo = res.data;
			const data1 = this.newsInfo.noticeUserList;
			const data = this.newsInfo.noticeClassList;
			if (this.newsInfo.showFull === '1') {
				this.newsInfo.showFull = true;
				this.isShow = true;
			} else {
				this.newsInfo.showFull = false;
				this.isShow = false;
			}
			if (this.newsInfo.fullStart != null) {
				this.newsInfo.startDate = this.$tools.getPhoneTime(new Date(this.newsInfo.fullStart), 'noSecond');
			} else {
				this.newsInfo.startDate = this.$tools.getPhoneTime(new Date(), 'noSecond');
			}
			if (this.newsInfo.fullEnd != null) {
				this.newsInfo.endDate = this.$tools.getPhoneTime(new Date(this.newsInfo.fullEnd), 'noSecond');
			} else {
				this.newsInfo.endDate = this.$tools.getPhoneTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'noSecond');
			}
			this.checkList = data1.map(el => {
				return `${el.userCode}^${el.userName}`;
			});
			this.getList = data.map(item => {
				return `${item.classCode}^${item.className}=${item.schoolYearId}=${item.gradeName}`;
			});
		},
		async submit () {
			if (this.newsInfo.title === '') {
				this.$tools.toast('请输入标题');
				return false;
			} else if (this.newsInfo.content === '') {
				this.$tools.toast('请输入正文');
				return false;
			} else if (this.userList.length === 0 && this.classCode.length === 0) {
				this.$tools.toast('请选择发布对象');
				return;
			} else if (new Date(this.newsInfo.endDate).getTime() <= new Date(this.newsInfo.startDate).getTime()) {
				this.$tools.toast('请选择正确时间段');
				return false;
			}
			if (this.classList.length != 0) {
				this.schoolYearId = this.classList[0].schoolYearId;
			}
			const req = {
				createBy: store.userInfo.userName,
				creatorCode: store.userInfo.userCode,
				schoolCode: store.userInfo.schoolCode,
				userCodes: this.userList,
				classCodes: this.classCode,
				schoolYearId: this.schoolYearId,
				fullStart: this.newsInfo.startDate,
				fullEnd: this.newsInfo.endDate,
				showFull: this.newsInfo.showFull === true ? 1 : 2,
				content: this.newsInfo.content,
				title: this.newsInfo.title
			};
			if (this.id) {
				await actions.updateNotice({
					...req,
					id: this.id
				});
			} else {
				await actions.addNotice({
					...req
				})
			}
			this.$tools.toast('操作成功');
			eventBus.$emit('getList');
			this.$tools.goNext(() => {
				this.$tools.goBack();
			});
		}
	}
};
</script>

<style lang="scss">
.add {
	position: relative;
	.scroll-h {
		height: calc(100vh - 100rpx);
	}
	.item-list {
		padding: 25rpx 15rpx 25rpx 25rpx;
		.tip::before {
			position: absolute;
			z-index: 99;
			content: '*';
			top: 30rpx;
			color: $u-type-error;
			font-weight: bold;
			left: 8rpx;
		}
		.item-input {
			width: 100%;
			font-size: 26rpx;
			color: $u-tips-color;
		}
		.radio {
			padding-left: 25rpx;
		}
		.upload {
			margin: 20rpx;
		}
	}
	.submit-box {
		height: 100rpx;
		.btn {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			letter-spacing: 8rpx;
			margin: 0 20rpx;
			background-color: $u-type-primary;
			color: $uni-bg-color;
			border-radius: $u-border-radius;
		}
	}
	.search {
		padding: 20rpx;
	}
	.scroll {
		height: 70vh;
		// padding-bottom: 10vh;
		.list {
			padding: 15rpx 25rpx;
			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
		.u-checkbox-group {
			display: flex;
			flex-direction: column;
		}
	}
}
.copyer {
	.u-size-default {
		padding: 10rpx 5rpx;
	}
}
.mar-l10 {
	margin-left: 10rpx;
}
.submit-btn {
	height: 80rpx;
	justify-content: center;
	.btn {
		letter-spacing: 8rpx;
		margin: 0 20rpx;
	}
}
</style>
