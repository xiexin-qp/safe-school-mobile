<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h u-bg-fff u-padd-b20">
			<view class="publish-wrap">
				<view class="input-box u-padd-20 u-bd-b"><textarea class="area-top u-font-01" maxlength="800" placeholder="这一刻的想法..." v-model="formData.content"></textarea></view>
				<view class="img-box">
					<view class="u-font-1 u-padd-20">{{ type === '1' ? '上传图片（最多9张）' : '上传视频（最多1个）' }}</view>
					<video-upload
						class="u-fx-f1 u-padd-l20 u-padd-r10 u-padd-b20"
						:uploadUrl="uploadUrl"
						:types="type === '1' ? 'image' : 'video'"
						:uploadCount="type === '1' ? 9 : 1"
						:upload_max="100"
						@success="success"
						@delImage="delImage"
						@progress="progress"
					></video-upload>
				</view>
			</view>
		</scroll-view>
		<view class="footer-btn u-fx-ac"><u-button v-show="upLoadType === true" @click="confirm" type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg">发表</u-button></view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import anUploadImg from '@/components/an-uploadImg/an-uploadImgWithName';
import { store, actions } from './store/index.js';
import hostEnv from '../../../config/index.js';
export default {
	components: {
		anUploadImg
	},
	data() {
		return {
			formData: {
				content: '',
				uploadUrl: '',
				photoList: [],
				videoList: [],
				type: '',
			},
			upLoadType: true,
		};
	},
	computed: {},
	created() {
		this.uploadUrl = `${hostEnv.zk_oa}/study/theme/file/uploadFile?schoolCode=${store.userInfo.schoolCode}`;
		this.type = this.$tools.getQuery().get('type');
	},
	async mounted() {},
	methods: {
		success(e) {
			console.log(e.data);
			if (this.type === '1') {
				this.formData.photoList.push(e.data.url);
			} else {
				this.formData.videoList.push(e.data.url);
			}
		},
		progress(value){
			console.log(value)
			this.upLoadType = value
		},
		delImage(value){
			console.log(value)
			if (this.type === '1') {
				const index = this.formData.photoList.findIndex(list => {
					return list === value.url
				})
				this.formData.photoList.splice(index, 1);
			} else {
				const index = this.formData.videoList.findIndex(list => {
					return list === value.url
				})
				this.formData.videoList.splice(index, 1);
			}
			actions.delFile(value.id)
			
		},
		async confirm() {
			if (this.formData.content === '') {
				this.$tools.toast('请输入内容');
				return
			}
			if (!this.upLoadType){
				this.$tools.toast('请等待上传完成');
				return
			}
			const req = {
				...this.formData
			};
			console.log(req, 2222);
			/* const res = await actions.addNewAlbum(req);
				this.$tools.toast('提交成功', 'success');
				this.$tools.goNext(() => {
					eventBus.$emit('getList');
					this.$tools.goBack();
				}); */
		}
	}
};
</script>

<style lang="scss">
.scroll-h {
	height: calc(100vh - 100rpx);
}
.publish-wrap {
	.input-box {
		.area-top {
			width: 100%;
			min-height: 300rpx;
			caret-color: $uni-color-success;
		}
	}
}
</style>
