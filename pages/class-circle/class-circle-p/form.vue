<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="u-fx-jsb u-fx-ac u-bd-b item-list u-bold">
				<view>{{ date }} 作业</view>
				<u-tag v-if="this.type === '2'" class="u-mar-r10" mode="dark" type="error" text="未交" />
			</view>
			<view v-if="this.type === '1'" class="u-bd-b"><u-tabs :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs></view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>班级：</view>
				<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r20">{{ formData.className }}</view>
			</view>
			<view class="u-fx-ac u-bd-b item-list">
				<view>学科：</view>
				<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r20">{{ formData.subName }}</view>
			</view>
			<view class="u-fx u-bd-b item-list input-area">
				<view>作业：</view>
				<view class="u-fx-f1 mar-r20"><textarea :disabled="type !== '0'" class="item-input u-content-color" maxlength="800" v-model="formData.content" placeholder="" /></view>
			</view>
			<view class="u-bd-b item-list" v-if="type === '0' || formData.photoList.length > 0">
				<view class="mar-b20">图片：}}</view>
				<view class="u-fx-f1">
					<view class="u-fx-f1"><an-upload-img disabled total="9" v-model="formData.photoList" class="upload"></an-upload-img></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { store, actions } from './store/index.js';
export default {
	components: {},
	data() {
		return {
			current: 0,
			list: [
				{
					name: '语文'
				},
				{
					name: '数学'
				},
				{
					name: '英语'
				},
				{
					name: '物理'
				},
				{
					name: '化学'
				},
				{
					name: '生物'
				},
				{
					name: '历史'
				},
				{
					name: '政治'
				}
			],
			date: '',
			type: '',
			id: '',
			schoolInfo: {},
			formData: {
				className: '一年级（1）班',
				subName: '语文',
				content: '1.课本第21页第三大题第一小问2.课本第22页第四题3.背诵全文',
				photoList: []
			}
		};
	},
	computed: {},
	created() {
		this.type = this.$tools.getQuery().get('type');
		this.id = this.$tools.getQuery().get('id');
		this.schoolInfo.schoolCode = store.userInfo.schoolCode;
		this.schoolInfo.schoolYearId = store.schoolYear.schoolYearId;
		this.schoolInfo.classCode = uni.getStorageSync('classInfo').classCode;
		this.date = this.$tools.getDateTime(new Date(), 'date');
	},
	async mounted() {},
	methods: {
		change(index) {
			this.current = index;
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh);
}
.item-list {
	padding: 25rpx 10rpx 25rpx 30rpx;
	background: $uni-bg-color;
}
.item-input {
	width: 100%;
	font-size: 26rpx;
	color: $u-tips-color;
}
.al-r {
	text-align: right;
}
.input-area {
	height: 400rpx;
}
/deep/ .uni-textarea-textarea {
	border: 1rpx solid $u-border-color;
	padding: 20rpx;
	height: 350rpx;
	line-height: 50rpx;
	color: $u-content-color;
}
/deep/ .uni-textarea-placeholder {
	padding: 20rpx;
}
</style>
