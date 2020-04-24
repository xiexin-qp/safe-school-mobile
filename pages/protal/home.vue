<template>
  <view class="home">
    <view class="banner">
    	<swiper class="swiper" :indicator-active-color="actColor" :indicator-color="autoColor" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval">
    		<swiper-item>
          <img class="banner-img" src="/mobile-img/banner-one.png" />
        </swiper-item>
        <swiper-item>
          <img class="banner-img" src="/mobile-img/banner-two.png" />
        </swiper-item>
    	</swiper>
    </view>
    <view class="enjoy">
      <view @click="goApp(enjoy)" v-for="enjoy in enjoyApp.concat(addMore)" :key="enjoy.id" class="enjoy-list qui-fx-ac-jc">
        <view>
          <img :src="enjoy.icon || '/mobile-img/more-add-icon.png'" alt="">
        </view>
        <text class="title">{{ enjoy.name.split('-')[0] }}</text>
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
  export default {
    data () {
      return {
        show: true,
        newsType: 0,
        autoColor: 'rgba(0, 0, 0, .2)',
        actColor: '#ffffff',
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        dataList: [],
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
            icon: '',
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
			if (this.userInfo.typeCode == 16) {
				this.getChildList()
			}
		},
    methods: {
      changTab (tab) {
        this.tabIndex = tab.id
      },
      goApp (enjoy) {
				console.log(enjoy)
				if (enjoy.id === 0) {
					setStore({
					  key: 'tabIndex',
					  data: 1
					})
				} else {
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
    margin: 16rpx;
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
    color: $main-color;
    line-height: 78rpx;
    background-color: #fff;
    margin: 20rpx 0;
  }
  .enjoy {
    background-color: #fff;
    height: 260rpx;
    .enjoy-list {
      width: 25%;
      float: left;
      height: 130rpx;
      img {
        width: 50rpx;
        height: 50rpx;
        display: block;
      }
      .title {
        color: $des-color;
        padding-top: 10rpx;
        font-size: 26rpx;
      }
    }
  }
  .tab-list {
		margin-top: 20rpx;
    background-color: #fff;
  }
  .tab-title {
    margin: 20rpx 0;
    border: 1px #F5F5F5 solid;
    overflow: hidden;
    border-radius: 10rpx;
    .tab {
      line-height: 60rpx;
      height: 60rpx;
      padding: 0 44rpx;
      border-left: 1px #F5F5F5 solid;
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
