<template>
	<view class="news">
    <view v-for="news in newsList" :key="news.id" class="news-list qui-bd-b qui-fx">
      <view class="qui-fx-f1 qui-fx-ver qui-fx-jsb">
        <view class="qui-te2">{{ news.title }}</view>
        <text class="time">{{ news.createDate }}</text>
      </view>
      <view>
        <img :src="news.coverPhoto" alt="">
      </view>
    </view>
	</view>
</template>

<script>
export default {
  props: {
    newsList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
	data() {
		return {
    }
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
  .news-list {
    background-color: #fff;
    padding: 20rpx;
    img {
      margin-left: 10rpx;
      width: 220rpx;
      font-size: $font-des;
      height: 150rpx;
      display: block;
    }
    .time {
      color: $des-color;
      font-size: $font-second;
    }
  }
</style>
