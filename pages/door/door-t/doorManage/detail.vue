<template>
  <view class="qui-page">
    <view class="list">
      <view class="th qui-fx-jsa qui-fx-ac qui-fx-jc">
        <text class="left">姓名</text>
        <view class="md qui-fx-ac qui-fx-jc">
          <text>性别</text>
          <view class="icon qui-fx-ver"></view>
        </view>
        <text class="right">组织机构</text>
        <text class="right">手机号</text>
        <text class="right">操作</text>
      </view>
      <scroll-view scroll-y="true" class="scroll-h">
        <view v-for="(item, i) in groupuserList" :key="i" class="tbody qui-bd-b qui-fx-jsb">
          <text class="left">{{ item.userName }}</text>
          <text class="md">{{ item.sex =='1'?'男' : '女' }}</text>
          <text class="right">{{ item.orgName }}</text>
          <text class="right">{{ item.mobile }}</text>
          <text class="right" @click="actionsheet(item)">删除</text>
        </view>
      </scroll-view>
    </view>
    <view class="foot">
      <view class="add foot" @click="add">+</view>
    </view>
  </view>
</template>
<script>
import noData from "@/components/no-data/no-data.vue";
import { store, actions } from "../store/index.js";
export default {
  components: {},
  data() {
    return {
      pageList: {
        pageNum: 1,
        pageSize: 20
      },
      groupuserList: [],
      ruleGroupCode: "",
      userGroupCode: ""
    };
  },
  onLoad(options) {
    this.ruleGroupCode = options.ruleGroupCode;
	this.userGroupCode = options.userGroupCode;
  },
  mounted() {
    this.showList();
  },
  methods: {
    async showList() {
      const req = {
        schoolCode: "123456",
        ruleGroupCode: this.ruleGroupCode,
        userGroupCode: this.userGroupCode,
        ...this.pageList
      };
      const res = await actions.getgroupuserList(req);
      this.groupuserList = res.data.list;
      this.total = res.data.total;
    },
    //删除
    actionsheet(item) {
      const req = {
        schoolCode: "123456",
        ruleGroupCode: item.ruleGroupCode,
        userGroupCode: item.userGroupCode,
        userCode: item.userCode
      };
      this.$tools.confirm("确定删除吗", () => {
        actions.delgroupuserList(req).then(res => {
          this.$tools.toast("删除成功");
          this.showList();
        });
      });
    },
    add() {
      this.$tools.navTo({
		url: "./add?ruleGroupCode=" + this.ruleGroupCode + '&userGroupCode=' + this.userGroupCode,
        title: "添加成员"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 25rpx 20rpx;
  font-size: 28rpx;
  .th {
    background: #7b92f5;
    padding: 20rpx 0;
    border-radius: 8rpx;
    color: #fff;
  }
  .tbody {
    position: relative;
    padding: 25rpx 10rpx;
  }
  .tbody:nth-child(even) {
    background: #f5f5f5;
  }
  .left {
    width: 20%;
    text-align: center;
  }
  .md {
    width: calc(35% - 40rpx);
    text-align: center;
  }
  .right {
    width: 35%;
    text-align: center;
  }
}
.scroll-h {
  height: calc(100vh - 100rpx);
}
.foot {
  height: 150rpx;
  .add {
    position: absolute;
    bottom: 40rpx;
    left: calc(50% - 40rpx);
    z-index: 1;
    width: 100rpx;
    height: 100rpx;
    line-height: 80rpx;
    border-radius: 100%;
    background: #0079ff;
    color: #fff;
    font-size: 100rpx;
    text-align: center;
  }
}
.uni-popup__wrapper-box {
  width: 270px;
  height: 179px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  border-width: 1px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 8px;
  box-shadow: none;
  .modal-ti {
    text-align: center;
    margin-top: 20rpx;
    font-size: 22px;
  }
  .modal-su {
    text-align: center;
    margin-top: 20rpx;
    font-size: 15px;
  }
  .modal-btn {
    text-align: center;
    border-top: 1px solid rgba(204, 204, 204, 1);
    margin-top: 70rpx;
    button {
      margin: 30rpx;
    }
  }
}
</style>
