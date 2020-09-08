<template>
  <view>
    <noData msg="暂无数据~" v-if="dataList.length === 0"></noData>
    <view class="u-auto">
      <view
        class="u-mar u-padd-30 u-type-white-bg u-border-radius"
        v-for="(item, i) in dataList"
        :key="i"
      >
        <view class="u-fx-ac">
          <view class="img_">
            <image src="/mobile-img/lost.png"></image>
          </view>
          <view class="u-mar-l">{{ item.content }}</view></view
        >
        <view class="u-bd-x u-mar-t20 u-mar-b20"></view>
        <view class="u-fx-jsb">
          <view class=" u-tips-color">{{ item.createTime | gmtToDate("dateTime") }}</view>
          <view class=" u-tips-color">{{ item.createUserName }}</view></view
        >
      </view>
    </view>
  </view>
</template>

<script>
import noData from "@/components/no-data/no-data.vue";
export default {
    components: {
    noData,
  },
  props: {
    isClose: {
      type: Boolean,
      default: false,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
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
.img_{
image {
  width: 50rpx;
  height: 50rpx;
}
}
.u-bd-x {
  border-top: 1px dashed #eee;
}
</style>
