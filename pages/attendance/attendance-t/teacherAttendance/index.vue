<template>
  <view class="attendance u-page">
    <view>
      <view class="calendar">
        <uni-calendar @change="change" @monthSwitch="monthSwitch" :selected="selected"></uni-calendar>
      </view>
      <view class="record-box u-padd-l40 u-padd-r40 u-padd-t20 u-padd-b10">
        <view v-for="(i,index) in tagList" :key="index">
          <view class="title"> 
            <u-tag :text="i.title" mode="dark" />
          </view>
          <view class="u-fx-ac u-mar-b20" v-for="(el,index) in classList" :key="index"> 
            <text class="title">{{el.title}}</text>
            <view class="u-fx-f1 u-fx-jsb u-padd-l40"> 
              <view class="u-fx-f1" v-for="(item,i) in stateList" :key="i"> 
                <view class="u-fx-ver u-fx-ac">
                  <view >{{ (el.title === '下班' && item.key === '2') ? '早退' : item.title}}</view>
                  <view class="u-mar-t10">3343人</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { store, actions } from '../store/index.js'
export default {
  data () {
    return {
      dayInfo: {},
      day: new Date(),
      mounth: new Date(),
      selected: [],
      tagList: [
        {
          title: '上午'
        },
        {
          title: '下午'
        }
      ],
      classList: [
        {
          title: '上班'
        },
        {
          title: '下班'
        }
      ],
      stateList: [
        {
          key: '1',
          title: '正常'
        },
        {
          key: '2',
          title: '迟到'
        },
        {
          key: '3',
          title: '缺卡'
        }
      ],
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
  height: calc(100vh - 10rpx);
  overflow-y: scroll;
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
.title {
  width: 160rpx;
  border: 1px solid #ccc;
  text-align: right;
}
</style>
