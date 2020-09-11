<template>
  <view class="u-page">
    <scroll-view scroll-y="true" class="scroll-h">
      <no-data v-if="detail.length === 0" msg="暂无数据"></no-data>
      <view class="detail u-mar-l20 u-mar-r20 u-bg-fff u-border-radius">
        <view class="u-fx">
          <view v-for="(item, i) in detail" :key="i">
            <view class="u-padd-40">
              <view
                class="count u-type-primary-dark-bg u-type-white u-border-radius-all"
                >{{ item.count }}</view
              >
              <u-lazy-load
                class="img u-border-radius-all"
                :image="item.photoUrl"
              ></u-lazy-load>
              <view class="title u-main-color u-bold u-padd-l0 u-mar-t20">{{
                item.label
              }}</view></view
            >
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import eventBus from "@u/eventBus";
import { store, actions } from "../store/index.js";
import hostEnv from "../../../../config/index.js";
export default {
  components: {},
  data() {
    return {
      detail: {},
      id: "",
    };
  },
  mounted() {
    const id = this.$tools.getQuery().get("id");
    this.getDetail();
  },
  methods: {
    async getDetail(id) {
      const req = {
        praiseCode: id,
        schoolCode: store.userInfo.schoolCode,
      };
      const res = await actions.getfindPraise(req);
      this.detail = res.data.map((el) => {
        return {
          ...el,
          photoUrl: "/mobile-img/medal.png",
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh);
  margin-top: 20rpx;
}
.detail {
  .u-padd-l0 {
    padding-left: 20rpx;
  }
  .count {
    position: fixed;
    width: 40rpx;
    height: 40rpx;
    top: 40rpx;
    text-align: center;
    margin-left: 110rpx;
    z-index: 999;
  }
}
.detail:nth-child(odd) {
  .sub {
    color: $u-type-primary;
    background-color: $u-type-primary-light;
  }
}
.detail:nth-child(even) {
  .sub {
    color: $u-type-success;
    background-color: $u-type-success-light;
  }
}
.img {
  width: 160rpx;
  height: 160rpx;
}
</style>
