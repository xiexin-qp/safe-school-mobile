<template>
  <view class="site u-page">
    <tab-menu :data-list="list" @change="tabChange"></tab-menu>
    <no-data v-if="dataList.length === 0" msg="暂无数据"></no-data>
    <scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-h">
      <view class="u-auto">
        <view
          class="u-padd-20 u-bg-fff u-border-radius"
          v-for="(item, i) in dataList"
          :key="i"
        >
          <view class="u-fx-jsb u-fx-ac">
            <view class="u-fx-ver">
              <view class="title u-main-color  u-mar-b20 u-font-2">{{
                item.name
              }}</view>
              <view class="u-type-info-dark">{{ item.createTime | gmtToDate("dateTime")}}</view>
            </view>
            <view class="tag">
              <view @click="goDetail(item.userCode)">{{ item.payMoney }}.00</view>
            </view>
          </view>
          <view class="u-bd-x u-mar-t20 u-mar-b20"></view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import eventBus from "@u/eventBus";
import noData from "@/components/no-data/no-data.vue";
import { store, actions } from "./store/index.js";
export default {
  components: {
    noData,
  },
  data() {
    return {
      value0: "",
      searchObj: {
        startTime: "",
      },
      pageList: {
        page: 1,
        size: 15,
      },
      morePage: false,
      dataList: [
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
        {
          name: "2020学费",
          createTime: "2020-10-15",
          payMoney: "2000",
        },
      ],
      list: [
        {
          name: "待缴费",
        },
        {
          name: "缴费逾期",
        },
        {
          name: "已缴费",
        },
      ],
      current: 0,
      collectNaterialNameList: [],
    };
  },
  async mounted() {
    eventBus.$on("getList", () => {
      this.showList();
    });
    this.showList();
  },
  methods: {
    tabChange(item) {
      console.log(item);
      this.current = item;
      this.pageList.page = 1;
      this.showList();
    },
    async showList(tag = false) {
      if (tag) {
        this.pageList.page += 1;
      } else {
        this.pageList.page = 1;
      }
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
        userCode: store.userInfo.userCode,
        date: this.searchObj.startTime,
        queryType: this.current === 0 ? 1 : this.current === 1 ? 2 : 3,
        state: this.value0,
      };
      // const res = await actions.getcollectionList(req);
      // this.total = res.data.total;
      // if (tag) {
      //   this.dataList = this.dataList.concat(res.data.list);
      // } else {
      //   this.dataList = res.data.list;
      // }
      // this.morePage = res.data.hasNextPage;
    },
    loadMore() {
      if (!this.morePage) {
        this.$tools.toast("数据已加载完毕");
        return;
      }
      this.showList(true);
    },
    goDetail(id) {
      this.$tools.navTo({
        url: "./detail?id=" + id,
        title: "查看",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 80rpx);
  margin-top: 20rpx;
}
.u-bd-x {
  border-top: 1px solid #f2f2f2;
}
</style>
