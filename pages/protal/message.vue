<template>
  <view class="message">
    <view class="u-fx-jc u-fx-ac message-top u-bg-fff">
      <view class="tab-title u-fx">
        <view v-for="tab in tabList" :key="tab.id" @click="changeTab(tab)" :class="{'act': tabIndex === tab.id}" class="tab">
          {{ tab.title }}
        </view>
      </view>
    </view>
		<scroll-view scroll-y="true" class="scroll-h">
			<app-message :data-list="appMessageList" v-if="tabIndex===0"></app-message>
			<system-message :data-list="systemMessageList" v-if="tabIndex!==0"></system-message>
		</scroll-view>
  </view>
</template>

<script>
	import {store, actions} from './store/index.js'
	import appMessage from './component/app-message.vue'
	import systemMessage from './component/system-message.vue'
  export default {
		computed: {
			userInfo: () => store.userInfo
		},
		components:{
			appMessage,
			systemMessage
		},
    data () {
      return {
				appMessageList: [],
				systemMessageList: [],
        tabIndex: 0,
        tabList: [
          {
            id: 0,
            title: '应用消息'
          },
          {
            id: 1,
            title: '通知公告'
          },
          {
            id: 2,
            title: '系统消息'
          }
        ]
      }
    },
		mounted () {
			this.systemList(0)
		},
    methods: {
      changeTab (tab) {
        this.tabIndex = tab.id
				this.systemList(tab.id)
      },
			/**
			 * @description  消息分类
			 */
			async systemList (type) {
				if (type === 0 ) {
					this.fun = 'searchPersonApp'
				} else if (type === 1 ){
					this.fun = 'searchPersonTz'
				} else {
					this.fun = 'searchPersonNotice'
				}
				const res = await actions[this.fun]({
					page: 1,
					size: 20,
					userCode: this.userInfo.userCode,
					eduCode: this.userInfo.schoolCode
				})
				if (type === 0) {
					this.appMessageList = res.data.list
				} else if (type === 1) {
					this.systemMessageList = res.data.list.map(item => {
						return {
							noticeCode: item.noticeCode,
							title: item.title,
							content: item.content,
							creatTime: item.creatTime,
							readStatus: item.readStatus,
							publisherName: item.publisherName
						}
					})
				} else {
					this.systemMessageList = res.data.list.map(item => {
						return {
							noticeCode: item.noticeCode,
							title: item.title,
							content: item.content,
							creatTime: item.creatTime,
							readStatus: item.readStatus,
							publisherName: item.publisherName
						}
					})
				}
			}
    }
  }
</script>

<style lang="scss" scoped>
  .message {
		.message-top {
			height: 100rpx;
		}
		.scroll-h {
			height: calc(100vh - 200rpx);
		}
  }
  .tab-list {
    background-color: #fff;
  }
  .tab-title {
    margin: 5rpx 0px 0px 0;
    border: 1px $u-border-color solid;
    overflow: hidden;
    border-radius: 10rpx;
    .tab {
      line-height: 60rpx;
      height: 60rpx;
      padding: 0 44rpx;
      border-left: 1px $u-border-color solid;
      &:first-child {
        border-left: none;
      }
    }
    .act {
      background-color: $u-type-primary;
      color: #fff;
    }
  }
</style>
