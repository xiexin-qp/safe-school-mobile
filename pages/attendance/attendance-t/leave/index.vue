<template>
  <view class="leave qui-page">
    <view class="nav-tab">
      <view class="nav-item" v-for="item in navs" :key="item.id">{{item.name}}</view>
    </view>
    <view class="dropDown qui-fx">
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value0" :list="casueList"></ms-dropdown-item>
      </ms-dropdown-menu>
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value1" :list="dateList"></ms-dropdown-item>
      </ms-dropdown-menu>
        <ms-dropdown-menu>
        <ms-dropdown-item v-model="value2" :list="dataList"></ms-dropdown-item>
      </ms-dropdown-menu>
    </view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="content">
        <view class="record-box">
          <!-- <no-data msg="暂无考勤记录~" v-if="dayInfo.length === 0"></no-data> -->
          <view class="leave-box" v-for="(item,index) in 10" :key="index">
            <view class="leave-top qui-fx-jsb">
              <view class="leave-title">事假 </view>
              <view class="leave-icon" @click="detail(item)"> ...</view>
            </view>
            <view class="leave-info"> 
              <view class="leave-pur">开始时间：2020年3月20日 12:00</view>
              <view class="leave-pur">结束时间：2020年3月21日 12:00</view>
              <view class="leave-pur">描述：家里有急事</view>
              <view class="leave-pur">状态：待审批</view>
            </view>
            <view class="leave-bottom qui-fx-jsb">
              <view class="leave-time">2020年3月20日 10:00 </view>
              <view class="leave-detail" style=""> 查看详情 > </view>
            </view>
          </view>
        </view>
      </view>
     </scroll-view>
     <view class="add-icon">
      <image :src="add" mode=""></image>
     </view>
  </view>
</template>

<script>
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
import person from '@s/img/person.png'
import add from '@s/img/add.png'
import { store, actions } from '../store/index.js'
export default {
  components: {
    msDropdownMenu,
    msDropdownItem
  },
  data () {
    return {
      add,
      person,
      dayInfo: [],
      leaveList: [],
      dataList: [],
      navs:[{
        id: '1',
        name: '我的请假'
      },
      {
        id: '2',
        name: '我的审批'
      },
      {
        id: '3',
        name: '我的抄送'
      }],
      list: [       //要展示的数据
        {value: '事假', id: 1},
        {value: '病假', id: 2}
      ],
      casueList: [
          {
              text: '请假类型',
              value: '0'
          },
          {
              text: '年假',
              value: '1'
          },
          {
              text: '事假',
              value: '2'
          },
          {
              text: '产假',
              value: '3'
          }
        ],
        dateList: [
          {
              text: '审批状态',
              value: '0'
          },
          {
              text: '待审批',
              value: '1'
          },
          {
              text: '审批通过',
              value: '2'
          },
          {
              text: '审批未通过',
              value: '3'
          }
        ],
        dataList: [
          {
              text: '全部时间',
              value: '0'
          },
          {
              text: '一周内',
              value: '1'
          },
          {
              text: '一个月内',
              value: '2'
          },
          {
              text: '六个月内',
              value: '3'
          }
        ],
      value0: '0',
      value1: '0',
      value2: '0',
    }
  },
  methods: {
    select(){

    },
    detail(){
      const arr1 = ['修改', '撤回']
      const arr2 = ['审批通过', '审批不通过']
        this.check(arr2)
        // this.check(arr1)
    },
    check(arr){
      this.$tools.actionsheet(arr, (index) => {
        console.log(arr[index])
        if(arr[index]==='修改'){

        }else{
          this.$tools.confirm(`确定${arr[index]}吗?`, () => {
          console.log(4)
        })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.leave {
  background-color: #f0f8ff;
  position: relative;
  .nav-tab {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #fff;
    margin-bottom: 15rpx;
    .nav-item {
      width: 30%;
      float: left;
      border-bottom: 1rpx solid #ccc;
      &:nth-of-type(2) {
        margin: 0 37rpx;
      }
    }
  }
  .select-box {
    background-color: #f1f8ff;
    padding: 20rpx 0;
    .select {
      width: 30%;
      float: left;
      border: none;
      margin-left: 20rpx;
    }
  }
  .scroll-h {
    height: calc(100vh - 190rpx);
    // height: 85vh;
    .record-box {
      background-color: #f2f8fe;
      padding: 5rpx 5rpx 0 5rpx; 
      .leave-box {
        margin: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 25rpx 20rpx;
        &:first-of-type {
          margin-top: 0;
        }
        .leave-top {
          margin-bottom: 10rpx;
          .leave-icon {
            font-size: 40rpx;
            font-weight: bolder;
          }
          .leave-title {
            font-size: 32rpx;
            font-weight: bold;
          }
        }
        .leave-info {
          color: #acafaf;
          .leave-pur{
            padding: 6rpx 0;
            font-size: 28rpx;
          }
        }
        .leave-bottom {
          margin-top: 10rpx;
          padding-top: 10rpx;
          font-size: 28rpx;
          border-top: 1rpx solid #f9fbfb;
          .leave-time {
            color:#cbcdcd;
          }
          .leave-detail {
            font-weight: bold;
          }
        }
      }
    }
  }
  .add-icon {
    position: absolute;
    left: 43%;
    bottom: 5%;
    image {
     height: 100rpx;
	   width: 100rpx;
    }
  }
}
.dropdown {
    padding: 4rpx 18rpx 18rpx 18rpx;
    background: #fff;
    font-size: 12px;
  }
  .dropdown-menu {
    width: 50%;
    padding: 2rpx 0;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    margin-bottom: 10rpx;
  }
  .dropdown-menu:first-child { 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
  .dropdown-menu:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .dropdown-item__selected {
    padding: 10rpx;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 1564327 */
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
  }
</style>
