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
    <scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
      <no-data v-if="studentList.length === 0" msg="暂无数据"></no-data>
      <view
        class="list u-padd-20 u-mar-b20 u-mar-l20 u-mar-r20 u-bg-fff u-border-radius"
        v-for="(item, i) in studentList"
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
          <view class="tag" > <view class="rit-icon" @click="goDetail(item.userCode)"></view> </view>
        </view>
      </view>
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
export default {
  name: "index",
  components: {
    msDropdownMenu,
    msDropdownItem,
  },
  data() {
    return {
      showClass: false,
      defTitle: "",
      classMotto: "",
      length: "0",
      classCode: "",
      gradeCode: "",
      schoolYearId: "",
      classList: [],
      value0: "",
      studentList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20,
      },
      morePage: false,
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
    async showList(tag = false) {
      if (tag) {
        this.pageList.page += 1;
      } else {
        this.pageList.page = 1;
      }
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
        gradeId: this.gradeCode,
        classId: this.classCode,
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
.list:nth-child(odd) {
  .sub {
    color: $u-type-primary;
    background-color: $u-type-primary-light;
  }
}
.list:nth-child(even) {
  .sub {
    color: $u-type-success;
    background-color: $u-type-success-light;
  }
}
.img {
  width: 100rpx;
  height: 100rpx;
}
</style>
