<template>
	<view class="app-message u-auto">
		<view v-for="i in 10" :key="i" class="message-item u-mar u-padd u-border-radius u-type-white-bg u-line2">
			<view class="u-fx-ac">
				<view></view>
				<view class="u-fx-f1 u-font-1">请假单审批</view>
				<view class="u-tips-color u-font-01">11:25</view>
			</view>
			<view class="u-content-color">您有一个审批单，请处理</view>
			<view class="u-tips-color u-font-01">
				<view>姓名：张立</view>
				<view>班级：张立</view>
				<view>家长姓名：张立</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'app-message',
		data () {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-message {
		
	}
</style>
