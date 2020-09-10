<template>
  <view class="u-page">
    <dropdown-menu
      class="u-mar-b20"
      ref="dropdown"
      @value0Change="value0Change"
      @searchChange="searchChange"
    ></dropdown-menu>
    <scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
      <no-data v-if="recordList.length === 0" msg="暂无数据"></no-data>
      <view
        class="list u-padd-20 u-mar-b20 u-mar-l20 u-mar-r20 u-bg-fff u-border-radius"
        v-for="(item, i) in recordList"
        :key="i"
      >
        <view class="u-fx-jsb u-fx-ac">
          <view class="u-fx u-fx-ac">
            <u-lazy-load
              class="img u-border-radius-all u-mar-r20"
              :image="item.photoUrl"
            ></u-lazy-load>
            <view class="">
              <view class="title u-main-color u-bold u-mar-b20">{{
                item.userName
              }}</view>
            </view>
          </view>
          <view class="tag"> <view class="rit-icon"></view> </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { store, actions } from "./store/index.js";
import eventBus from "@u/eventBus";
import DropdownMenu from "./component/DropdownMenu.vue";
export default {
  components: { DropdownMenu },
  data() {
    return {
      recordList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
      id: "",
      gradeCode: "",
      classCode: "",
      schoolYearId: "",
      subjectCode:''
    };
  },
  created() {
    this.id = this.$tools.getQuery().get("id");
    this.schoolYearId = uni.getStorageSync("classInfo").schoolYearId;
    this.classCode = uni.getStorageSync("classInfo").classCode;
    this.gradeCode = uni.getStorageSync("classInfo").gradeCode;
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    value0Change(val) {
      this.classCode = val;
    },
    searchChange(val) {
    },
    async getDetail() {
      const req = {
        schoolCode: 'CANPOINTLIVE',
        schoolYearId: '66',
        ...this.pageList,
        gradeCode: '01',
        classCode: '20200101',
        planId: this.id,
        // subjectCode: this.subjectCode,
      };
      const res = await actions.getscoreList(req);
      this.recordList = res.data.list;
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 0rpx);
}
.approve-list {
  background-color: $uni-bg-color;
  border-radius: 16rpx;
  padding: $u-mp-20;
  margin: $u-mp-20;
  position: relative;
}
</style>
