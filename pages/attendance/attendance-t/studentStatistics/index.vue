<template>
  <view class="stundent-statistics qui-page">
    <view>
      <view class="title qui-fx-ac">
        <image :src="person" mode=""></image>
        <view>学生D 2月考勤统计</view>
      </view>
      <view class="record-box">
        <view class="attandence-box">
          <view 
            class="attandence-info qui-fx-ac-jc" 
            v-for="item in attandenceInfo" 
            :key="item.id"
            @click="detail(item)"
          >
            <image :src="normal" mode=""></image>
            <view> {{item.title}}</view>
            <view class="attandence-num"> {{item.num}}人</view>
          </view>
        </view>
      </view>
      <view class="title qui-fx-ac">
        <image :src="person" mode=""></image>
        <view>学生D 2月考勤记录</view>
      </view>
      <scroll-view scroll-y="true" class="scroll">
        <steps></steps>
      </scroll-view>
      </view>
    <uni-popup ref="popup" type="center">
     	<scroll-view scroll-y="true" class="scroll-h">
        <view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
          <text>{{ list.name }}</text>
          <image :src="person" mode=""></image>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import steps from './steps.vue'
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
import { store, actions } from '../store/index.js'
export default {
  components: {
    steps
  },
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
      leaveList: [],
      exceptionList: [],
      zcList: [],
      currentDay: '',
      isOther: false,
      dataList: [],
      attandenceInfo:[]
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
  	async showList () {
      const req = {
				month: '2020-04',
				studentCode: store.userInfo.studentCode
			}
      const res = await actions.studentMonthStatic(req)
			this.attandenceInfo = [{
        title: '正常',
        state: '5',
        num: res.data.normalCount
      },{
        title: '上学缺卡',
        state: '3',
        num: res.data.onNoRecordCount
      },{
        title: '迟到',
        state: '1',
        num: res.data.lateCount
      },{
        title: '早退',
        state: '2',
        num: res.data.earlyCount
      },{
        title: '放学缺卡',
        state: '6',
        num: res.data.offNoRecordCount
      },{
        title: '缺勤',
        state: '7',
        num: res.data.noRecord
      }]
		},
    detail (item) {
      console.log('item',item)
      this.$refs.popup.open()
    }
  },
  
}
</script>

<style lang="less" scoped>
.stundent-statistics {
    background-color: #f1f8ff;
    .title {
      height: 80rpx;
      background-color: #fff;
      justify-content: center;
      image {
        width: 50rpx;
        height: 50rpx;
        margin-right: 10rpx;
        border-radius: 50%;
      }
    }
    .record-box {
      background-color:#f2f8fe;
      .attandence-box {
        height: 425rpx;
        .attandence-info {
          width: 29.8%;
          float: left;  
          background-color: #fff;
          margin: 15rpx 0 5rpx 20rpx;
          padding: 20rpx 0;
          border-radius: 15rpx;
          image {
            width: 60rpx;
            height: 60rpx;
            margin-bottom: 10rpx;
          }
          .attandence-num {
            color: #ccc;
            font-size: 28rpx;
          }
        }
        :nth-child(3n) {
          border-right: none;
        }
      }
    }
  .scroll-h {
    height: 70vh;
    .list {
      padding: 15rpx 25rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
  .scroll {
    height: calc(100vh - 620rpx);
    background-color: #fff;
    margin-top: 15rpx;
  }
}
</style>