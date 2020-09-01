<template>
  <view class="message">
    <view class="u-fx-jc">
      <view class="tab-title u-fx">
        <view v-for="tab in tabList" :key="tab.id" @click="changeTab(tab)" :class="{'act': tabIndex === tab.id}" class="tab">
          {{ tab.title }}
        </view>
      </view>
    </view>
    <no-data></no-data>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        tabIndex: 0,
        tabList: [
          {
            id: 0,
            title: '应用消息'
          },
          {
            id: 1,
            title: '通知公告'
          },
          {
            id: 2,
            title: '系统消息'
          }
        ]
      }
    },
    methods: {
      changeTab (tab) {
        this.tabIndex = tab.id
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message {
    background-color: #fff;
    padding: 20rpx 0;
  }
  .tab-list {
    background-color: #fff;
  }
  .tab-title {
    margin: 10rpx 0 20px;
    border: 1px $u-border-color solid;
    overflow: hidden;
    border-radius: 10rpx;
    .tab {
      line-height: 60rpx;
      height: 60rpx;
      padding: 0 44rpx;
      border-left: 1px $u-border-color solid;
      &:first-child {
        border-left: none;
      }
    }
    .act {
      background-color: $u-type-primary;
      color: #fff;
    }
  }
</style>
