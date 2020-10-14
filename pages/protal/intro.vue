<template>
	<view class="u-page u-fx-f1">
		<u-navbar class="u-mar-b20" :is-back="false" v-if="userInfo.typeCode === '16' && showDropdown">
			<ms-dropdown-menu><ms-dropdown-item :title="childName" v-model="childCode" :list="childList"></ms-dropdown-item></ms-dropdown-menu>
		</u-navbar>
		<view v-if="type === '0'" class="u-bg-fff">
			<view class="float-add-btn" @click="btnClick"></view>
			<no-data v-if="noDataTag" msg="暂无数据~"></no-data>
			<view v-else class="">
				<view class="u-fx-ac" v-if="photoList.length > 0">
					<image class="line u-mar-l20 mar-t20" src="http://canpointtest.com/mobile-img/line.png"></image>
					<text class="mar-t20 mar-l20 u-font-01 u-bold">个人风采：</text>
				</view>
				<view class="wrap u-padd-20"><u-swiper title height="400" img-mode="aspectFit" :list="list" @click="previewImage"></u-swiper></view>
				<view class="u-fx-ac u-mar-20">
					<image class="line" src="http://canpointtest.com/mobile-img/line.png"></image>
					<text class="mar-l20 u-font-01 u-bold">个人简介：</text>
				</view>
				<view class="u-bg-fff u-padd-b20 u-padd-l20 u-padd-r10">
					<scroll-view scroll-y="true" :class="userInfo.typeCode === '16' && showDropdown ? 'scroll-h' : 'scroll-h-0'">
						<view class="u-padd-l20 u-padd-r20">
							<view class="content">{{ introduction }}</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view v-else class="">
			<scroll-view scroll-y="true" :class="userInfo.typeCode === '16' && showDropdown ? 'scroll-h-2' : 'scroll-h-1'">
				<view class="u-bg-fff u-mar-b20">
					<view class="u-mar-b20 u-mar-l20 u-padd-t20 u-fx-ac">
						<image class="line" src="http://canpointtest.com/mobile-img/line.png"></image>
						<text class="mar-l20">个人简介：</text>
					</view>
					<view class="input u-mar-l20 u-mar-r20">
						<textarea
							class="u-font-01 u-padd-b20"
							v-model="introduction"
							maxlength="500"
							:placeholder="
								userInfo.typeCode === '4' ? '请在此处描述个人事迹、教学理念、获奖经历等(必填)......' : '请在此处描述孩子基本信息、学习情况、主要获奖、兴趣特长等(必填)......'
							"
						/>
						<text class="length u-font-01 u-tips-color">{{ length }}/500</text>
					</view>
				</view>
				<view class="u-bg-fff">
					<view class="u-mar-b20 u-mar-l20 u-padd-t20 u-fx-ac">
						<image class="line" src="http://canpointtest.com/mobile-img/line.png"></image>
						<text class="mar-l20">个人风采：</text>
					</view>
					<view class="u-padd-b20">
						<video-upload
							class="u-fx-f1 u-padd-l20 u-padd-r10 u-padd-b20"
							:schoolCode="userInfo.schoolCode"
							desTag
							types="image"
							v-model="photoList"
							:uploadCount="9"
							:upload_max="10"
						></video-upload>
						<text class="u-mar-l20 u-font-02 u-tips-color">上传图片(选填，最多支持上传9张图片)</text>
					</view>
				</view>
			</scroll-view>
			<view class="footer-btn u-fx-ac"><u-button @click="confirm" type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg">提交</u-button></view>
		</view>
	</view>
</template>

