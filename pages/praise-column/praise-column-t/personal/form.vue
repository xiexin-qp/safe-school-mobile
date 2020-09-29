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
      <view class="u-bd-b u-bg-fff u-padd-20">
        <u-tag
          class="u-mar-10"
          size="mini" 
          type="primary"
          :mode="item.mode"
          :text="item.label"
          :show="item.tag"
          :closeable="item.del"
          v-for="(item, i) in recordList"
          :key="i"
          :index="i"
          @click="tagClick(item,i)"
          @close="tagDel"
        />
        <u-button type="info" size="mini" class="add_p" @click="open">
          <u-icon
            name="plus
"
          ></u-icon
          >添加</u-button
        >
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
    <choose-student  :type="type" :bindList="formData.noWorkstu" :schoolInfo="schoolInfo" @close="popclose" @confirm="popselcet"></choose-student>
    </u-popup>
    <u-popup
      :maskCloseAble="true"
      ref="refuse"
      mode="center"
      length="80%"
      border-radius="14"
     class="new-top"
    >
      <view class="u-bd-b">
        <view class="u-padd-40">
          <template>
            <u-input
              v-model="label"
              :type="type"
              :border="border"
              placeholder="输入表扬语"
              :maxlength="5"
            />
          </template>
        </view>
      </view>
      <view
        ><view class="u-fx u-fx-jsa u-padd-40">
          <view class="u-type-info u-font-1" @click="close()">取消</view>
          <view class="u-type-primary u-font-1" @click="addPraise()">确定</view>
        </view></view
      >
    </u-popup>
  </view>
</template>
<script>
import eventBus from "@u/eventBus";
import { store, actions } from "../store/index.js";
import ChooseStudent from "../../component/choose-student.vue";
export default {
  components: { ChooseStudent },
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
      initList: [],
      border: true,
      type: "input",
      label: "",
      dataList: [],
    };
  },
  computed: {},
  created() {
    this.schoolYearId = uni.getStorageSync("bindInfo").schoolYearId;
    this.classCode = uni.getStorageSync("bindInfo").classCode;
    this.gradeCode = uni.getStorageSync("bindInfo").gradeCode;
    this.schoolInfo.schoolCode = store.userInfo.schoolCode;
    this.schoolInfo.classId = uni.getStorageSync("bindInfo").classCode;
    this.schoolInfo.gradeId = uni.getStorageSync("bindInfo").gradeCode;
    this.schoolInfo.schoolYearId = store.userInfo.schoolYearId;
  },
  async mounted() {
    this.showList();
  },
  methods: {
    open() {
      this.$refs.refuse.open();
    },
    close() {
      this.$refs.refuse.close();
    },
    addPraise() {
      this.recordList.push({
        label: this.label,
        mode: "plain",
        del: true,
        tag: true,
      });
      this.label = "";
      this.$refs.refuse.close();
    },
    popclose() {
      this.showPopTag = false;
    },
    popselcet(data) {
      this.formData.noWorkstu = data.map((el) => {
        return {
          ...el,
          tag: true,
          category: 2,
          praiseNamePhoto: el.photoUrl,
          praiseName: el.userName,
          praiseCode: el.userCode,
          schoolYearId: el.schoolYearId,
          createUsercode: store.userInfo.userCode,
          createUsername: store.userInfo.userName,
          schoolCode: store.userInfo.schoolCode,
          classCode: el.classCode,
          className: el.className,
          gradeCode: el.gradeCode,
          gradeName: el.gradeName,
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
    tagDel(i) {
      this.recordList[i].tag = false;
    },
    async showList() {
      const req = {
        ...this.pageList,
        schoolCode: store.userInfo.schoolCode,
      };
      const res = await actions.praiseList(req);
      if (!res.data.list) {
        this.dataList = [];
        return;
      }
      this.dataList = res.data.list.map((el) => {
        return {
          ...el,
          mode: "plain",
          del: false,
          tag: true,
        };
      });
      this.recordList = this.dataList.filter((item) => item.category === 2);
    },
    tagClick(item, index) {
      item.mode = item.mode === "light" ? "plain" : "light";
      console.log(item.mode);
      if (item.mode === "light") {
        this.initList.push(item);
        this.labelList = this.initList.filter((item) => item.mode === "light");
        if (this.labelList.length > 3) {
          this.$tools.toast("最多选择3个标签!");
          item.mode = "plain";
          return false;
        }
      } else if (item.mode === "plain") {
        this.initList.splice(index, 1);
      }
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
        praiseList: this.formData.noWorkstu,
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
.add_p {
  width: 124rpx;
  height: 40rpx;
}
.new-top{
    margin-top: -200rpx;
}
</style>
