<template>
  <view class="notice">
		<no-data v-if="noticeList.length === 0"></no-data>
    <view v-for="notice in noticeList" :key="notice.id" class="notice-list u-bd-b" @click="detail(notice.id)">
      <text class="title u-te">{{ notice.title }}</text>
      <text class="time u-font-02 u-content-color">{{ notice.createTime | getToDate }}</text>
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
    },
    methods: {
      detail (id) {
        this.$tools.navTo({
          url:`../news/news-t/SchoolNotice/detail?id=${id}`,
          title:'详情'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notice-list {
    background-color: #fff;
    padding: $u-mp-20;
    .title {
      margin-bottom: $u-mp-20;
    }
    .time {
    }
  }
</style>
