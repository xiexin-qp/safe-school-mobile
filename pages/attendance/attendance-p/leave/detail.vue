<template>
  <view class="detail qui-page qui-fff">
      <scroll-view scroll-y="true" class="scroll-h">
      <view class="leave-detail qui-fx-ver">
        <view class="leave-info qui-fx-jsb qui-fx-ac">
          <view class="leave-name"> {{ dayInfo.userName }} {{ dayInfo.reason }} {{ dayInfo.duration }}小时 </view>
          <view class="leave-state"> {{dayInfo.outSchool === 'Y' ? '出校' : '不出校'}} </view>
        </view>
        <view class="leave-time qui-fx-jsb">
          <view class="qui-fx"> 
            <view class="leave-icon"> 起 </view>
            <view>
              <view> {{ dayInfo.startTime | gmtToDate('date') }} </view>
              <view> {{ dayInfo.startTime | gmtToDate('time') }} </view>
            </view>
          </view>
          <view class="qui-fx"> 
            <view class="leave-icon"> 止 </view>
            <view>
              <view> {{ dayInfo.endTime | gmtToDate('date') }} </view>
              <view> {{ dayInfo.endTime | gmtToDate('time') }} </view>
            </view>
          </view>
        </view>
      </view>
      <scroll-view scroll-y="true" class="scroll">
        <view class="leave-remark"> {{ dayInfo.remark ? dayInfo.remark : '暂无' }} </view>
      </scroll-view>
      <view>
        <view class="apply-person">审批人</view>
        <view class="apply-box qui-fx-ac">
          <view class="qui-fx-ver qui-fx-ac qui-fx-f1">
            <image :src="dayInfo.leaveApprovalAddDto && dayInfo.leaveApprovalAddDto.photoUrl ? dayInfo.leaveApprovalAddDto.photoUrl : '/mobile-img/child-auto-icon.png'" mode=""></image>
            {{ dayInfo.leaveApprovalAddDto ? dayInfo.leaveApprovalAddDto.userName : '' }}
          </view>
          <view class="apply-content qui-fx-ver qui-fx-f2">
            <view class="apply-status"> {{ dayInfo.state | approveState }} </view>
            <view class="apply-time"> {{ dayInfo.approvalTime | gmtToDate }} </view>
          </view>
        </view>
      </view>
      <view>
        <view class="apply-person">抄送人</view>
        <view class="apply-box qui-fx-ac" v-for="copyer in dayInfo.leaveCopyList" :key="copyer.userCode">
          <view class="qui-fx-ver qui-fx-ac qui-fx-f1">
            <image :src="copyer.photoUrl ? copyer.photoUrl : '/mobile-img/child-auto-icon.png'" mode=""></image>
            {{ copyer.userName }}
          </view>
          <view class="apply-content qui-fx-ver qui-fx-f2">
            <view :class="['apply-status', { 'un-read' : copyer.state === '0' }]"> {{ copyer.state | getRead }} </view>
            <view class="apply-time"> {{ copyer.readTime | gmtToDate }} </view>
          </view>
        </view>
      </view>
     </scroll-view>
  </view>
</template>

<script>
import { actions } from '../store'
export default {
  data () {
    return {
      dayInfo: { }
    }
  },
  onLoad(options) {
    this.detailGet(options.id)
  },
  methods: {
    async detailGet (id) {
      const res = await actions.studentLeaveDetail(id)
      this.dayInfo = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .leave-detail {
    height: 250rpx;
    background-color: $u-bg-color;
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
        background-color: $u-type-primary;
        border-radius: 50rpx 0 0 50rpx;
        color: $uni-bg-color;
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
        background-color: $u-type-primary-disabled;
        color: $uni-bg-color;
        font-size: 32rpx;
        margin-right: 20rpx;
      }
    }  
  }
  .leave-remark {
    height: 100rpx;
    padding: 20rpx;
  }
  .apply-box {
    height: 280rpx;
    background-color: $uni-bg-color;
    padding: 40rpx;
    margin-top: 1rpx solid $u-border-color-one;
    image {
      width: 100rpx;
      height: 100rpx;
      margin: 25rpx 20rpx;
      border-radius: 50%;
    }
    .apply-content {
      margin-left: 40rpx;
      .apply-status {
        color: $u-type-success;
      }
      .un-read {
        color: $u-type-error;
      }
      .apply-time {
        color: $u-border-color;
        margin-top:10rpx;
      }
    }
  }
}
.scroll-h{
  height: 100vh;
}
.apply-person {
  margin: 0 0 10rpx 20rpx;
}
</style>