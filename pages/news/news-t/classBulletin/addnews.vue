<template>
  <view class="add">
    <scroll-view @refresherpulling="haha" scroll-y="true"  class="scroll-h">
    <view class="qui-fx-ac qui-bd-b item-list">
      <view>标题：</view>
      <view class="qui-fx-f1"><input class="item-input"/></view>
    </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>正文：</view>
        <view class="qui-fx-f1">
          <textarea class="item-input" />
          <view class="text_num">0/800</view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>图片上传：</view>
        <view class="qui-fx-f1"><textarea class="item-input" /></view>
      </view>
    </scroll-view>
    <view class="submit-box"><view class="btn">提交</view></view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  async mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.add {
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .item-list {
    padding: 25rpx 15rpx;
    background-color: #fff;
    .item-input {
      width: 100%;
      font-size: 26rpx;
      color: #999;
    }
    .radio {
      padding-left: 25rpx;
    }
    .text_num {
      text-align: right;
      color: #999;
    }
  }
  .submit-box {
    height: 100rpx;
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      margin: 0 20rpx;
      background-color: $main-color;
      color: #fff;
      border-radius: $radius;
    }
  }
}
</style>
