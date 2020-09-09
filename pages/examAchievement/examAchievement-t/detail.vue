<template>
  <view class="u-page">
    		<dropdown-menu class="u-mar-b20" ref="dropdown" @value0Change="value0Change" @searchChange="searchChange"></dropdown-menu>

    <scroll-view scroll-y="true" class="scroll-h">
      <view class="approve-list" v-for="(item, i) in recordList" :key="i">
        <view class="u-mar-t20 u-padd-l40 u-font-3">
          <u-icon name="edit-pen" color="#2979ff" size="38"> </u-icon>
          <text class="u-padd-l40"> {{ item.subjectName }} </text>
        </view>
        <view class="u-mar-t20 u-padd-l40 u-padd-b30"
          >考试时间{{ item.testDate | gmtToDate }}</view
        >
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
      this.recordList = res.data;
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
