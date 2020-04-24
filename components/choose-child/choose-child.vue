<template>
	<view v-if="childList.length > 1" class="choose-child qui-fx-ac-jc" @click="changeChild">
		{{ childList[0].userName }}
	</view>
</template>

<script>
	export default {
    props: {
    },
		data() {
			return {
				childList: JSON.parse(uni.getStorageSync('protal')).childList
			}
		},
		methods: {
			changeChild () {
				const arr = this.childList.map(item => {
					return item.userName
				})
				this.$tools.actionsheet(arr, (index) => {
					this.$emit('change', this.childList[index])
				})
			}
		}
	}
</script>

<style lang="scss">
  .choose-child {
		position: fixed;
		width: 200rpx;
		border-radius: 10rpx;
		height: 80rpx;
		background-color: $main-color;
		color:#fff;
		bottom: 20rpx;
		left: -10rpx;
		z-index: 99;
		line-height: 80rpx;
  }
</style>
