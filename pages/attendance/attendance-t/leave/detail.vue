<template>
  <view class="home qui-page qui-fx qui-fx-ver">
      <view>
        <view class="leave-detail qui-fx-ver">
          <view class="leave-info qui-fx-jsb qui-fx-ac">
            <view class="leave-name">张倩 事假4小时</view>
            <view class="leave-state">出校</view>
          </view>
          <view class="leave-time qui-fx-jsb">
            <view class="qui-fx"> 
              <view class="leave-icon">起</view>
              <view>
                <view>2020年3月30日</view>
                <view>12:00</view>
              </view>
            </view>
            <view class="qui-fx"> 
              <view class="leave-icon">止</view>
              <view>
                <view>2020年3月31日</view>
                <view>12:00</view>
              </view>
            </view>
          </view>
        </view>
        <view class="leave-remark">家长有急事</view>
        <view class="apply-box qui-fx-ac">
          <view class="qui-fx-ver qui-fx-ac">
            审批人
            <image class="img" :src="person" mode=""></image>
             赵青
          </view>
          <view class="apply-content qui-fx-ver">
            <view class="apply-status">审批通过</view>
            <view class="apply-time">2020年3月20日 11:39</view>
          </view>
        </view>
        <view class="apply-box qui-fx-ac">
          <view class="qui-fx-ver qui-fx-ac">
            抄送人
            <image class="img" :src="person" mode=""></image>
             吴启迪
          </view>
          <view class="apply-content qui-fx-ver">
            <view class="apply-status">未读</view>
            <view class="apply-time">--：--</view>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
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
 .leave-detail{
   height: 250rpx;
   background-color: #f3f9ff;
   .leave-info{
     height: 120rpx;
     padding-left: 20rpx;
     .leave-name{
       font-size: 36rpx;
     }
     .leave-state{
       width: 150rpx;
       height: 55rpx;
       line-height: 55rpx;
       background-color: #6d7cff;
       border-radius: 50rpx 0 0 50rpx;
       color: #fff;
       font-size: 34rpx;
       text-align: center;
     }
   }
   .leave-time{
     padding: 20rpx;
    .leave-icon{
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      width: 70rpx;
      border-radius: 50%;
      background-color: #b5c7ff;
      color: #fff;
      font-size: 32rpx;
      margin-right: 20rpx;
    }
   }
 }
 .leave-remark{
   height: 100rpx;
   line-height: 90rpx;
   padding-left: 20rpx;
   background-color: #fff;
 }
 .apply-box{
   height: 280rpx;
   background-color: #fff;
   padding: 40rpx;
   margin-top: 1rpx solid #f0f1f2;
 }
.title{
  height: 80rpx;
  background-color: #fff;
  justify-content: center;
}
.img{
  width: 100rpx;
  height: 100rpx;
  margin: 25rpx 20rpx;
  border-radius: 50%;
}
.apply-content{
  margin-left: 40rpx;
  .apply-status{
    color: #00b800;
  }
  .apply-time{
    color: #dadbdc;
    margin-top:10rpx;
  }
}
  .record-box{
    // padding-top:20rpx;
    background-color:#f2f8fe;
  }
  .leave-box {
    padding-bottom: 20rpx;
    margin: 20rpx;
    .leave-list {
      margin-top: 20rpx;
      padding: 20rpx;
      background-color:#d3e3f3;
      border-radius: 8rpx;
      color: #666;
      line-height: 50rpx;
    }
  }
  .attandence-box{
    height: 425rpx;
    .attandence-info{
      width: 29.8%;
      float: left;  
      margin-bottom: 30rpx;
      background-color: #fff;
      margin: 15rpx 0 5rpx 20rpx;
      padding: 20rpx 0;
      border-radius: 15rpx;
      image {
        width: 60rpx;
        margin-bottom: 10rpx;
      }
    }
    :nth-child(3n){
      border-right: none;
    }
  }
  .attandence-num{
     color: #ccc;
     font-size: 28rpx;
  }
  .list {
    padding: 15rpx 25rpx;
  }
  .scroll-h {
    height: 70vh;
  }
</style>