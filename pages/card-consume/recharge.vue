<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="u-fx-f1 u-bd-b item-list u-mar-b20">
				<view class="u-fx tip">充值金额（元）：</view>
				<view class="u-fx u-fx-ac u-mar-10 u-bd-b u-padd-10 u-font-3">
					<view>￥</view>
					<input class="u-mar-l10" type="digit" v-model="formData.orderAmount" placeholder="" />
				</view>
				<view class="money-num u-fx-jsa u-mar-t20">
					<view
						@click="changeMoney(item, index)"
						:class="current === index ? 'u-padd-20 u-padd-t10 u-padd-b10 u-bd-1px u-mar-r20 u-color u-type-primary-bg u-type-white' : 'u-bg-fff u-padd-20 u-padd-t10 u-padd-b10 u-bd-1px u-mar-r20'"
						v-for="(item, index) in moneyTotal"
						:key="index"
					>
						{{ item }}
					</view>
				</view>
			</view>
			<view class="u-fx-ac u-bd-b item-list u-mar-b20">
				<view>充值账户：</view>
				<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">张一山（余额23.50）</view>
			</view>
			<view class="u-bd-b item-list">
				<view class="tip">支付方式：</view>
				<view class="u-fx-f1 u-padd-t">
					<radio-group @change="changePayMode">
						<label v-for="(item, index) in payModeList" :key="item.value">
							<view :class="index === 0 ? 'uni-radio u-mar-b10 u-padd-b20 u-padd-t10 u-bd-b' : 'uni-radio u-padd-t10'">
								<radio :value="item.value" />
								<view>{{ item.name }}</view>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
		</scroll-view>
		<view class="footer-btn u-fx-ac"><u-button @click="confirm" type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg">确认充值</u-button></view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus.js';
export default {
	data() {
		return {
			formData: {},
			current: -1,
			moneyTotal: [50, 100, 200, 500, '其它金额'],
			payModeList: [
				{
					value: '1',
					name: '支付宝支付'
				},
				{
					value: '2',
					name: '微信支付'
				}
			]
		};
	},
	components: {},
	mounted() {},
	methods: {
		changePayMode(e) {
			this.formData.payMode = e.target.value;
			console.log(this.formData.payMode);
		},
		changeMoney(money, index) {
			this.formData.orderAmount = money === '其它金额' ? '' : money;
			this.current = index;
		},
		confirm() {}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 100rpx);
}
.tip::before {
	position: absolute;
	content: '*';
	color: red;
	left: 10rpx;
	width: 10rpx;
	height: 10rpx;
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
.money-num {
	.money-list {
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}
}
/deep/ .uni-radio {
	position: relative;
	uni-radio {
		position: absolute;
		right: 10rpx;
		.uni-radio-input {
			width: 40rpx;
			height: 40rpx;
		}
	}
}
</style>
