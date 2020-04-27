<template>
	<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
	 :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
		<view class="u-datetime-picker" @tap.stop>
			<view class="u-picker-header" @touchmove.stop.prevent="stop" catchtouchmove="stop">
				<view class="u-btn-picker u-tips-color" :style="{ color: cancelColor }" hover-class="u-opacity" :hover-stay-time="150"
				 @tap="getResult('cancel')">取消</view>
				<view class="u-btn-picker u-type-primary" :style="{ color: confirmColor }" hover-class="u-opacity" :hover-stay-time="150"
				 @touchmove.stop="" @tap.stop="getResult('confirm')">确定</view>
			</view>
			<view class="u-picker-body">
				<picker-view :value="valueArr" @change="change" class="u-picker-view">
					<picker-view-column>
						<view class="u-column-item" v-for="(item,index) in provinces" :key="index">
							<view class="u-line-1">
								{{item.label}}
							</view>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "uni-picker",
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				valueArr: '',
				provinces: [
					{
						id: 1,
						label: '星期一'
					},
					{
						id: 2,
						label: '星期二'
					}
				]
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			regionChange() {
				// 引用这几个变量，是为了监听其变化
				return `${this.province}-${this.city}`;
			},
		},
		methods: {
			close() {
				this.$emit('input', false);
			},
			// 用户更改picker的列选项
			change(e) {
				this.valueArr = e.detail.value;
				let i = 0;
			},
			// 用户点击确定按钮
			getResult(event = null) {
				let result = {};
				// 只返回用户在this.params中配置了为true的字段
				if (this.mode == 'time') {
					if (this.params.year) result.year = this.formatNumber(this.year || 0);;
					if (this.params.month) result.month = this.formatNumber(this.month || 0);
					if (this.params.day) result.day = this.formatNumber(this.day || 0);
					if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
					if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
					if (this.params.second) result.second = this.formatNumber(this.second || 0);
				} else {
					if (this.params.province) result.province = provinces[this.province];
					if (this.params.city) result.city = citys[this.province][this.city];
					if (this.params.area) result.area = areas[this.province][this.city][this.area];
				}
				if (event) this.$emit(event, result);
				this.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-datetime-picker {
		position: relative;
		z-index: 999;
	}

	.u-picker-view {
		height: 100%;
		box-sizing: border-box;
	}

	.u-picker-header {
		width: 100%;
		height: 90rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32rpx;
		background: #fff;
		position: relative;
	}

	.u-picker-header::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.u-picker-body {
		width: 100%;
		height: 500rpx;
		overflow: hidden;
		background-color: #fff;
	}

	.u-column-item {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		color: $u-main-color;
		padding: 0 8rpx;
	}

	.u-text {
		font-size: 24rpx;
		padding-left: 8rpx;
	}

	.u-btn-picker {
		padding: 16rpx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
	}

	.u-opacity {
		opacity: 0.5;
	}
</style>
