<template>
  <view class="notice">
    <view v-for="notice in noticeList" :key="notice.id" class="notice-list qui-bd-b">
      <text class="title qui-te">{{ notice.title }}</text>
      <view class="content qui-fx qui-te2">{{ notice.content }}</view>
      <text class="time">{{ notice.createDate }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      noticeList : {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notice-list {
    background-color: #fff;
    padding: 20rpx;
    .title {
      font-size: $font-middle;
    }
    .content {
      padding: 20rpx 0;
      text-indent: 50rpx;
      line-height: 40rpx;
      color: $des-color;
    }
    .time {
      color: $des-color;
      font-size: $font-second;
    }
  }
</style>
