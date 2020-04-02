<template>
  <view class="detail qui-page">
    <view class="top qui-fx-jsb">
      <view class="info qui-fx-ac">
        <image :src="errorImg" alt="">
        <view class="qui-fx-ver">
          <text class="name">张思</text>
          <text class="phone">13585256856</text>
          <text class="times">来访5次</text>
        </view>
      </view>
    </view>
    <view>来访记录</view>
    <scroll-view scroll-y="true" class="scroll-h">
      <steps></steps>
    </scroll-view>
  </view>
</template>

<script>
  import steps from './steps.vue'
  export default {
    components: {
      steps
    },
    data(){
      return{
        errorImg: require('@s/img/person.png')
      }
    },
    onLoad(options) {
        console.log(options.id)
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
    padding: 0 20rpx;
    .scroll-h {
      height: calc(100vh - 480rpx);
    }
    .top{
        width:100%;
        height:362rpx;
        background: url('../../../../static/img/bg.png') no-repeat;
        background-size: 100% 362rpx;
        margin:20rpx 0 40rpx 0;
        color:#fff;
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
  }
</style>
