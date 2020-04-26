<template>
  <view class="attendance qui-page">
    <view>
      <view class="calendar">
        <uni-calendar @change="change"></uni-calendar>
      </view>
      <view class="record-box">
        <view class="work-box qui-fx-jsb">
          <view>
            <view v-if="dayInfo && dayInfo.onWorkTime"> 上班打卡 {{ dayInfo.onWorkTime  | gmtToDate('time') }} </view>
            <view v-else> 上班打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.onState" 
              :class ="[
                { 'unnormal-title': dayInfo.onState === 1 || dayInfo.onState === 2},
                { 'normal-title': dayInfo.onState === 5 },
                { 'absence-title': dayInfo.onState === 3 || dayInfo.onState === 7 || dayInfo.onState === 4 }, 
                'work-title']"> {{dayInfo.onState | getState}}</view>
          </view>
          <view>
            <image :src="(dayInfo && dayInfo.onSnacpUrl) ? dayInfo.onSnacpUrl : hostEnv.mobile_img + 'child-auto-icon.png'"></image>
          </view>
        </view>
        <view class="work-box qui-fx-jsb">
          <view>
            <view v-if="dayInfo && dayInfo.offWorkTime"> 下班打卡 {{ dayInfo.offWorkTime | gmtToDate('time') }} </view>
            <view v-else> 下班打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.offState" 
              :class ="[
                { 'unnormal-title': dayInfo.offState === 1 || dayInfo.offState === 2 },
                { 'normal-title': dayInfo.offState === 5 },
                { 'absence-title': dayInfo.offState === 6  || dayInfo.offState === 7 || dayInfo.offState === 4}, 
                'work-title']"> {{dayInfo.offState | getState}}</view>
          </view>
          <view>
            <image :src="(dayInfo && dayInfo.offSnacpUrl) ? dayInfo.offSnacpUrl : hostEnv.mobile_img + 'child-auto-icon.png'"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import hostEnv from '@config/index'
import { store, actions } from '../store/index.js'
export default {
  data () {
    return {
			hostEnv,
      dayInfo: {},
      day: new Date()
    }
  },
  mounted () {
    const date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    this.day = y + '-' + m + '-' + d
    this.showList()
  },
  methods: {
    // 正常 迟到(早退) 缺卡 绿色 橙色 红色
    async showList (tag = false) {
      const req ={
        userCode: store.userInfo.userCode,
        day: this.day
      }
      const res = await actions.getTeacherAttendance(req)
      this.dayInfo = res.data
    },
    change (data) {
      this.day = data.fulldate
      this.showList()
    }
  }
}
</script>

<style lang="scss" scoped>
.attendance {
  .record-box {
    margin-top: 20rpx;
    background-color: $uni-bg-color;
    .work-box {
      padding: 30rpx 40rpx;
      border-bottom: 1rpx solid #cfd0d1;
      image {
        height: 80rpx;
        width: 80rpx;
      }
      .work-title {
        margin-top: 20rpx;
      }
      .normal-title {
        color: #48ce92;
      }
      .absence-title {
        color: $tip-color;
        background-color: $main-color;
      }
      .unnormal-title {
        color: #FFCC00;
      }
    }
  }
}
</style>
