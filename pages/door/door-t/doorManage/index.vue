<template>
	<view class="qui-page">
		<view class="head">我创建的通行权限组</view>
		<no-data msg="暂无数据" v-if="groupList.length === 0"></no-data>
		<scroll-view scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
			<view class="approve-list" v-for="(item, i) in groupList" :key="i">
				<view class="detail qui-fx">
					<view class="process-type">
						<view class="div-btn" @click="goDetail(item)">···</view>
					</view>
					<view class="info qui-fx-ac">
						<view class="list qui-fx-f1">
							<view class="name">{{ item.ruleGroupName }}</view>
							<view class="normal-time qui-fx-ac" v-for="(ele, i) in item.timeRuleList" :key="i">
								<text class="padd-r20">星期{{ toWeekName(ele.weekCode) }}</text>
								<view class="padd-t20 padd-b20" v-for="(item, j) in ele.timeRuleList" :key="j">
									<text>{{ item.accessStart }}</text>
									<text>~</text>
									<text>{{ item.accessEnd }}</text>
								</view>
							</view>
							<view class="qui-fx-wp">
								<view
									class="work-title normal-equ"
									v-for="item in item.controlGroupList"
									:key="item.controlGroupCode"
								>{{ item.controlGroupName }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import eventBus from "@u/eventBus.js";
import { store, actions } from "../store/index.js";
import noData from "@/components/no-data/no-data.vue";

export default {
  name: "index",
  components: {
    noData
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      groupList: [],
      userGroupCode: ""
    };
  },
  computed: {},
  mounted() {
    this.showList();
  },
  methods: {
    async showList(tag = false) {
      const res = await actions.getgroupList({
        schoolCode: store.userInfo.schoolCode,
        ruleGroupType: 1,
        pageNum: this.pageList.page,
        pageSize: this.pageList.size
      });
      this.groupList = res.data.list;
      this.total = res.data.total;
    },
    goDetail(item) {
      this.$tools.navTo({
        url:
          "./detail?ruleGroupCode=" +
          item.ruleGroupCode +
          "&userGroupCode=" +
          item.userGroupCode,
        title: "查看人员列表"
      });
    },
    toWeekName(day) {
      let week = new Map();
      week.set(1, "一");
      week.set(2, "二");
      week.set(3, "三");
      week.set(4, "四");
      week.set(5, "五");
      week.set(6, "六");
      week.set(7, "日");
      return week.get(day);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
}
.list {
  .name {
    margin-bottom: 30rpx;
  }
  .work-title {
    margin-top: 30rpx;
  }
  .div-btn {
    display: inline-block;
    cursor: pointer;
    font-size: 25px;
  }
  .normal-time {
    color: #555555;
  }
  .normal-equ {
    margin-right: 15rpx;
    font-size: 15px;
    color: #fff;
    text-align: center;
    background-color: $main-color;
    border-radius: $radius;
    padding: 10rpx 20rpx;
  }
}

.head {
  font-size: 18px;
  text-align: center;
  height: 100rpx;
  padding-top: 30rpx;
}
.approve-list {
  background-color: #fff;
  border-radius: 8rpx;
  border-bottom: 1rpx solid #cfd0d1;
  margin: 20rpx;
  position: relative;
  .detail {
    padding: 30rpx;
  }
  .process-type {
    top: 0;
    right: 20rpx;
    position: absolute;
    font-size: 48rpx;
  }
}
</style>
