<template>
  <view class="notice">
		<no-data v-if="noticeList.length === 0"></no-data>
    <view v-for="notice in noticeList" :key="notice.id" class="notice-list qui-bd-b">
      <text class="title qui-te">{{ notice.title }}</text>
      <view class="content qui-fx qui-te2">{{ notice.content }}</view>
      <text class="time">{{ notice.createDate }}</text>
    </view>
  </view>
</template>

<script>
	import noData from '@/components/no-data/no-data.vue'
  export default {
		components: {
			noData
		},
    props: {
      noticeList : {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notice-list {
    background-color: #fff;
    padding: 20rpx;
    .title {
    }
    .content {
      padding: 20rpx 0;
      text-indent: 50rpx;
      line-height: 40rpx;
    }
    .time {
    }
  }
</style>
