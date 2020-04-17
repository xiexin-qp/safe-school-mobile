<template>
  <view class="attendance qui-page">
    <view>
      <view class="calendar">
        <uni-calendar @change="change"></uni-calendar>
      </view>
      <view class="record-box">
        <view class="work-box qui-fx-jsb">
          <view>
            <view v-if="dayInfo && dayInfo.onWorkTime"> 上班打卡 {{ dayInfo.onWorkTime  | formatDate }} </view>
            <view v-else> 上班打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.offState" 
              :class ="[
                { 'unnormal-title': dayInfo.offState === 2 },
                { 'normal-title': dayInfo.offState === 1 },
                { 'absence-title': dayInfo || dayInfo.offState === 3 }, 
                'work-title']"> {{dayInfo.offState | getState}}</view>
              <view v-else class="absence-title"> 缺卡 </view>
          </view>
          <view>
            <image :src="(dayInfo && dayInfo.onSnacpUrl) ? dayInfo.onSnacpUrl : person"></image>
          </view>
        </view>
        <view class="work-box qui-fx-jsb">
          <view class="work-title">
            <view v-if="dayInfo && dayInfo.offWorkTime"> 下班打卡 {{ dayInfo.offWorkTime | formatDate }} </view>
            <view v-else> 下班打卡 --:-- </view>
            <view v-if="dayInfo && dayInfo.onState" 
              :class ="[
                { 'unnormal-title': dayInfo.onState === 2 },
                { 'normal-title': dayInfo.onState === 1 },
                { 'absence-title': dayInfo || dayInfo.onState === 3 }, 
                'work-title']"> {{dayInfo.onState | getState}}</view>
              <view v-else class="absence-title"> 缺卡 </view>
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
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return  h + ':' + m + ':' + s;
    },
    getState: function (value) {
      if (value === 1) {
        return '迟到'
      } else if (value === 2) {
        return '早退'
      } else if (value === 3) {
        return '上学缺卡'
      } else if (value === 4) {
        return '请假'
      } else if (value === 5) {
        return '正常'
      } else if (value === 6) {
        return '放学缺卡'
      } else {
        return '缺卡'
      }
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
        userCode: store.userCode,
        day: this.day
      }
      const res = await actions.getTeacherAttendance(req)
      this.dayInfo = res.data
    },
    change (data) {
      console.log('data',data.fulldate)
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
