<template>
  <view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="u-padd-40">
        <view class="u-fx-jc">
          <view class="u-fx-ac">
            <view v-if="detail.billStatus === '1'"
              ><image class="app-icon" src="/mobile-img/ic_waitpaid.png"></image
            ></view>
            <view v-if="detail.billStatus === '2'"
              ><image class="app-icon" src="/mobile-img/ic_succeed.png"></image
            ></view>
            <view v-if="detail.billStatus === '4'"
              ><image class="app-icon" src="/mobile-img/ic_fail.png"></image
            ></view>
            <view
              class="u-mar-l u-font-3 u-type-warning"
              v-if="detail.billStatus === '1'"
              >待支付</view
            >
            <view
              class="u-mar-l u-font-3 u-type-success"
              v-if="detail.billStatus === '2'"
              >已支付</view
            >
            <view
              class="u-mar-l u-font-3 u-type-error"
              v-if="detail.billStatus === '4'"
              >已逾期</view
            >
          </view>
        </view>
        <view class="u-fx-jc u-mar-t20 u-font-1">{{
          this.detail.billName
        }}</view>
        <view class="u-fx-jc u-mar-t20 u-font-32"
          >{{ this.detail.billMoney }}.00</view
        ></view
      >
      <view class="u-padd-40 u-bg-fff">
        <view class="u-fx-jsb u-mar-t20">
          <view>姓名</view> <view>{{ this.detail.studentName }}</view></view
        >
        <view class="u-fx-jsb u-mar-t20">
          <view>学校</view> <view>{{ this.detail.schoolYearName }}</view></view
        >
        <view class="u-fx-jsb u-mar-t20">
          <view>班级</view> <view>{{ this.detail.className }}</view></view
        >
        <view class="u-bd-x u-mar-t20 u-mar-b20"></view>
        <view
          class="u-fx-jsb u-mar-t20"
          v-for="(item, i) in chargeList"
          :key="i"
        >
          <view>{{ item.itemName }}</view>
          <view>{{ item.moneySum }}.00</view></view
        >
        <view class="u-fx-je u-mar-t20">
          <view>总计：{{ this.detail.billMoney }}.00</view></view
        >
        <view class="u-fx-je u-mar-t20">
          <view></view> <view>优惠：{{ this.detail.preMoney }}.00</view></view
        >
        <view class="u-fx-je u-mar-t20">
          <view>应付：{{ this.detail.recMoney }}.00</view></view
        >
      </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac"
      ><u-button
        type="primary"
        class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg"
        >立即缴费</u-button
      ></view
    >
  </view>
</template>
<script>
import { store, actions } from "./store/index.js";
import eventBus from "@u/eventBus";
export default {
  components: {},
  data() {
    return {
      id: "",
      taskCode: "",
      detail: {},
      chargeList: [],
    };
  },
  created() {},
  mounted() {
    this.id = this.$tools.getQuery().get("id");
    this.taskCode = this.$tools.getQuery().get("taskCode");
    this.getDetail();
  },
  methods: {
    async change(type) {},
    async getDetail() {
      let id = this.id;
      let taskCode = this.taskCode;
      const res = await actions.getbillDetail(id);
      const cha = await actions.getCharge(taskCode);
      this.detail = res.data;
      this.chargeList = cha.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
  .app-icon {
    height: 66rpx;
    width: 66rpx;
  }
  .u-font-32 {
    font-size: 32px;
  }
  .u-bd-x {
    border-top: 1px solid #f2f2f2;
  }
}
</style>
