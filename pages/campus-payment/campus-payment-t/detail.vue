<template>
  <view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="u-padd-30">
                    <image src="/mobile-img/exchange.png"></image>

         </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac">
      <u-button
        type="primary"
        class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg"
        >立即缴费</u-button
      >
    </view>
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
      detail: {},
      userCode: JSON.parse(uni.getStorageSync("protal")).userInfo.userCode,
      schoolInfo: {
        schoolYearId: 0,
        schoolCode: "",
      },
      remark: "",
    };
  },
  created() {
    this.schoolInfo.schoolCode = store.userInfo.schoolCode;
    this.schoolInfo.schoolYearId = store.schoolYear.schoolYearId;
  },
  mounted() {
    this.id = this.$tools.getQuery().get("id");
    this.getDetail();
  },
  methods: {
    async change(type) {},
    async getDetail() {
      let id = this.id;
      const res = await actions.getcollectionDetail(id);
      this.detail = res.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
}
.footer {
  height: 100rpx;
}
.detail {
  margin: $u-mp-40;
}
.process-type {
  top: 0;
  right: 40rpx;
  position: absolute;
  font-size: 48rpx;
}
.u-mar-t20 {
  text:first-child {
    display: flex;
    flex-direction: column;
  }
}
.new-top {
  margin-top: -200rpx;
}
</style>
