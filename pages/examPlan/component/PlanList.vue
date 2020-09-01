<template>
  <view>
    <noData msg="暂无数据~" v-if="dataList.length === 0"></noData>
    <view
      class="approve-list"
      v-for="(item, i) in dataList"
      :key="i"
      @click="goDetail(item.planId)"
    >
      <view class="process-type u-fx">
        <view class="div-btn">
          <image
            v-if="item.state === '0'"
            src="/mobile-img/not_started.png"
            mode=""
            class="img"
          ></image>
          <image
            v-if="item.state === '1'"
            src="/mobile-img/processing.png"
            mode=""
            class="img"
          ></image>
          <image
            v-if="item.state === '2'"
            src="/mobile-img/end.png"
            mode=""
            class="img"
          ></image>
        </view>
      </view>
      <view class="">
        <view class="u-font-3 u-mar-t u-padd-l40"
          >{{ item.planName
          }}<text v-if="isShow" class="u-padd-l40">{{
            item.subjectName
          }}</text></view
        >
        <view class="u-mar-t u-padd-l40 u-type-info" v-if="isShow"
          >{{ item.testRoomName
          }}<text class="u-padd-l40">考试场地: {{ item.placeName }}</text></view
        >

        <view class="u-mar-t u-padd-l40 u-type-info"
          >考试年级：{{ item.gradeName
          }}<text v-if="isShow" class="u-padd-l40"
            >考试范围: {{ item.startNumber }}-{{ item.endNumber }}</text
          ></view
        >
        <view class="u-mar-t u-padd-l40"
          >开考日期：{{ item.testDate | gmtToDate }}</view
        ></view
      >
    </view></view
  >
</template>

<script>
import noData from "@/components/no-data/no-data.vue";
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
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    goDetail(id) {
      this.$emit("goDetail", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.approve-list {
  height: 290rpx;
  background: url(../../../static/img/bac.png) no-repeat;
  background-size: 100% 290rpx;
  padding: $u-mp-20;
  margin: $u-mp-20;
  &:first-child {
    margin-top: 0;
  }
  position: relative;
  .process-type {
    top: 0;
    right: 0;
    position: absolute;
    font-size: 48rpx;
    z-index: 99;
    image {
      width: 141rpx;
      height: 77rpx;
    }
  }
}
</style>
