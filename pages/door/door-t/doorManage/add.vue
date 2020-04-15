<template>
  <view class="add">
    <view class="head">
      <uni-search-bar @confirm="search" @input="input"></uni-search-bar>
    </view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="warp">
        <view class="box">
          <t-table border="1" border-color="#eeeeee" :is-check="true" @change="change">
            <t-tr font-size="14" color="#fff" align="center" class="tit_tr">
              <t-th align="center">姓名</t-th>
              <t-th align="center">手机号</t-th>
              <t-th align="center">组织机构</t-th>
            </t-tr>
            <t-tr
              font-size="12"
              color="#5d6f61"
              align="right"
              v-for="(item, i) in groupList"
              :key="i"
            >
              <t-td align="center">{{ item.userName }}</t-td>
              <t-td align="center">{{ item.mobile }}</t-td>
              <t-td align="center">{{ item.orgName }}</t-td>
            </t-tr>
          </t-table>
        </view>
      </view>
    </scroll-view>
    <view class="foot">
      <button class="mini-btn" type="default" size="mini">取消</button>
      <button class="mini-btn" type="primary" size="mini" @click="addInfo">保存</button>
    </view>
  </view>
</template>
<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import tTable from "@/components/t-table/t-table.vue";
import tTh from "@/components/t-table/t-th.vue";
import tTr from "@/components/t-table/t-tr.vue";
import tTd from "@/components/t-table/t-td.vue";
import eventBus from "@u/eventBus.js";
import { actions } from "../store/index.js";
export default {
  components: {
    uniSearchBar,
    tTable,
    tTh,
    tTr,
    tTd
  },
  data() {
    return {
      pageList: {
        pageNum: 1,
        pageSize: 20
      },
      groupList: [],
      ruleGroupCode: "",
      userGroupCode: ""
    };
  },
  async mounted() {
    const req = {
      schoolCode: "QPZX",
      ruleGroupCode: this.ruleGroupCode,
      userGroupCode: this.userGroupCode,
      ...this.pageList
    };
    const res = await actions.getgroupuserList(req);
    this.groupList = res.data.list;
    this.total = res.data.total;
  },
  methods: {
    change(e) {
	  console.log(e.detail);
	  
    },
    addInfo() {}
  }
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx - 100rpx);
}
.head {
  height: 100rpx;
}
.foot {
  height: 100rpx;
  text-align: center;
  button {
    margin: 0 30rpx;
  }
}
.tit_tr {
  background: #7b92f5;
}
</style>
