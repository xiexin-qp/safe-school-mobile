<template>
  <view class="detail qui-page qui-fx qui-fx-ver">
      <view>
        <view class="leave-detail qui-fx-ver">
          <view class="leave-info qui-fx-jsb qui-fx-ac">
            <view class="leave-name">张倩 事假4小时</view>
            <view class="leave-state">出校</view>
          </view>
          <view class="leave-time qui-fx-jsb">
            <view class="qui-fx"> 
              <view class="leave-icon">起</view>
              <view>
                <view>2020年3月30日</view>
                <view>12:00</view>
              </view>
            </view>
            <view class="qui-fx"> 
              <view class="leave-icon">止</view>
              <view>
                <view>2020年3月31日</view>
                <view>12:00</view>
              </view>
            </view>
          </view>
        </view>
        <view class="leave-remark">家长有急事</view>
        <view class="apply-box qui-fx-ac">
          <view class="qui-fx-ver qui-fx-ac">
            审批人
            <image :src="person" mode=""></image>
             赵青
          </view>
          <view class="apply-content qui-fx-ver">
            <view class="apply-status">审批通过</view>
            <view class="apply-time">2020年3月20日 11:39</view>
          </view>
        </view>
        <view class="apply-box qui-fx-ac">
          <view class="qui-fx-ver qui-fx-ac">
            抄送人
            <image :src="person" mode=""></image>
             吴启迪
          </view>
          <view class="apply-content qui-fx-ver">
            <view class="apply-status">未读</view>
            <view class="apply-time">--：--</view>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
// import { store, actions } from './store/index.js'
export default {
  data () {
    return {
      person,
      normal,
      dayInfo: [
        {
          id:1,
          workOnTime:'2020-03-30',
          recordOnTime:'2020-03-30',
          stateOn:1
        }
      ],
    }
  },
  methods: {
    detail(item){
      console.log('item',item)
      this.$refs.popup.open()
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .leave-detail {
    height: 250rpx;
    background-color: #f3f9ff;
    .leave-info {
      height: 120rpx;
      padding-left: 20rpx;
      .leave-name {
        font-size: 36rpx;
      }
      .leave-state {
        width: 150rpx;
        height: 55rpx;
        line-height: 55rpx;
        background-color: #6d7cff;
        border-radius: 50rpx 0 0 50rpx;
        color: #fff;
        font-size: 34rpx;
        text-align: center;
      }
    }
    .leave-time {
      padding: 20rpx;
      .leave-icon {
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        width: 70rpx;
        border-radius: 50%;
        background-color: #b5c7ff;
        color: #fff;
        font-size: 32rpx;
        margin-right: 20rpx;
      }
    }  
  }
  .leave-remark {
    height: 100rpx;
    line-height: 90rpx;
    padding-left: 20rpx;
    background-color: #fff;
  }
  .apply-box {
    height: 280rpx;
    background-color: #fff;
    padding: 40rpx;
    margin-top: 1rpx solid #f0f1f2;
    image {
      width: 100rpx;
      height: 100rpx;
      margin: 25rpx 20rpx;
      border-radius: 50%;
    }
    .apply-content {
      margin-left: 40rpx;
      .apply-status {
        color: #00b800;
      }
      .apply-time {
        color: #dadbdc;
        margin-top:10rpx;
      }
    }
  }
}
</style>