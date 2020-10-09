<template>
  <view class="u-page">
        <choose-child @change="childInfo"></choose-child>
    <scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
         <praiseList  :data-list="studentList" @goDetail="goDetail"></praiseList>
    </scroll-view>
  </view>
</template>

<script>
import eventBus from "@u/eventBus";
import { store, actions } from "./store/index.js";
import hostEnv from "../../../config/index.js";
import PraiseList from "../component/praiseList.vue";
import chooseChild from "@/components/choose-child/choose-child.vue";

export default {
  name: "index",
  components: {
    PraiseList,
    chooseChild,
  },
  data() {
    return {
      classCode: "",
      schoolYearId: "",
      studentList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
      morePage: false,
      gradeCode: "",
    };
  },
  watch: {
    classCode(val) {
      this.showList();
    },
  },
  async created() {
    this.schoolYearId = store.schoolYear.schoolYearId;
    this.classCode = store.childList[0].classCode;
    this.gradeCode = store.childList[0].gradeCode;
  },
  mounted() {},
  methods: {
    childInfo(item) {
      console.log(item);
      if (item.classCode !== this.classCode) {
        this.classCode = item.classCode;
      }
      if (item.gradeCode !== this.gradeCode) {
        this.gradeCode = item.gradeCode;
      }
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
        classId: this.classCode,
        gradeId: this.gradeCode,
        schoolYearId: this.schoolYearId,
      };
      const res = await actions.getStudentList(req);
      if (tag) {
        this.studentList = this.studentList.concat(res.data.list);
      } else {
        this.studentList = res.data.list;
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
    goDetail(id) {
      this.$tools.navTo({
        url: "./detail?id=" + id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 20rpx);
}
</style>
