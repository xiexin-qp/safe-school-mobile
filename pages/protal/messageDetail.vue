<template>
	<scroll-view scroll-y="true" class="scroll-h u-bg-fff">
		<view class="u-tx-c u-padd u-font-1">{{detail.title}}</view>
		<view class="u-tips-color u-font-01 u-fx-jc">
			<span>发布人：{{detail.publisherName}}</span>
			<span class="u-mar-l30">发布日期：{{ $tools.getDateTime(detail.creatTime).substr(0, 16)}}</span>
		</view>
		<view v-html="detail.content" class="u-content-color u-line2 u-padd">
		</view>
	</scroll-view>
</template>

<script>
	import {store, actions} from './store/index.js'
	export default {
		name: 'DetailMessage',
		computed: {
			userInfo: () => store.userInfo
		},
		data () {
			return {
				detail: JSON.parse(uni.getStorageSync('sysDetail'))
			}
		},
		async mounted () {
			console.log(this.detail)
			if (!this.detail.readStatus) {
				await actions.readPersonNotice({
					eduCode: this.userInfo.schoolCode,
					noticeCodes: [this.detail.noticeCode],
					userCode: this.userInfo.userCode
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-h {
		height: 100vh;
	}
</style>
