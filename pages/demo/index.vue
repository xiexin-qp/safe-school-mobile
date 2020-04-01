<template>
	<view class="qui-page qui-fx-ver">
		<view class="header"></view>
		<scroll-view scroll-y="true" class="scroll-h">
		  <view  v-for="i in 20" :key="i" class="list qui-bd-b qui-fx-jsb">
				{{i}}
		  </view>
		</scroll-view>
		<view class="footer"></view>
	</view>
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
	.header {
		height: 88rpx;
		background-color: #0079FF;
	}
  .list {
    padding: 25rpx 20rpx;
  }
  .scroll-h {
    height: calc(100vh - 188rpx);
  }
	.footer {
		height: 100rpx;
		background-color: red;
	}
</style>
