<template>
  <view class="u-page u-type-white-bg">
    <image src="/mobile-img/kq-head.png" mode="" class="img"></image>
    <view class="list u-padd-t40 u-padd-l20 u-padd-r20 u-padd-b20">
      <view class="th u-fx-ac">
        <text class="mdr">教职工姓名</text>
        <text class="right">打卡时间</text>
      </view>
      <no-data msg="暂无数据" v-if="groupuserList.length === 0"></no-data>
      <scroll-view
        v-else
        scroll-y="true"
        class="scroll-h"
        @scrolltolower="loadMore"
      >
        <view
          v-for="(item, i) in groupuserList"
          :key="i"
          class="tbody u-bd-b u-fx-ac"
        >
          <text class="left">{{ item.userName }}</text>
          <text class="mdl">{{ item.sex == "1" ? "男" : "女" }}</text>
          <text class="mdr">{{ item.mobile }}</text>
          <text class="mdr">{{ item.mobile }}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import eventBus from "@u/eventBus";
import noData from "@/components/no-data/no-data.vue";
import { store, actions } from "../store/index.js";
export default {
  components: {},
  data() {
    return {
      pageList: {
        page: 1,
        size: 15,
      },
      morePage: false,
      groupuserList: [],
      ruleGroupCode: "",
      userGroupCode: "",
    };
  },
  mounted() {
    this.ruleGroupCode = this.$tools.getQuery().get("ruleGroupCode");
    this.userGroupCode = this.$tools.getQuery().get("userGroupCode");
    eventBus.$on("getList", () => {
      this.showList();
    });
    this.showList();
  },
  methods: {
    async showList(tag = false) {
      if (tag) {
        this.pageList.page += 1;
      } else {
        this.pageList.page = 1;
      }
      const req = {
        schoolCode: store.userInfo.schoolCode,
        ruleGroupCode: this.ruleGroupCode,
        userGroupCode: this.userGroupCode,
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
      };
      const res = await actions.getgroupuserList(req);
      if (tag) {
        this.groupuserList = this.groupuserList.concat(res.data.list);
      } else {
        this.groupuserList = res.data.list;
      }
      this.morePage = res.data.hasNextPage;
    },
    loadMore() {
      if (!this.morePage) {
        this.$tools.toast("数据已加载完毕");
        return;
      }
      this.showList(true);
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  font-size: 28rpx;
  background-color: #fff;
  margin-top: -75rpx;
  position: relative;
  z-index: 99;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  .th {
    background: #0084ff;
    padding: 20rpx;
    border-radius: 8rpx;
    color: #fff;
  }
  .tbody {
    position: relative;
    padding: 25rpx 20rpx;
    background: $uni-bg-color;
  }
  .tbody:nth-child(even) {
    background: $u-bg-color;
  }
  .left {
    width: 20%;
    text-align: center;
  }
  .mdl {
    width: 20%;
    text-align: center;
  }
  .mdr {
    width: 40%;
    text-align: center;
  }
  .right {
    width: 20%;
    max-width: 120rpx;
    text-align: center;
  }
}
.scroll-h {
  height: calc(100vh - 100rpx);
}
.img {
        width: 100%;
        height: 280rpx;
      }
</style>
