<template>
  <view class="mine">
    <view class="person-bg qui-fx-jsb" style="background: url('http://canpointtest.com:8081/personBg.png'); backgroundSize: '100% 100%'">
      <text>武汉全品文教</text>   
      <text>2020/03/04</text>
    </view>
    <view class="person-info">
      <view class="info qui-fx-ac-jc" style="background: url('http://canpointtest.com:8081/person-info.png'); backgroundSize: '100% 100%'">
        <view>
          <img src="./assets/img/app.png" alt="">
        </view>
        <view class="qui-fx-ac">
          <text>张立</text>
          <text class="tip"></text>
          <text>班主任</text>
        </view>
      </view>
    </view>
    <view class="person-item">
      <view class="item qui-fx-jsb qui-bd-b">
        <text>我的身份：</text>
        <text>班主任</text>
      </view>
      <view class="item qui-fx-jsb qui-bd-b">
        <text>当前绑定：</text>
        <text>小学一年级一班</text>
      </view>
    </view>
    <view class="mine-btn role">切换角色</view>
    <view class="mine-btn school">切换学校</view>
    <view class="mine-btn quit">退出登录</view>
  </view>
</template>

<script>
  import personBg from './assets/img/personBg.png'
  import personInfo from './assets/img/person-info.png'
  export default {
    data () {
      return {
        personBg,
        personInfo
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mine {
    .person-bg {
      height: 350rpx;
      color:#fff;
      padding: 30rpx;
    }
    .person-info {
      margin: -220rpx 30rpx 0 30rpx;
    }
    .info {
      height: 312rpx;
      background-size: 100% 312rpx;
      z-index: 99;
      .tip {
        display: inline-block;
        border-radius: 100%;
        height: 8rpx;
        width: 8rpx;
        margin: 0 8rpx;
        background-color: #333;
      }
      img {
        border-radius: 50%;
        width: 120rpx;
        height: 120rpx;
        display: block;
        margin-bottom: 20rpx;
      }
    }
  }
  .person-item {
    margin-top: 20rpx;
    background-color: #fff;
    .item {
     padding: 30rpx 20rpx;
    }
  }
  .mine-btn {
    border-radius: $radius;
    margin: 30rpx 20rpx;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
    color: #fff;
  }
  .role {
    background-color: $other1-color;
  }
  .school {
    background-color: $other2-color;
  }
  .quit {
    background-color: $second-color;
  }
</style>
