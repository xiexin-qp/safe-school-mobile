<template>
  <view>
    <scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>标题：</view>
        <view class="qui-fx-f1"><input class="item-input" v-model="formData.title"/></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>正文：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <input class="item-input" v-model="formData.text" />
        </view>
      </view>
    <view class="qui-fx-ac qui-bd-b item-list">
      <view>图片：</view>
      <view class="qui-fx-f1 qui-fx-je">
        <input class="item-input" v-model="formData.picture" />
      </view>
    </view>
    </scroll-view>
    <view class="">
      <button type="primary">提交</button>  
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        formData: {
         title: '',
         text: '',
         picture: '',
        }
			}
		},
    computed: {
    },
    async mounted() {
    },
    methods: {
     
    }
	}
</script>

<style lang="scss">
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .item-list {
    padding: 25rpx 15rpx;
  }
  .item-input {
    width: 100%;
    font-size: 26rpx;
    color: #999;
  }
  .submit-box {
    height: 100rpx;
    .btn {
      padding:0 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      margin: 0 20rpx;
      background-color: $main-color;
      color:#fff;
      border-radius: $radius;
    }
  }
</style>
