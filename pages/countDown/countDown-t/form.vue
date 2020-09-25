<template>
  <view class="add">
    <class-tree
      isCheck
      v-show="classTag"
      :classTag="classTag"
      :schoolInfo="schoolInfo"
      @close="classClose"
      @confirm="classSelcet"
      :classChecked="classList"
    ></class-tree>
    <scroll-view scroll-y="true" class="scroll-h u-bg-fff">
      <view class="u-fx-ac u-bd-b item-list">
        <view class="tip">事件名称：</view>
        <view class="u-fx-f1"
          ><input v-model="formData.name" class="item-input"
        /></view>
      </view>
      <view class="u-fx-ac u-bd-b item-list">
        <view class="tip">提示语：</view>
        <view class="u-fx-f1"
          ><input v-model="formData.tips" class="item-input"
        /></view>
      </view>
      <view class="u-fx-ac u-bd-b item-list">
        <view class="tip">截至日期：</view>
        <view class="u-fx-f1 u-fx-je" @click="birthdayTag = true">
          <u-picker
            mode="time"
            v-model="birthdayTag"
            :params="params"
            @confirm="startConfirm"
          ></u-picker>
          <view class="uni-input u-content-color">{{ formData.endTime }}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="u-fx-ac u-bd-b item-list">
        <view class="tip">选择班级:</view>
        <view @click="chooseClass" class="u-fx-f1 u-fx">
          <view class="copyer u-fx-f1 u-content-color u-tx-r">
               <text v-if="classList.length === 0">请选择</text>
              <text v-if="classList.length >3">已选{{classList.length}}个班级</text>
            <u-tag
              v-if="classList.length <=3"
              v-for="(item, index) in classList"
              :key="index"
              :text="item.gradeName + item.className"
              mode="light"
              type="info"
              class="mar-l10"
            />
          </view>
          <view class="rit-icon"></view>
        </view>
      </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac">
      <u-button
        type="primary"
        class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg"
        @click="submit"
        >提交</u-button
      >
    </view>
  </view>
</template>

<script>
import { actions, store } from "./store/index";
import eventBus from "@u/eventBus";
import validateForm from "@u/validate";
import classTree from "@/components/class-tree/class-tree";
export default {
  components: { classTree },
  data() {
    return {
      schoolInfo: {
        schoolYearId: 0,
        schoolCode: "",
      },
      id: "",
      pageList: {
        page: 1,
        size: 15,
      },
      classList: [],
      birthdayTag: false,
      formData: {
        name: "",
        endTime: this.$tools.getPhoneTime(
          new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
          "date"
        ),
        tips: "",
      },
      params: {
        year: true,
        month: true,
        day: true,
      },
      classTag: false,
    };
  },
  created() {
    this.schoolInfo.schoolCode = store.userInfo.schoolCode;
    this.schoolInfo.schoolYearId = store.schoolYear ? store.schoolYear.schoolYearId : '';
  },
  watch: {},
  computed: {},
  async mounted() {
    this.id = this.$tools.getQuery().get("id");
    if (this.id) {
      this.detailGet(this.id);
    }
    // this.getclassList();
  },
  methods: {
    classClose() {
      this.classTag = false;
    },
    chooseClass() {
      this.classTag = true;
    },
    classSelcet(value) {
      this.classTag = false;
      this.classList = [];
      this.classList = value.map((el) => {
        return {
          classCode: el.classCode,
          className: el.className,
          gradeName: el.gradeName,
          schoolYearId: el.schoolYearId,
        };
      });
    },
    startConfirm(params) {
      this.formData.endTime = `${params.year}-${params.month}-${params.day}`;
    },
    async detailGet(id) {
      const res = await actions.getcountDetail(id);
      this.formData.endTime = this.$tools.getPhoneTime(
        new Date(res.data.endTime),
        "date"
      );
      this.formData.tips = res.data.tips;
      this.formData.name = res.data.name;
      this.classList = res.data.outCountDownClassDtoList;
    },
    changeTime(item) {
      this.formData.endTime = `${item.year}-${item.month}-${item.day}`;
    },
    async submit() {
      if (this.formData.name === "") {
        this.$tools.toast("请输入事件名称");
        return false;
      } else if (this.formData.endTime === "") {
        this.$tools.toast("请输入截至日期");
        return false;
      } else if (this.classList.length === 0) {
        this.$tools.toast("请选择发布对象");
        return;
      }
      let classCodes = [];
      this.classList.forEach((ele) => {
        classCodes.push(ele.classCode);
      });
      const req = {
        schoolCode: store.userInfo.schoolCode,
        classCodes: classCodes,
      };
      if (this.id) {
        await actions.updateCount({
          ...this.formData,
          ...req,
          id: this.id,
          schoolYearId: this.classList[0].schoolYearId,
        });
        this.$tools.toast("操作成功");
        this.$tools.goNext(() => {
          eventBus.$emit("getList");
          this.$tools.goBack();
        });
      } else {
        await actions.addCount({
          ...this.formData,
          ...req,
          schoolYearId: this.classList[0].schoolYearId,
        });
        this.$tools.toast("操作成功");
        this.$tools.goNext(() => {
          eventBus.$emit("getList");
          this.$tools.goBack();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.add {
  position: relative;
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .item-list {
    padding: 25rpx 15rpx 25rpx 25rpx;
    .tip::before {
      position: absolute;
      z-index: 99;
      content: "*";
      top: 30rpx;
      color: $u-type-error;
      font-weight: bold;
      left: 8rpx;
    }
    .item-input {
      width: 100%;
      font-size: 26rpx;
      color: $u-tips-color;
    }
    .radio {
      padding-left: 25rpx;
    }
    .upload {
      margin: 20rpx;
    }
  }
  .submit-box {
    height: 100rpx;
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      margin: 0 20rpx;
      background-color: $u-type-primary;
      color: $uni-bg-color;
      border-radius: $u-border-radius;
    }
  }
  .search {
    padding: 20rpx;
  }
  .scroll {
    height: 70vh;
    // padding-bottom: 10vh;
    .list {
      padding: 15rpx 25rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    .u-checkbox-group {
      display: flex;
      flex-direction: column;
    }
  }
}
.copyer {
  .u-size-default {
    padding: 10rpx 5rpx;
  }
}
.mar-l10 {
  margin-left: 10rpx;
      margin-top: 10rpx;

}
.submit-btn {
  height: 80rpx;
  justify-content: center;
  .btn {
    letter-spacing: 8rpx;
    margin: 0 20rpx;
  }
}
</style>
