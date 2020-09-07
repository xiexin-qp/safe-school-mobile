<template>
  <view class="special u-pages">
    <scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-h u-padd-t20">
      <no-data v-if="dataList.length === 0" msg="暂无数据"></no-data>
      <view class="special-list u-mar-b20 u-mar-l20 u-mar-r20" v-for="(item, i) in dataList" :key="i" v-else>
        <view class="detail u-fx u-padd-20 u-mar-b20">
          <view class="info u-fx-ac" @click="detail(item)">
            <view class="list u-fx-f1 u-line3">
              <view class="name u-fx-jsb u-main-color u-font-1">
                <view> {{ item.taskName }} </view>
                <view
                  class="u-font-01"
                  :style="{ color: item.state === '1' || item.state === '2' ? '#fa3534' : '#2979ff' }"
                >
                  {{ item.state | specialState }}
                </view>
              </view>
              <view class="u-fx-jsb">
                <view>
                  <view class="u-mar-t10">
                    <text class="u-tips-color"> 检查时间： </text>
                    {{ item.checkTime }}
                  </view>
                  <view class="u-mar-t10">
                    <text class="u-tips-color"> 小组长： </text>
                    {{ item.teamLeaderName }}
                  </view>
                  <view class="u-mar-t10">
                    <text class="u-tips-color"> 检查项目： </text>
                    {{ item.itemNum }}
                  </view>
                  <view class="u-mar-t10">
                    <text class="u-tips-color"> 检查标准： </text>
                    {{ item.standardNum }}
                  </view>
                </view>
                <view class="u-fx-ac" v-if="item.label">
                  <image src="/mobile-img/special-check.png"></image>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac">
      <u-button type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg" @click="submit">
        巡查值班
      </u-button>
    </view>
  </view>
</template>

<script>
import eventBus from '@u/eventBus'
import noData from '@/components/no-data/no-data.vue'
import { store, actions } from './store/index.js'
export default {
  components: {
    noData
  },
  data() {
    return {
      pageList: {
        pages: 1,
        size: 15
      },
      morePage: false,
      dataList: []
    }
  },
  async mounted() {
    // eventBus.$on('getList', () => {
    // 	this.showList()
    // })
    this.showList()
  },
  methods: {
    detail(item) {
      const url =
        item.state === '3' || item.state === '4' || !item.label
          ? `./detail?id=${item.id}&state=${item.state}`
          : `./submit?id=${item.id}&state=${item.state}`
      this.$tools.navTo({
        url: url
      })
    },
    async showList(tag = false) {
      if (tag) {
        this.pageList.pages += 1
      } else {
        this.pageList.pages = 1
      }
      this.pageList.schoolCode = store.userInfo.schoolCode
      const res = await actions.getInspectList(this.pageList)
      this.total = res.data.total
      if (tag) {
        this.dataList = this.dataList.concat(res.data.records)
      } else {
        this.dataList = res.data.records
      }
      this.morePage = res.data.hasNextPage
    },
    loadMore() {
      if (!this.morePage) {
        this.$tools.toast('数据已加载完毕')
        return
      }
      this.showList(true)
    },
    submit() {
      this.$tools.navTo({
        url: './submit'
      })
    }
  }
}
</script>

<style lang="scss">
.scroll-h {
  height: calc(100vh - 100rpx);
  .special-list {
    background-color: $uni-bg-color;
    border-radius: 16rpx;
    position: relative;
    .detail {
      position: relative;
      .info {
        width: 100%;
      }
    }
  }
  .name {
    border-bottom: 1px dashed #ccc;
  }
  image {
    width: 100rpx;
    height: 100rpx;
  }
}
</style>
