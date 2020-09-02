<template>
	<view class="">
		<view class="">
			<u-tabs-swiper
				ref="uTabs"
				:bold="false"
				:bar-style="{ transform: 'scale(3)', height: '1rpx' }"
				:current="current"
				@change="changeMenu"
				:list="tabList"
				:is-scroll="false"
				active-color="#2979ff"
			></u-tabs-swiper>
		</view>
		<view class="dropdown u-fx-ac u-bd-b u-bd-t">
			<ms-dropdown-menu v-if="showClass"><ms-dropdown-item v-model="value0" :list="classList" :title="defTitle"></ms-dropdown-item></ms-dropdown-menu>
		</view>
		<swiper class="u-page u-bg-fff" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item scroll-h">
				<scroll-view class="class-style scroll-h">
					<view class="class-card">
						<u-icon class="u-icon-38" name="calendar" color="#2979ff"></u-icon>
						<text class="mar-l20">班级格言：</text>
					</view>
					<view class="u-fx-ver">
						<view class="input" v-if="userType === '1'">
							<textarea :focus="true" @focus="edit" @blur="submit" v-model="classMotto" maxlength="30" />
							<!-- <text class="length">{{ length }}/30</text> -->
						</view>
						<view class="input motto" v-else>
							<text class="padd-l20 mar-l20 u-content-color">{{ classMotto }}</text>
						</view>
					</view>
					<view class="class-card">
						<u-icon class="u-icon-38" name="calendar" color="#2979ff"></u-icon>
						<text class="mar-l20">班级简介：</text>
					</view>
					<view class="u-fx-ver">
						<view class="input area" v-if="userType === '1'">
							<textarea :focus="true" @focus="edit" @blur="submit" v-model="classIntro" maxlength="200" />
							<!-- <text class="length">{{ length }}/30</text> -->
						</view>
						<view class="input motto area auto" v-else>
							<text class="padd-l20 mar-l20 u-content-color">{{ classIntro }}</text>
						</view>
					</view>
					<!-- <view class="class-card">
						<u-icon class="u-icon-38" name="calendar" color="#2979ff"></u-icon>
						<text class="mar-l20">班级全家福：</text>
					</view>
					<view class="u-fx-ver">
						<view class="u-fx-f1">
							<video-upload
								class="u-fx-f1 u-padd-l20 u-padd-r10 u-padd-b20"
								:uploadUrl="uploadUrl"
								types="image"
								:uploadCount="1"
								:upload_max="10"
								@success="success"
								@delImage="delImage"
							></video-upload>
						</view>
					</view> -->
				</scroll-view>
				<!-- <view v-if="showTag" class="common-btn" @click="submit">确定</view> -->
			</swiper-item>
			<swiper-item class="swiper-item"><class-album ref="child" :userType="userType"></class-album></swiper-item>
		</swiper>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import ClassAlbum from './component/ClassAlbum.vue';
