<template>
  <view class="u-page">
    <view class="head">
      <ms-dropdown-menu v-if="showClass"
        ><ms-dropdown-item
          v-model="value0"
          :list="classList"
          :title="defTitle"
        ></ms-dropdown-item
      ></ms-dropdown-menu>
    </view>
    <scroll-view scroll-y="true" class="scroll-h">
     <detailList  :data-list="detail" ></detailList>
    </scroll-view>
    <view class="foot">
      <view class="float-add-btn" @click="add"></view>
    </view>
  </view>
</template>

<script>
import eventBus from "@u/eventBus";
import msDropdownMenu from "@/components/ms-dropdown/dropdown-menu.vue";
import msDropdownItem from "@/components/ms-dropdown/dropdown-item.vue";
import { store, actions } from "../store/index.js";
import hostEnv from "../../../../config/index.js";
import detailList from "../../component/detailList.vue";
export default {
  name: "index",
  components: {
    msDropdownMenu,
    msDropdownItem,
    detailList
  },
  data() {
    return {
      showClass: false,
      defTitle: "",
      showTag: false,
      classMotto: "",
      length: "0",
      classCode: "",
      gradeCode: "",
      schoolYearId: "",
      classList: [],
      value0: "",
      detail: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
    };
  },
  watch: {
    classMotto(val) {
      this.length = val.length;
    },
    value0(val, oldval) {
      console.log(val);
      if (val !== oldval) {
        this.defTitle = this.classList.filter((el) => {
          return el.value === val;
        })[0].text;
        this.classCode = val;
        if (store.isBZR && val === store.isBZR.classCode) {
          this.userType = "1";
        } else {
          this.userType = "0";
        }
        this.showList();
      }
    },
  },
  async created() {
    this.length = this.classMotto.length;
    this.schoolYearId = store.schoolYear.schoolYearId;
    if (store.userInfo.typeCode === "4") {
      this.userType = "0";
      if (store.teachClassList.length === 0) {
        this.$tools.toast("请绑定班级");
        return;
      }
      this.classList = store.teachClassList;
      this.classCode = store.teachClassList[0].value;
      this.gradeCode = store.teachClassList[0].gradeCode;
      this.showClass = true;
      this.defTitle = store.teachClassList[0].text;
      this.value0 = store.teachClassList[0].value;
      uni.setStorageSync("classInfo", {
        gradeCode: store.teachClassList[0].gradeCode,
        classCode: store.teachClassList[0].value,
        schoolYearId: this.schoolYearId,
      });
    }
    uni.setStorageSync("classInfo", {
      gradeCode: this.gradeCode,
      classCode: this.classCode,
      schoolYearId: this.schoolYearId,
    });
  },
  mounted() {},
  methods: {
    async showList() {
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
        gradeCode: this.gradeCode,
        classCode: this.classCode,
        schoolYearId: this.schoolYearId,
      };
      const res = await actions.getfindPraise(req);
      this.detail = res.data
    },
    add() {
      this.$tools.navTo({
        url: "./form",
        title: "发布表扬",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
  margin-top: 20rpx;
}
</style>
