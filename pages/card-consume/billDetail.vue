<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h">
			<view v-if="tradeType === '1'" class="">
				<view class="detail-info u-fx-ac-jc u-bg-fff u-mar-b20 u-padd-20">
					<view class="name u-mar-10 u-fw-5 u-fx-ac">
						<image class="icon u-mar-r20" src="/mobile-img/chongzhi@2x.png" mode=""></image>
						<text class="warning">{{ tradeType | getTradeType }}</text>
					</view>
					<view class="money u-tx-c u-mar-20 u-bold">{{ accountDetail.consumeAmount }}</view>
					<view class="u-font-01 u-type-info u-tx-c u-mar-10">{{ accountDetail.consumeStatus | getTradeStatus }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>消费金额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.consumeAmount }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>优惠：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.discountAmount }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>用户姓名：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.userName }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>消费设备：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.deviceName }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>消费方式：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.consumeType | getConsumeType }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>消费时间：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.consumeTime }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.billNo }}</view>
				</view>
			</view>
			<view v-if="tradeType === '2'" class="">
				<view class="detail-info u-fx-ac-jc u-bg-fff u-mar-b20 u-padd-20">
					<view class="name u-mar-10 u-fw-5 u-fx-ac">
						<image class="icon u-mar-r20" src="/mobile-img/chongzhi@2x.png" mode=""></image>
						<text class="warning">{{ tradeType | getTradeType }}</text>
					</view>
					<view class="money u-tx-c u-mar-20 u-bold">{{ accountDetail.rechargeAmount }}</view>
					<view class="u-font-01 u-type-info u-tx-c u-mar-10">{{ accountDetail.status | getTradeStatus }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>充值金额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.rechargeAmount }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>赠送：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.discountAmount }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>用户姓名：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.userName }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>充值方式：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.remark }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>支付方式：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.rechargeType === '1' ? '线上' : '线下' }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>充值时间：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.createTime }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.billNo }}</view>
				</view>
			</view>
			<view v-if="tradeType === '3'" class="">
				<view class="detail-info u-fx-ac-jc u-bg-fff u-mar-b20 u-padd-20">
					<view class="name u-mar-10 u-fw-5 u-fx-ac">
						<image class="icon u-mar-r20" src="/mobile-img/buzhu@2x.png" mode=""></image>
						<text class="primary">{{ tradeType | getTradeType }}</text>
					</view>
					<view class="money u-tx-c u-mar-20 u-bold">{{ accountDetail.rechargeAmount }}</view>
					<view class="u-font-01 u-type-info u-tx-c u-mar-10">{{ accountDetail.status | getTradeStatus }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>补助金额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.rechargeAmount }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>赠送：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.discountAmount }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>用户姓名：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.userName }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>补助时间：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.createTime }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.billNo }}</view>
				</view>
			</view>
			<view v-if="tradeType === '4'" class="">
				<view class="detail-info u-fx-ac-jc u-bg-fff u-mar-b20 u-padd-20">
					<view class="name u-mar-10 u-fw-5 u-fx-ac">
						<image class="icon u-mar-r20" src="/mobile-img/tuikuan@2x.png" mode=""></image>
						<text class="error">{{ tradeType | getTradeType }}</text>
					</view>
					<view class="money u-tx-c u-mar-20 u-bold">{{ accountDetail.returnAmount }}</view>
					<view class="u-font-01 u-type-info u-tx-c u-mar-10">{{ accountDetail.returnStatus | getTradeStatus }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>退款金额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.returnAmount }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>用户姓名：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.userName }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>原消费账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.origBillNo }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>退款时间：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.createTime }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.billNo }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>备注：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.remark }}</view>
				</view>
			</view>
			<view v-if="tradeType === '5'" class="">
				<view class="detail-info u-fx-ac-jc u-bg-fff u-mar-b20 u-padd-20">
					<view class="name u-mar-10 u-fw-5 u-fx-ac">
						<image class="icon u-mar-r20" src="/mobile-img/yueqingling@2x.png" mode=""></image>
						<text class="info">{{ tradeType | getTradeType }}</text>
					</view>
					<view class="money u-tx-c u-mar-20 u-bold">{{ accountDetail.clearAmount }}</view>
					<view class="u-font-01 u-type-info u-tx-c u-mar-10">{{ accountDetail.clearStatus | getTradeStatus }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>清零余额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.clearAmount }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>清零押金：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.clearDeposit }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>退还余额：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.returnAmount }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>退还押金：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.returnDeposit }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>用户姓名：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.userName }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>清零时间：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.createTime }}</view>
				</view>
				<view class="u-fx-ac item-list">
					<view>账单号：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.billNo }}</view>
				</view>
				<view class="u-fx-ac u-bd-b item-list">
					<view>备注：</view>
					<view class="u-fx-f1 u-fx-je u-tips-color u-mar-r10">{{ accountDetail.remark }}</view>
				</view>
			</view>
		</scroll-view>
		<view class="footer-btn u-fx-ac"><u-button @click="confirm" type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg">返回</u-button></view>
	</view>
</template>

<script>
import { actions } from './store/index.js';
export default {
	data() {
		return {
			tradeType: '0',
			accountDetail: {}
		};
	},
	components: {},
	mounted() {
		this.tradeType = this.$tools.getQuery().get('type');
		this._getAccountInfo();
	},
	methods: {
		// 账单详情
		async _getAccountInfo() {
			const res = await actions.getBillDetail({
				billNo: this.$tools.getQuery().get('id'),
				tradeType: this.tradeType
			});
			if (!res.data || res.data.length === 0) {
				return;
			}
			this.accountDetail = res.data;
		},
		confirm() {
			this.$tools.navTo({
				url: `./index`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 100rpx);
}
.item-list {
	padding: 25rpx 10rpx 25rpx 30rpx;
	background: $uni-bg-color;
}
.name {
	font-size: 40rpx;
}
.money {
	font-size: 60rpx;
}
.icon {
	width: 50rpx;
	height: 40rpx;
}
.u-fw-5 {
	font-weight: 500;
}
.primary {
	color: $u-type-primary;
}
.success {
	color: $u-type-success;
}
.error {
	color: $u-type-error;
}
.warning {
	color: $u-type-warning;
}
.info {
	color: $u-type-info;
}
</style>
