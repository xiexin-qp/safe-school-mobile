<template>
	<view class="an-uploadImg-group">
			<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
				<image :src="item" v-if="item"></image>
				<view class="an-icon-close" @click.stop="handleRemove(index)">
					<view class="del">-</view>
				</view>
			</view>
			<view v-if="imgBase64List.length < total" class="an-img-add" @click="chooseImage">
				+
			</view>
	</view>
</template>

<script>
	export default {
		name: 'AnUploadImg',
		components:{
		},
		props: {
			total: {
				type: Number | String,
				default: 3
			},
			value: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {
			imgBase64List: {
				get () {
					return this.value
				},
				set (val) {
					this.$emit('input',val)
				}
			}
		},
		data() {
			return {
				imgList: []
			};
		},
		methods:{
			chooseImage() {
				uni.chooseImage({
				  success: (chooseImageRes) => {
						console.log(chooseImageRes)
					for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
						this.imgList.push(chooseImageRes.tempFilePaths[i]);
						const file = chooseImageRes.tempFilePaths[i]
						const newImg = new Image()
						newImg.src = file
						newImg.onload = () => {
							var canvas = document.createElement('canvas')
							const context = canvas.getContext('2d')
							context.drawImage(newImg, 0, 0, 80, 80)
							const base64 = canvas.toDataURL('image/png')
							this.imgBase64List.push(base64)
						}
					}
				  }
				})
			},
			perviewImg(index){
				let urls = [];
				if(index != -1){
					urls[0] = this.imgList[index];
				}else{
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index){
				let il=[], ibl=[];
				for (var i = 0; i < this.imgList.length; i++) {
					if(i != index){
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
				console.log(this.imgBase64List)
			}
		}
	}
</script>

<style lang="scss">
	.an-uploadImg-group{
		overflow: auto;
		height: 110rpx;
	}
	.an-img{
		float: left; 
		margin-right: 40rpx;
		position: relative;
	}
	.an-img-add {
		float: left; 
		font-size: 50rpx;
		margin-right: 10rpx; 
		height: 100rpx; 
		width: 100rpx; 
		background-color: #C8C7CC; 
		text-align: center; 
		line-height: 100rpx;
	}
	.an-img > image {
		height: 100rpx; 
		width: 100rpx;
	}
	.an-icon-close {
		width: 30rpx;
		height: 30rpx;
		position: absolute; 
		right: 0rpx; 
		top: 5rpx;
		.del {
			color: #fff;
			height: 30rpx;
			width: 30rpx;
			font-weight: blod;
			line-height: 26rpx;
			text-align: center;
			border-radius: 100%;
			background-color: #555555;
		}
	}
</style>
