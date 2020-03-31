<template>
  <view class="qui-page">
    <xy-dialog 
        :show="showTag" 
        title="提示" 
        content="哈哈，还是被你看到了..."
        @cancel="clickCancel()" 
        @confirm="clickConfirm()">
    </xy-dialog>
    <view class="detail">
      <view class="top qui-fx-jsb">
        <view class="info qui-fx-ac">
          <image :src="errorImg" alt="">
          <view class="qui-fx-ver">
            <text class="name">张思</text>
            <text class="phone">13585256856</text>
            <text class="times">面试</text>
          </view>
        </view>
        <view class="state">审批不通过</view>
      </view>
      <view class="log qui-fx-jsb">
        <view class="qui-fx-ver">
          <view class="start qui-fx-ac">
            <text>起</text>
            <text>2020年2月21日12:00</text>
          </view>
        </view>
        <view class="qui-fx-ver">
          <view class="end qui-fx-ac">
            <text>止</text>
            <text>2020年2月21日16:00</text>
          </view>
        </view>
      </view> 
      <view class="log qui-fx-jsb">
        <view class="start qui-fx-ac">
          <icon type="info" size="24"/>
          <text style="margin-left: 10rpx;">随行人数：1</text>
        </view>
        <view class="end qui-fx-ac">
          <icon type="waiting" size="24"/>
          <text style="margin-left: 10rpx;">来访时长：4小时</text>
        </view>
      </view> 
      <view class="log">
        <text>邀请函</text>
        <view class="qui-fx-ac">
          <icon type="email" size="24"/>
          <view class="qui-fx-ver">
            <text>访客,您好！</text>
            <text>学校邀约人姓名邀请你于开始时间至结束时间来访进行来访事由，地址：手动填写。</text>
            <text>请准时到达，如有问题请联系邀约人姓名邀约人手机号。</text>
          </view>
        </view>
      </view> 
    </view>
  </view>
</template>

<script>
  export default {
    components: {
    },
    data(){
      return{
        errorImg: require('@s/img/person.png'),
        showTag: false
      }
    },
    onLoad(options) {
        console.log(options.id)
    },
    methods: {
      goBack () {
        this.$tools.goBack()
      },
      clickCancel(){
        this.showTag=false
      },
      clickConfirm(){
        this.showTag=false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
    padding: 0 20rpx;
    .scroll-h {
      height: 64vh;
    }
    .top{
      width:100%;
      height:362rpx;
      background: url('../../../../static/img/bg.png') no-repeat;
      background-size: 100% 362rpx;
      margin:20rpx 0 40rpx 0;
      color:#fff;
      .state{
        margin:30rpx 60rpx 0 0;
        font-size: 28rpx;
      }
      .info{
        margin:0 0 0 10%;
        height:300rpx;
        image{
          width: 160rpx;
          height: 160rpx;
          margin-right: 38rpx;
          background: rgba(255, 255, 255, 0.6);
          padding: 6rpx;
          border-radius: 100%;
        }
        text{
          margin-bottom: 10rpx;
        }
        .name{
        }
        .phone{
        }
      }
    }
    .log{
      background: #fff;
      padding: 40rpx 20rpx;
      margin: 20rpx 0 40rpx 0;
      border: 1px solid #ddd;
      border-radius: 16rpx;
      box-shadow: 2rpx 2rpx 1rpx 1rpx #ddd;
      .start,.end{
        margin: 10rpx 0;
        text:first-child{
          border: 1rpx solid #0079FF;
          padding: 6rpx 12rpx;
          border-radius: 100%;
          margin-right: 20rpx;
        }
      }
    }
  }
</style>
