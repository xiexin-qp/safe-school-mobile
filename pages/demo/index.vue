<template>
	<scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
    <view id="title">{{ title | getTitle }}</view>
    <view @click="goDetail" v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb">
      <text>{{ list.name }}</text>
      <text>{{ list.number }}</text>
    </view>
	</scroll-view>
</template>

<script>
  import eventBus from '@u/eventBus.js'
  import { actions } from './store/index.js'
	export default {
		data() {
			return {
        title: '我是标题',
        dataList: []
			}
		},
    components: {
    },
    filters: {
       getTitle (val) {
         return val + '666'
       }
    },
    onLoad(options) {
      console.log(options)
    },
    onPullDownRefresh() {
      this.showList()
    },
    mounted() {
      this.showList()
      eventBus.$on('change', () => {
        this.title = '新标题'
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
      goDetail () {
        uni.navigateTo({
          url: './detail'
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
  .list {
    padding: 25rpx 20rpx;
  }
  .scroll-h {
    height: 100vh;
  }
</style>
