<template>
  <view class="home">
    <view class="banner">
    	<u-swiper :list="bannerList" :height="350" :effect3d="true"></u-swiper>
    </view>
    <view class="enjoy">
      <view @click="goApp(enjoy)" v-for="enjoy in enjoyApp.concat(addMore)" :key="enjoy.id" class="enjoy-list qui-fx-ac-jc">
        <view>
          <image class="app-icon" :src="enjoy.icon || '/mobile-img/app-auto-icon.png'" alt="">
        </view>
        <text class="title u-content-color u-font-01">{{ enjoy.name.split('-')[0] }}</text>
      </view>
    </view>
    <view class="todo" v-if="false">
      您还有5个待办事项需要处理, 请尽快处理...
    </view>
    <view class="tab-list">
      <view class="qui-fx-jc">
        <view class="tab-title qui-fx">
          <view v-for="tab in tabList" :key="tab.id" @click="changTab(tab)" :class="{'act': tabIndex === tab.id}" class="tab">
            {{ tab.title }}
          </view>
        </view>
      </view>
      <new-list v-if="tabIndex === 0" :news-list="newsList"></new-list>
      <notice v-if="tabIndex === 1" :notice-list="noticeList"></notice>
    </view>
  </view>
</template>

<script>
  import newList from './component/new-list.vue'
  import notice from './component/notice.vue'
  import { setStore, store, actions } from './store/index.js' 
	import apiFun from './store/apiFun.js'
  export default {
    data () {
      return {
				bannerList: [
					{
						image: '/mobile-img/banner-one.png',
						title: '平安校园全面升级啦'
					},
					{
						image: '/mobile-img/banner-two.png',
						title: '平安校园保证中小学的生命财产安全'
					},
					{
						image: '/mobile-img/banner-one.png',
						title: '新品上线'
					}
				],
        tabIndex: 0,
        newsList: [],
        noticeList: [],
        tabList: [
          {
            id: 0,
            title: '新闻'
          },
          {
            id: 1,
            title: '公告'
          }
        ],
        addMore: [
          {
            icon: '/mobile-img/more-add-icon.png',
            id: 0,
            name: '更多'
          }
        ]
      }
    },
    computed: {
			userInfo: () => store.userInfo,
      enjoyApp: () => store.enjoyApp
    },
    components: {
      newList,
      notice
    },
		mounted () {
		},
    methods: {
			childInfo (item) {
				console.log(item)
			},
      changTab (tab) {
        this.tabIndex = tab.id
      },
      goApp (enjoy) {
				if (enjoy.id === 0) {
					setStore({
					  key: 'tabIndex',
					  data: 1
					})
				} else {
					if (!apiFun.isRoleApp(enjoy.url)) {
						this.$tools.toast('您没有访问权限')
						return
					}
					this.$tools.navTo({
						title: enjoy.name,
						url: enjoy.url
					})
				}
      },
			// 获取绑定的孩子
			async getChildList () {
				const {schoolCode, userCode, typeCode} = this.userInfo
				const res = await actions.getChildList({
					schoolCode,
					userCode,
					userType: typeCode
				})
				this.childList = res.data
				setStore({
					key: 'childList',
					data: res.data
				})
			}
    },
    async mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    border-radius: 12rpx;
    overflow: hidden;
    margin: 15rpx 0;
  	height: 350rpx;
  	.swiper {
      width: 100%;
      overflow: hidden;
  		height: 350rpx;
  		view {
  			height: 350rpx;
  		}
  	}
    .banner-img {
      width: 100%;
      height: 350rpx;
      display: block;
    }
  }
  .todo {
    height: 78rpx;
    padding: 0 20rpx;
    line-height: 78rpx;
    background-color: #fff;
    margin: 20rpx 0;
  }
  .enjoy {
    background-color: #fff;
    height: 280rpx;
    .enjoy-list {
      width: 25%;
      float: left;
      height: 140rpx;
      .app-icon {
        width: 50rpx;
        height: 50rpx;
        display: block;
      }
      .title {
        padding-top: 10rpx;
      }
    }
  }
  .tab-list {
		margin-top: 20rpx;
    background-color: #fff;
  }
  .tab-title {
    margin: 20rpx 0;
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
      background-color: $main-color;
      color: #fff;
    }
  }
</style>
