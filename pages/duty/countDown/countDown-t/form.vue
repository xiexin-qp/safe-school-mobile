<template>
	<view class="add">
		<u-picker @confirm="changeTime" v-model="birthdayTag" mode="time"></u-picker>

		<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">事件名称：</view>
				<view class="u-fx-f1"><input v-model="formData.name" class="item-input" /></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">提示语：</view>
				<view class="u-fx-f1"><input v-model="formData.tips" class="item-input" /></view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view class="tip">截至日期：</view>
				<view class="u-fx-f1 u-fx-je" @click="birthdayTag = true">
					<u-picker mode="time" v-model="birthdayTag" :params="params" @confirm="startConfirm"></u-picker>
					<view class="uni-input u-content-color">{{ formData.endTime }}</view>
					<view class="rit-icon"></view>
				</view>
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
						/>
					</view>
					<view class="rit-icon"></view>
				</view>
			</view>
		</scroll-view>
		<view class="submit-box u-fx-ac"><view class="btn u-fx-f1" @click="submit">提交</view></view>
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
import { actions, store } from './store/index';
import eventBus from '@u/eventBus';
import validateForm from '@u/validate';
export default {
	components: {},
	data() {
		return {
			id: '',
			dataList: [],
			selectList: [],
			pageList: {
				page: 1,
				size: 15
			},
			getList: [],
			classCodes: [],
			classList: [],
			birthdayTag: false,
			formData: {
				name: '',
				endTime: this.$tools.getPhoneTime(new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), 'noSecond'),
				tips: ''
			},
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: false
			}
		};
	},
	watch: {
		getList(val, oldval) {
			this.classList = [];
			this.classCodes = [];
			val.map(el => {
				this.classList.push({
					classCode: el.split('^')[0],
					className: el.split('^')[1].split('=')[0],
					schoolYearId: el.split('^')[1].split('=')[1],
					gradeName: el.split('^')[1].split('=')[2]
				});
				this.classCodes.push(el.split('^')[0]);
			});
		}
	},
	computed: {},
	async mounted() {
		this.id = this.$tools.getQuery().get('id');
		if (this.id) {
			this.detailGet(this.id);
		}
		// this.getclassList();
	},
	methods: {
		startConfirm(params) {
			this.formData.endTime = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`;
			const time = new Date(new Date(this.formData.endTime).getTime()).getTime() - +1 * 24 * 60 * 60 * 1000;
			if (time > 0) {
				this.formData.duration = Math.ceil(time);
			} else {
				this.formData.duration = Math.floor(time);
			}
		},
		//获取班级
		async getclassList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				schoolYearId: '',
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
			this.getclassList(true);
		},
		check1() {
			this.getclassList();
			this.$refs.checkPopup2.open();
		},
		cancel() {
			this.$refs.checkPopup2.close();
		},
		ok() {
			this.$refs.checkPopup2.close();
		},
		checkBox(e) {
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
		tagClass(item) {
			const data = `${item.classCode}^${item.className}=${item.schoolYearId}=${item.gradeName}`;
			this.getList.splice(this.getList.indexOf(data), 1);
		},
		async detailGet(id) {
			const res = await actions.getcountDetail(id);
			this.formData.endTime = this.$tools.getPhoneTime(new Date(res.data.endTime), 'noSecond');
			this.formData.tips = res.data.tips;
			this.formData.name = res.data.name;
			const data = res.data.outCountDownClassDtoList;
			this.getList = data.map(item => {
				return `${item.classCode}^${item.className}=${item.schoolYearId}=${item.gradeName}`;
			});
		},
		changeTime(item) {
			this.formData.endTime = `${item.year}-${item.month}-${item.day}`;
		},
		async submit() {
			if (this.formData.name === '') {
				this.$tools.toast('请输入事件名称');
				return false;
			} else if (this.formData.endTime === '') {
				this.$tools.toast('请输入截至日期');
				return false;
			} else if (this.classCode === '') {
				this.$tools.toast('请选择对象');
				return;
			}
			const req = {
				schoolCode: store.userInfo.schoolCode,
				classCodes: this.classCodes
			};
			if (this.id) {
				await actions.updateCount({
					...this.formData,
					...req,
					id: this.id,
					schoolYearId: this.classList[0].schoolYearId
				});
				this.$tools.toast('操作成功');
				this.$tools.goNext(() => {
					eventBus.$emit('getList');
					this.$tools.goBack();
				});
			} else {
				await actions.addCount({
					...this.formData,
					...req,
					schoolYearId: this.selectList[0].schoolYearId
				});
				this.$tools.toast('操作成功');
				this.$tools.goNext(() => {
					eventBus.$emit('getList');
					this.$tools.goBack();
				});
			}
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
