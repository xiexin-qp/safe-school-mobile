<template>
  <view class="statistics qui-page qui-fx qui-fx-ver">
      <view>
        <view class="calendar">
          <view class="year qui-fx-ac-jc">2020年</view>
          <view class="month qui-fx-ac-jc" v-for="item in monthList" :key="item.id">{{item.month}}月</view>
        </view>
        <view class="record-box">
          <view class="attandence-title qui-fx-ac-jc">上下学考勤统计</view>
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
      </view>
     <uni-popup ref="popup" type="center">
       	<scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
          <view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
            <text>{{ list.name }}</text>
            <image :src="person" mode=""></image>
          </view>
        </scroll-view>
     </uni-popup>
  </view>
</template>

<script>
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
import { store, actions } from '../store/index.js'
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
      leaveList: [],
      exceptionList: [],
      zcList: [],
      currentDay: '',
      isOther: false,
      dataList: [{
        id:'1',
        name:'1'
      },{
        id:'2',
        name:'1'
      }],
      attandenceInfo:[{
        title:'正常',
        num:38
      },{
        title:'上学缺卡',
        num:2
      },{
        title:'迟到',
        num:7
      },{
        title:'早退',
        num:4
      },{
        title:'放学缺卡',
        num:9
      },{
        title:'缺勤',
        num:13
      }],
      monthList:[{
        id: 1,
        month: 1
      },{
        id: 2,
        month: 2
      },{
        id: 3,
        month: 3
      },{
        id: 4,
        month: 4
      },{
        id: 5,
        month: 5
      },{
        id: 6,
        month: 6
      }]
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
.statistics{
  .calendar{
    height: 200rpx;
    background-color: #0079ff;
    color:#fff;
    .year{
      height: 100rpx;
      font-weight: bold;
    }
    .month{
      width: 16.3%;
      float: left;
    }
  }
  .record-box{
    padding-top:20rpx;
    background-color:#f2f8fe;
    .attandence-title{
      height: 60rpx;
      line-height: 60rpx;
      font-size: 36rpx;
    }
    .attandence-box{
      height: 450rpx;
      :nth-child(3n){
        border-right: none;
      }
      .attandence-info{
        width: 31%;
        float: left;  
        margin-bottom: 30rpx;
        background-color: #fff;
        margin: 15rpx 0 5rpx 15rpx;
        padding: 20rpx 0;
        border-radius: 15rpx;
        image {
          width: 60rpx;
          height: 60rpx;
          margin-bottom: 10rpx;
        }
         .attandence-num{
          color: #ccc;
          font-size: 28rpx;
        }
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
}
</style>