<script>
import chooseChild from '@/components/choose-child/choose-child.vue';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from './store/index.js';
import hostEnv from '../../config/index.js';
export default {
	name: 'school-intro',
	components: {
		msDropdownMenu,
		msDropdownItem,
		chooseChild,
		noData
	},
	computed: {
		userInfo: () => store.userInfo,
		schoolYear: () => store.schoolYear,
		enjoyParentApp: () => store.enjoyParentApp,
		list() {
			return this.photoList.map(ele => {
				return {
					image: ele.url,
					title: ele.photoDes === '添加描述' ? '' : ele.photoDes
				};
			});
		}
	},
	data() {
		return {
			type: '',
			noDataTag: false,
			showDropdown: false,
			dataInfo: {},
			introduction: '',
			photoList: [],
			length: 0,
			childCode: '',
			childName: '',
			childList: [],
			style: ''
		};
	},
	watch: {
		introduction(val) {
			this.length = val.length;
		},
		childCode(val, oldval) {
			if (val !== oldval) {
				this.childCode = val;
				let arr = this.childList.filter(el => {
					return el.value === val;
				});
				this.childName = arr[0].text;
				this.showIntro();
			}
		}
	},
	async created() {
		this.type = this.$tools.getQuery().get('type');
		if (this.userInfo.typeCode === '16') {
			this.childCode = store.childList[0].userCode;
			this.childName = store.childList[0].userName;
			this.childList = store.childList.map(ele => {
				return {
					text: ele.userName,
					value: ele.userCode
				};
			});
			if (this.childList.length > 1) {
				this.showDropdown = true;
			}
		}
		this.showIntro();
	},
	methods: {
		previewImage(index) {
			uni.previewImage({
				current: index,
				urls: this.list.map(el => {
					return el.image;
				})
			});
		},
		btnClick(){
			console.log(123)
			this.type = '1'
		},
		async showIntro() {
			const res = await actions.getIntro({
				schoolCode: this.userInfo.schoolCode,
				userCode: this.userInfo.typeCode === '4' ? this.userInfo.userCode : this.childCode,
				userType: this.userInfo.typeCode === '4' ? this.userInfo.typeCode : '8'
			});
			if (!res.data || res.data.introduction === '') {
				this.introduction = ''
				this.photoList = []
				this.noDataTag = true;
				return;
			}
			this.introduction = res.data.introduction;
			if (res.data.outUserStyleDtoList.length === 0) {
				return;
			}
			this.photoList = res.data.outUserStyleDtoList.map(el => {
				return {
					url: el.photoUrl,
					id: el.id,
					photoDes: el.photoDes === '' ? '添加描述' : el.photoDes
				};
			});
		},
		confirm() {
			console.log(this.photoList);
			if (this.introduction === '') {
				this.$tools.toast('请输入个人简介');
				return;
			}
			const req = {
				introduction: this.introduction,
				schoolCode: this.userInfo.schoolCode,
				userCode: this.userInfo.typeCode === '4' ? this.userInfo.userCode : this.childCode,
				userType: this.userInfo.typeCode === '4' ? this.userInfo.typeCode : '8'
			};
			if (this.photoList.length > 0) {
				req.inUserStyleDtoList = this.photoList.map(el => {
					return {
						id: el.id,
						photoDes: el.photoDes === '添加描述' ? '' : el.photoDes,
						photoUrl: el.url
					};
				});
			}
			actions.editIntro(req).then(() => {
				this.$tools.toast('编辑成功', 'success');
				this.$tools.goNext(() => {
					// this.$tools.goBack();
					this.type = '0'
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 696rpx);
}
.scroll-h-0 {
	height: calc(100vh - 588rpx);
}
.scroll-h-1 {
	height: calc(100vh - 100rpx);
}
.scroll-h-2 {
	height: calc(100vh - 210rpx);
}
.dropdown-menu {
	width: 100%;
}
.line {
	width: 4rpx;
	height: 28rpx;
}
.input {
	position: relative;
	height: 430rpx;
	.length {
		position: absolute;
		right: 0rpx;
		bottom: 10rpx;
	}
}
/deep/ uni-textarea {
	width: 100%;
	height: 410rpx;
}
/deep/ .uni-textarea-textarea {
	height: 400rpx;
	line-height: 40rpx;
}
.content {
	text-indent: 2em;
	text-indent: 40rpx;
}
</style>
