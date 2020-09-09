<template>
  <view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="u-fx item-list">
        <view class="tip">选择学生：</view>
        <view
          class="u-fx-f1 u-fx-je u-content-color u-font-01"
          @click="showPopTag = true"
          >{{ noWorkstuLength }}</view
        >
        <view class="rit-icon"></view>
      </view>
      <view class="u-fx-wp u-bd-b u-bg-fff u-padd-20 u-padd-t0">
        <u-tag
          class="u-mar-10"
          size="mini"
          type="primary"
          :text="item.praiseName"
          :show="item.tag"
          v-for="(item, i) in formData.noWorkstu"
          :key="i"
          closeable
          :index="i"
          @close="tagClose"
        />
      </view>
      <view class="u-fx item-list">
        <view class="tip"
          >选择表扬语<text class="u-light-color"
            >(最多选择3个标签,每个标签不超过5个字)</text
          ></view
        >
      </view>
      <view class="u-fx-wp u-bd-b u-bg-fff u-padd-20 u-padd-t0">
        <u-tag
          class="u-mar-10"
          size="mini"
          type="primary"
          :mode="item.mode"
          :text="item.label"
          :show="item.tag"
          v-for="(item, i) in recordList"
          :key="i"
          :index="i"
          @click="tagClick(item)"
        />
      </view>
    </scroll-view>
    <view class="common-btn" @click="submit">发布</view>
    <u-popup
      v-model="showPopTag"
      mode="center"
      border-radius="14"
      width="80%"
      height="80%"
    >
      <choose-students
        :bindList="formData.noWorkstu"
        :schoolInfo="schoolInfo"
        @close="popclose"
        @confirm="popselcet"
      ></choose-students>
    </u-popup>
  </view>
</template>

<script>
import eventBus from "@u/eventBus";
import { store, actions } from "./store/index.js";
import ChooseStudents from "@/components/choose-students/choose-students.vue";
export default {
  components: { ChooseStudents },
  data() {
    return {
      classCode: "",
      schoolYearId: "",
      formData: {
        noWorkstu: [],
      },
      showPopTag: false,
      noWorkstuLength: "请选择",
      schoolInfo: {},
      recordList: [],
      labelList: [],
    };
  },
  computed: {},
  created() {
    this.schoolYearId = uni.getStorageSync("classInfo").schoolYearId;
    this.classCode = uni.getStorageSync("classInfo").classCode;
    this.schoolInfo.schoolCode = store.userInfo.schoolCode;
    this.schoolInfo.schoolYearId = store.schoolYear.schoolYearId;
  },
  async mounted() {
    this.showList();
  },
  methods: {
    popclose() {
      this.showPopTag = false;
    },
    popselcet(data) {
      this.formData.noWorkstu = data.map((el) => {
        return {
          tag: true,
          category: 2,
          praiseNamePhoto: el.photoUrl,
          praiseName: el.userName,
          praiseCode: el.userCode,
          schoolYearId: el.schoolYearId,
          createUsercode: store.userInfo.userCode,
          createUsername: store.userInfo.userName,
          schoolCode: store.userInfo.schoolCode,
        };
      });
      this.noWorkstuLength = `已选择${this.formData.noWorkstu.length}人`;
      this.showPopTag = false;
    },
    tagClose(i) {
      this.formData.noWorkstu[i].tag = false;
      this.formData.noWorkstu = this.formData.noWorkstu.filter(
        (ele) => ele.tag
      );
      this.noWorkstuLength = `已选择${this.formData.noWorkstu.length}人`;
    },
    async showList() {
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
      };
      const res = await actions.praiseList(req);
      if (!res.data.list) {
        this.recordList = [];
        return;
      }
      this.recordList = res.data.list.map((el) => {
        return {
          ...el,
          mode: "plain",
        };
      });
    },
    tagClick(item) {
      item.mode = item.mode === "light" ? "plain" : "light";
      const initList = [];
      initList.push(item);
      var b = ["plain"];
      this.labelList = initList.filter((item) => {
        return !b.includes(item.mode);
      });
      console.log(this.labelList);
    },
    async submit() {
      if (this.formData.noWorkstu.length === 0) {
        this.$tools.toast("请选择要表扬的学生!");
        return false;
      }
        if (this.labelList.length === 0) {
        this.$tools.toast("请选择表扬语!");
        return false;
      }
      let label = [];
      this.labelList.forEach((ele) => {
        label.push(ele.label);
      });
      const req = {
        labelList: label,
        praiseList:  this.formData.noWorkstu,
      };
      await actions.addsetPraise(req);
      this.$tools.toast("操作成功");
      this.$tools.goNext(() => {
        eventBus.$emit("getList");
        this.$tools.goBack();
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-h {
  height: calc(100vh - 100rpx);
}
.tip::before {
  position: absolute;
  content: "*";
  color: red;
  left: 10rpx;
  width: 10rpx;
  height: 10rpx;
}
.item-list {
  padding: 25rpx 10rpx 25rpx 30rpx;
  background: $uni-bg-color;
}
.item-input {
  width: 100%;
  font-size: 26rpx;
  color: $u-tips-color;
}
.al-r {
  text-align: right;
}
.input-area {
  height: 400rpx;
}
/deep/ .uni-textarea-textarea {
  border: 1rpx solid $u-border-color;
  padding: 20rpx;
  height: 350rpx;
  line-height: 50rpx;
  color: $u-content-color;
}
/deep/ .uni-textarea-placeholder {
  padding: 20rpx;
}
</style>
