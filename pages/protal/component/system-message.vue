<template>
	<view class="app-message u-auto">
		<no-data v-if="dataList.length === 0"></no-data>
		<view @click="goDetail(data)" v-for="(data, index) in dataList" :key="index" class="message-item u-mar u-padd u-border-radius u-type-white-bg">
			<view class="u-fx-ac">
				<view :class="['u-fx-f1 u-font-1', {'u-tips-color': data.readStatus}]">{{ data.title }}</view>
				<view class="u-tips-color u-font-01">{{ $tools.getDateTime(data.creatTime).substr(5,6)}}</view>
			</view>
			<view v-html="data.content" class="u-tips-color u-mar-t u-font-01 u-te2">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'app-message',
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data () {
			return {
			}
		},
		methods: {
			goDetail (item) {
				uni.setStorageSync('sysDetail', JSON.stringify(item))
				this.$tools.navTo({
					url: `../protal/messageDetail`,
					title: '详情'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-message {
		
	}
</style>
