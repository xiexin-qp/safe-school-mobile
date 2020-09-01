<template>
  <view class="u-page">
    <view class="head">
      <u-tabs-swiper
        ref="uTabs"
        :bold="false"
        :bar-style="{ transform: 'scale(3)', height: '1rpx' }"
        :current="current"
        @change="changeMenu"
        :list="tabList"
        :is-scroll="false"
        active-color="#2979ff"
      ></u-tabs-swiper
    ></view>
    <view>
      <swiper
        class="u-page"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item">
          <scroll-view
            scroll-y="true"
            class="scroll-h"
            @scrolltolower="loadMore"
          >
            <PlanList isShow :data-list="recordList"></PlanList>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view
            scroll-y="true"
            class="scroll-h"
            @scrolltolower="loadMore"
          >
            <PlanList isShow :data-list="recordList"></PlanList>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view
            scroll-y="true"
            class="scroll-h"
            @scrolltolower="loadMore"
          >
            <PlanList isShow :data-list="recordList"></PlanList>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import { store, actions } from "./store/index.js";
import noData from "@/components/no-data/no-data.vue";
import eventBus from "@u/eventBus";
import PlanList from "../component/PlanList.vue";

export default {
  components: {
    noData,
    PlanList,
  },
  data() {
    return {
      tabList: [
        {
          name: "未开始",
        },
        {
          name: "进行中",
        },
        {
          name: "已结束",
        },
      ],
      current: 0,
      swiperCurrent: 0,
      recordList: [],
      searchObj: {},
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
      morePage: false,
      noticeId: "",
    };
  },
  filters: {},
  mounted() {
    this.showList();
  },
  methods: {
    changeMenu(item) {
      this.swiperCurrent = item;
      this.showList();
    },
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    async showList(tag = false) {
      if (tag) {
        this.pageList.page += 1;
      } else {
        this.pageList.page = 1;
      }
      const req = {
        schoolCode: store.userInfo.schoolCode,
        userCode: store.userInfo.userCode,
        ...this.pageList,
        state: this.swiperCurrent,
      };
      const res = await actions.getplanList(req);
      if (tag) {
        this.recordList = this.recordList.concat(res.data.list);
      } else {
        this.recordList = res.data.list;
      }
      this.morePage = res.data.hasNextPage;
    },
    loadMore() {
      if (!this.morePage) {
        this.$tools.toast("数据已加载完毕");
        return;
      }
      this.showList(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
}
.head {
  height: 100rpx;
}
</style>
