<template>
  <view class="stundent-statistics qui-page qui-fx qui-fx-ver">
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
import steps from './steps.vue'
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
import eventBus from '@u/eventBus.js'
// import { store, actions } from './store/index.js'
export default {
  components: {
    steps
  },
  onLoad(options) {
    console.log(options)
  },
  onPullDownRefresh() {
    this.showList()
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
    detail(item){
      console.log('item',item)
      this.$refs.popup.open()
    }
  },
  
}
</script>

<style lang="less" scoped>
.stundent-statistics{
    background-color: #f1f8ff;
    .title{
      height: 80rpx;
      background-color: #fff;
      justify-content: center;
      image{
        width: 50rpx;
        height: 50rpx;
        margin-right: 10rpx;
        border-radius: 50%;
      }
    }
    .record-box{
      background-color:#f2f8fe;
      .attandence-box{
        height: 425rpx;
        .attandence-info{
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
          .attandence-num{
            color: #ccc;
            font-size: 28rpx;
          }
        }
        :nth-child(3n){
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
    height: 55vh;
    background-color: #fff;
    margin-top: 15rpx;
  }
}
</style>