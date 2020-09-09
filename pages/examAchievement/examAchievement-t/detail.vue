<template>
  <view class="u-page">
  <dropdown-menu class="u-mar-b20" ref="dropdown" @value0Change="value0Change" @searchChange="searchChange"></dropdown-menu>
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
          <view class="tag" > <view class="rit-icon"></view> </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { store, actions } from "./store/index.js";
import eventBus from "@u/eventBus";
import DropdownMenu from './component/DropdownMenu.vue';
export default {
  components: {DropdownMenu},
  data() {
    return {
      recordList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
      id:''
    };
  },
  mounted() {
    this.id = this.$tools.getQuery().get("id");
    this.getDetail();
  },
  methods: {
    		value0Change(val) {
			this.classCode = val;
    this.getDetail();
		},
		searchChange(val) {
			// this.dateTime = val === '选择日期' ? '' : val;
    this.getDetail();
		},
    async getDetail() {
      const req = {
        schoolCode: store.userInfo.schoolCode,
        schoolYearId: this.schoolYearId,
        ...this.pageList,
        gradeCode: this.gradeCode,
        classCode: this.classCode,
        planId: this.id,
        subjectCode: this.subjectCode
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
