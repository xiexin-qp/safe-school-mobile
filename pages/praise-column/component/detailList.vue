<template>
  <view>
    <noData msg="暂无数据~" v-if="dataList.length === 0"></noData>
    <view class="u-auto">
      <view class="detail u-mar-l20 u-mar-r20 u-bg-fff u-border-radius">
        <view class="u-fx">
          <view v-for="(item, i) in dataList" :key="i">
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
    </view>
  </view>
</template>

<script>
import noData from "@/components/no-data/no-data.vue";
import index from "../../../config";
export default {
  components: {
    noData,
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.detail {
  .u-padd-l0 {
    padding-left: 20rpx;
  }
  .count {
    position: fixed;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    margin-left: 110rpx;
    z-index: 9;
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
