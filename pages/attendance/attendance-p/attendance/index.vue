<template>
  <view class="attendance qui-page">
    <view>
      <view class="calendar">
        <uni-calendar @change="change"></uni-calendar>
      </view>
      <view class="record-box">
        <view class="work-box qui-fx-jsb">
          <view>
            <view v-if="dayInfo && dayInfo.onTime"> 上学打卡 {{ dayInfo.onTime  | gmtToDate('time') }} </view>
            <view v-else> 上学打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.onState" 
              :class ="[
                { 'unnormal-title': dayInfo.onState === 2 },
                { 'normal-title': dayInfo.onState === 1 },
                { 'absence-title': dayInfo || dayInfo.onState === 3 }, 
                'work-title']"> {{dayInfo.onState | getState}}</view>
          </view>
          <view>
            <image :src="(dayInfo && dayInfo.onSnacpUrl) ? dayInfo.onSnacpUrl : person"></image>
          </view>
        </view>
        <view class="work-box qui-fx-jsb">
          <view>
            <view v-if="dayInfo && dayInfo.offTime"> 放学打卡 {{ dayInfo.offTime | gmtToDate('time') }} </view>
            <view v-else> 放学打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.offState" 
              :class ="[
                { 'unnormal-title': dayInfo.offState === 2 },
                { 'normal-title': dayInfo.offState === 1 },
                { 'absence-title': dayInfo || dayInfo.offState === 3 }, 
                'work-title']"> {{dayInfo.offState | getState}}</view>
          </view>
          <view>
            <image :src="(dayInfo && dayInfo.offSnacpUrl) ? dayInfo.offSnacpUrl : person"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import person from '@s/img/person.png'
import { store, actions } from '../store/index.js'
export default {
  data () {
    return {
      person,
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
        studentCode: store.userInfo.userCode,
        day: this.day
      }
      const res = await actions.getChildAttendance(req)
      this.dayInfo = res.data
    },
    change (data) {
      this.day = data.fulldate
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped>
.attendance {
  .record-box {
    margin-top: 20rpx;
    background-color: #fff;
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
        color: #FF0000;
      }
      .unnormal-title {
        color: #FFCC00;
      }
    }
  }
}
</style>
