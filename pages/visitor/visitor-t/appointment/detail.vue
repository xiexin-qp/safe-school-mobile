<template>
  <view class="qui-page">
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
      <view class="log qui-fx-jsb">
        <view class="start qui-fx-ac">
          <icon type="cancel" size="24"/>
          <text style="margin-left: 10rpx;">拒绝原因：时间冲突</text>
        </view>
      </view> 
    </view>
    <view class="submit-box qui-fx">
      <view class="btn1" @click="open">审批不通过</view>
      <view class="btn2">审批通过</view>
    </view>
    <uni-popup ref="refuse" type="center">
      <view class="pop qui-fx-ver">
        <view class="title">请输入拒绝原因</view>
        <input focus placeholder="" />
        <view class="btn" @click="sure(0)">确定</view>
      </view>
    </uni-popup>
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
      },
      open(){
         this.$refs.refuse.open()
      },
      sure(){
        this.$refs.refuse.close()
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
      view{
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
  .submit-box {
    height: 100rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    .btn1 {
      width: 50%;
      line-height: 100rpx;
      text-align: center;
      letter-spacing: 8rpx;
      background-color: #fff;
      color:#000;
      border-radius: $radius;
    }
    .btn2 {
      width: 50%;
      line-height: 100rpx;
      text-align: center;
      letter-spacing: 8rpx;
      background-color: $main-color;
      color:#fff;
      border-radius: $radius;
    }
  }
  .pop{
    text-align: center;
    .title{
      padding: 20rpx 0 0 0;
    }
    input{
      border:1rpx solid #ddd;
      margin: 20rpx 0;
    }
    .btn {
      padding:0 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      background-color: $main-color;
      color:#fff;
    }
  }
</style>
