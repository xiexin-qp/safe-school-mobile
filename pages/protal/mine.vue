<template>
  <view class="mine">
    <view class="person-bg qui-fx-jsb" style="background: url('http://canpointtest.com/mobile-protal/images_/person-bg.png') no-repeat; backgroundSize: 100% 100%">
      <text>武汉全品文教</text>
      <text>{{ date }}</text>
    </view>
    <view class="person-info">
      <view class="info qui-fx-ac-jc" style="background: url('http://canpointtest.com/mobile-protal/images_/person-info.png') no-repeat; backgroundSize: 100% 312rpx">
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
		    <text>手机号：</text>
		    <text class="qui-fx-f1 qui-tx-r">18702707106</text>
		  </view>
		</view>
    <view class="person-item">
      <view class="item qui-fx-jsb qui-bd-b">
        <text>我的身份：</text>
        <text class="qui-fx-f1 qui-tx-r" @click="changeType">班主任</text>
				<view class="rit-icon"></view>
      </view>
      <view class="item qui-fx-jsb qui-bd-b">
        <text>当前绑定：</text>
        <text>小学一年级一班</text>
      </view>
    </view>
    <view class="mine-btn school">切换学校</view>
  </view>
</template>

<script>
	import { store } from './store/index.js'
  export default {
    data () {
      return {
				date: this.$tools.getDateTime().substr(0, 10)
      }
    },
		computed: {
			userInfo: () => store.userInfo
		},
		methods: {
			// 切换身份
			changeType () {
				const arr = ['教职工', '家长']
				this.$tools.actionsheet(arr, (index) => {
				  console.log(arr[index])
				})
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
			overflow: hidden;
			border-radius: 10rpx;
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