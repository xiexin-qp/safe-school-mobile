<template>
  <view class="attendance u-page">
    <view>
      <view class="calendar">
        <uni-calendar @change="change" @monthSwitch="monthSwitch" :selected="selected"></uni-calendar>
      </view>
      <view class="record-box u-padd-l40 u-padd-r40 u-padd-t20 u-padd-b10">
        <view class="title u-fx-ac"> 
          <u-icon name="/mobile-img/kq-shijian.png" size="32"></u-icon>
          <view class="u-mar-l10">打卡记录</view> 
        </view>
        <scroll-view scroll-y="true" class="scroll u-mar-t20">
          <steps :studentCode="studentCode" :month="month"></steps>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { store, actions } from '../store/index.js'
import steps from './steps.vue'
export default {
  components: {
    steps
  },
  data () {
    return {
      dayInfo: {},
      day: new Date(),
      mounth: new Date(),
      selected: [],
      studentCode: '',
      studentName: '',
      month: ''
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
    this.mounth = y + '-' + m
    this.showState()
    this.showList()
  },
  methods: {
    // 正常 迟到(早退) 缺卡 绿色 橙色 红色
    async showState () {
      const req = {
        userCode: store.userInfo.userCode,
        month: this.mounth
      }
      const res = await actions.teacherStaticState(req)
      res.data.forEach(ele => {
        if (!ele.staue) {
          this.selected.push({	
            date: this.$tools.getDateTime(ele.date)
          })
        }
      })
    },
    monthSwitch (item) {
      this.mounth=`${item.year}-${ item.month < 10 ? ('0' + item.month) : item.month }`
      this.day = ''
      this.showState()
      this.showList()
    },
    async showList () {
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
      border-bottom: 1rpx solid ￥u-border-color-dark;
      image {
        height: 80rpx;
        width: 80rpx;
      }
      .work-title {
        margin-top: 20rpx;
      }
      .normal-title {
        color: $u-type-success;
      }
      .absence-title {
        color: $u-tips-color;
      }
      .unnormal-title {
        color: $u-type-warning;
      }
    }
  }
}
.scroll {
  height: calc(100vh - 900rpx);
}
</style>