import { store, actions } from './store/index.js';
import hostEnv from '../../../config/index.js';
export default {
	name: 'ClassStyle',
	components: {
		msDropdownMenu,
		msDropdownItem,
		ClassAlbum
	},
	data() {
		return {
			showClass: false,
			defTitle: '',
			pageList: {
				page: 1,
				size: 9999
			},
			uploadUrl: '',
			showTag: false,
			current: 0,
			swiperCurrent: 0,
			classMotto: '',
			classIntro: '',
			length: '0',
			tabList: [
				{
					name: '班级名片'
				},
				{
					name: '班级相册'
				}
			],
			morePage: false,
			albumList: [],
			userType: '0', //1班主任，0教职工
			classCode: '',
			gradeCode: '',
			schoolYearId: '',
			photoList: [],
			classList: [],
			value0: ''
		};
	},
	watch: {
		classMotto(val) {
			this.length = val.length;
		},
		value0(val, oldval) {
			console.log(val)
			if (val !== oldval) {
				this.defTitle = this.classList.filter(el => {
					return el.value === val;
				})[0].text;
				this.classCode = val;
				if (store.isBZR && val === store.isBZR.classCode) {
					this.userType = '1';
				} else {
					this.userType = '0';
				}
				this.showMotto();
				this.$refs.child.showList(false, {
					classCode: val,
					schoolYearId: this.schoolYearId
				});
				eventBus.$on('getList', () => {
					console.log(this.$refs.child);
					this.current = 1;
					this.$refs.child.showList(false, {
						classCode: val,
						schoolYearId: this.schoolYearId
					});
				});
			}
		},
	},
	async created() {
		this.uploadUrl = `${hostEnv.zk_oa}/study/theme/file/uploadFile?schoolCode=${store.userInfo.schoolCode}`;
		this.length = this.classMotto.length;
		this.schoolYearId = store.schoolYear.schoolYearId;
		if (store.userInfo.typeCode === '4') {
			this.userType = '0';
			if(store.teachClassList.length === 0){
				this.$tools.toast('请绑定班级')
				return
			}
			this.classList = store.teachClassList;
			this.classCode = store.teachClassList[0].value
			this.gradeCode = store.teachClassList[0].gradeCode
			this.showClass = true;
			this.defTitle = store.teachClassList[0].text;
			this.value0 = store.teachClassList[0].value;
			uni.setStorageSync('classInfo', {
				gradeCode: store.teachClassList[0].gradeCode,
				classCode: store.teachClassList[0].value,
				schoolYearId: this.schoolYearId
			});
		}
		uni.setStorageSync('classInfo', {
			gradeCode: this.gradeCode,
			classCode: this.classCode,
			schoolYearId: this.schoolYearId
		});
	},
	mounted() {},
	methods: {
		success(e) {
			this.photoList.push(e.data.url);
		},
		delImage(value) {
			console.log(value);
			const index = this.photoList.findIndex(list => {
				return list === value.url;
			});
			this.photoList.splice(index, 1);
			actions.delFile(value.id);
		},
		changeMenu(item) {
			this.swiperCurrent = item;
		},
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		edit() {
			this.showTag = true;
		},
		submit() {
			console.log(this.classMotto);
			if (this.classMotto === '') {
				this.$tools.toast('请输入班级格言');
				return;
			}
			if (this.classIntro === '') {
				this.$tools.toast('请输入班级简介');
				return;
			}
			this.showTag = false;
			const req = {
				classCode: this.classCode,
				motto: this.classMotto,
				introduce: this.classIntro,
				schoolCode: store.userInfo.schoolCode,
				schoolYearId: this.schoolYearId
			};
			actions.addClassMotto(req).then(() => {
				this.$tools.toast('编辑成功', 'success');
				this.$tools.goNext(() => {
					this.showMotto();
				});
			});
		},
		async showMotto() {
			const req = {
				schoolCode: store.userInfo.schoolCode,
				gradeCode: this.gradeCode,
				classCode: this.classCode,
				schoolYearId: this.schoolYearId
			};
			console.log(req);
			const res = await actions.getClassMotto(req);
			if (!res.data) {
				this.classMotto = '';
				this.classIntro = '';
				return;
			}
			this.classMotto = res.data.motto;
			this.classIntro = res.data.introduce;
		},
		goDetail(id) {
			this.$tools.navTo({
				url: './detail?id=' + id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.class-style {
	background: url(http://canpointtest.com/mobile-img/background.png) no-repeat;
	background-size: 100% 100%;
}
.dropdown-menu{
	width: 100%;
}
.scroll-h {
	height: calc(100vh - 168rpx);
}
.class-card {
	margin: 40rpx 40rpx 20rpx 40rpx;
	font-size: 32rpx;
}
.input {
	margin: 0 20rpx;
	width: 98%;
	padding: 0rpx 0 0 60rpx;
	line-height: 56rpx;
	font-size: 32rpx;
	position: relative;
	height: 160rpx;
	.length {
		position: absolute;
		right: 11%;
		bottom: 10rpx;
	}
}
/deep/ uni-textarea {
	width: 90%;
}
/deep/ .uni-textarea-textarea {
	height: 160rpx;
	padding: 20rpx;
	line-height: 56rpx;
}
.area {
	height: 290rpx;
	/deep/ .uni-textarea-textarea {
		height: 290rpx;
		overflow: auto;
	}
}
.motto {
	width: 86%;
}
.auto {
	overflow: auto;
}
.u-icon-38{
	font-size: 38rpx;
}
</style>
