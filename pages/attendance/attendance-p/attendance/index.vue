<template>
  <view class="attendance qui-page qui-fx qui-fx-ver">
    <view>
        <view class="calendar">
          <uni-calendar @change="getDate"></uni-calendar>
        </view>
        <view class="record-box">
          <no-data msg="暂无考勤记录~" v-if="dayInfo.length === 0"></no-data>
          <view class="work-box qui-fx-jsb">
            <view>
              <view> 上班打卡  08:00 </view>
              <view class="work-title normal-title" style=""> 正常</view>
            </view>
            <view> <image :src="person" mode=""></image> </view>
          </view>
          <view class="work-box qui-fx-jsb">
            <view class="work-title">
              <view> 下班打卡  --:-- </view>
              <view class="work-title unnormal-title"> 异常</view> 
            </view>
            <view> <image :src="person" mode=""></image> </view>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import person from '@s/img/person.png'
// import { store, actions } from './store/index.js'
export default {
  data () {
    return {
      person,
      dayInfo: [
        {
          id:1,
          workOnTime:'2020-03-30',
          recordOnTime:'2020-03-30',
          stateOn:1
        }
      ]
    }
  },
  methods: {
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
        margin-top: 10rpx;
      }
      .normal-title{
        color: #48ce92;
      }
      .unnormal-title{
        color: #f90000;
      }
    }
  }
}
</style>
