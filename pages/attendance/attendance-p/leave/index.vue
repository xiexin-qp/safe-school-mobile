<template>
  <view class="leave qui-page qui-fx qui-fx-ver">
    <view class="nav-tab">
      <view class="nav-item" v-for="item in navs" :key="item.id">{{item.name}}</view>
    </view>
    <view class="select-box">
      <xfl-select 
        :list="list"
        placeholder = "请假类型"
        :style_Container="'height: 70rpx;'"
        class="select"
        @change="select"
      >
      </xfl-select>
      <xfl-select 
        :list="list"
        :style_Container="'height: 70rpx;'"
        placeholder = "审批状态"
        class="select"
      >
      </xfl-select>
      <xfl-select 
        :list="list"
        :style_Container="'height: 70rpx;'"
        placeholder = "全部时间"
        class="select"
      >
      </xfl-select>
    </view>
    <scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
      <view class="content">
        <view class="record-box">
          <no-data msg="暂无考勤记录~" v-if="dayInfo.length === 0"></no-data>
          <view class="leave-box" v-for="item in infoList" :key="item.id">
            <view class="leave-top qui-fx-jsb">
              <view class="leave-title">事假 </view>
              <view class="leave-icon" @click="detail(item)"> ...</view>
            </view>
            <view class="leave-info"> 
              <view class="leave-pur">开始时间：{{item.startTime}}</view>
              <view class="leave-pur">结束时间：{{item.endTime}}</view>
              <view class="leave-pur">描述：{{item.remark}}</view>
              <view class="leave-pur">状态：{{item.state}}</view>
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
import person from '@s/img/person.png'
import add from '@s/img/add.png'
import eventBus from '@u/eventBus.js'
// import { store, actions } from './store/index.js'
export default {
  components: {
  },
  onLoad(options) {
    console.log(options)
  },
  onPullDownRefresh() {
    this.showList()
  },
  data () {
    return {
      add,
      person,
      infoList:[{
        id: 1,
        startTime: '2020年3月20日 12:00',
        endTime: '2020年3月21日 12:00',
        remark: '家里有急事',
        state: '待审批'
      },
      {
        id: 2,
        startTime: '2020年3月20日 12:00',
        endTime: '2020年3月21日 12:00',
        remark: '家里有急事',
        state: '待审批'
      },
      {
        id: 3,
        startTime: '2020年3月20日 12:00',
        endTime: '2020年3月21日 12:00',
        remark: '家里有急事',
        state: '待审批'
      },
      {
        id: 4,
        startTime: '2020年3月20日 12:00',
        endTime: '2020年3月21日 12:00',
        remark: '家里有急事',
        state: '待审批'
      },
      {
        id: 5,
        startTime: '2020年3月20日 12:00',
        endTime: '2020年3月21日 12:00',
        remark: '家里有急事',
        state: '待审批'
      }],
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
    }
  },
  computed: {
    // ...mapState('home', [
    //   'userCode'
    // ])
  },
  mounted() {
    this.showList()
    eventBus.$on('change', () => {
      alert(4)
    })
  },
  methods: {
    async showList (tag = false) {
      const res = await actions.getIndex()
      if (tag) {
        this.dataList = this.dataList.concat(res.data)
      } else {
        this.dataList = res.data
        uni.stopPullDownRefresh()
      }
    },
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
  },
  
}
</script>

<style lang="less" scoped>
.leave{
  background-color: #f0f8ff;
  position: relative;
  .nav-tab{
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #fff;
    .nav-item{
      width: 30%;
      float: left;
      border-bottom: 1rpx solid #ccc;
      &:nth-of-type(2){
        margin: 0 37rpx;
      }
    }
  }
  .select-box{
    background-color: #f1f8ff;
    padding: 20rpx 0;
    .select{
      width: 30%;
      float: left;
      border: none;
      margin-left: 20rpx;
    }
  }
  .scroll-h {
    height: 85vh;
    .record-box{
      background-color: #f2f8fe;
      padding: 5rpx 5rpx 0 5rpx; 
      .leave-box {
        margin: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 25rpx 20rpx;
        &:first-of-type{
          margin-top: 0;
        }
        .leave-top{
          margin-bottom: 10rpx;
          .leave-icon{
            font-size: 40rpx;
            font-weight: bolder;
          }
          .leave-title{
            font-size: 32rpx;
            font-weight: bold;
          }
        }
        .leave-info{
          color: #acafaf;
          .leave-pur{
            padding: 6rpx 0;
            font-size: 28rpx;
          }
        }
        .leave-bottom{
          margin-top: 10rpx;
          padding-top: 10rpx;
          font-size: 28rpx;
          border-top: 1rpx solid #f9fbfb;
          .leave-time{
            color:#cbcdcd;
          }
          .leave-detail{
            font-weight: bold;
          }
        }
      }
    }
  }
  .add-icon{
    position: absolute;
    left: 43%;
    bottom: 5%;
    image{
     height: 100rpx;
	   width: 100rpx;
    }
  }
}


</style>
