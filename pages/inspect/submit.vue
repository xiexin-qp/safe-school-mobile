<template>
  <view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="u-type-white-bg u-font-01 u-padd-l10">
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view class="tip">值班员：</view>
          <view class="u-fx-f1 u-fx-je u-light-color" @click="add('1')">
            {{ formData.watchName }}
          </view>
          <view class="rit-icon"></view>
        </view>
        <view class="u-fx-jsb u-bd-b u-padd">
          <view class="tip">值班员电话：</view>
          <view class="u-fx-f1 u-fx-je">
            <input type="number" class="u-font-01 u-tx-r u-padd-r10" v-model="formData.watchPhone"
          /></view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view class="tip">带班领导：</view>
          <view class="u-fx-f1 u-fx-je u-light-color" @click="add('2')">
            {{ formData.leaderName }}
          </view>
          <view class="rit-icon"></view>
        </view>
        <view class="u-fx-jsb u-bd-b u-padd">
          <view class="tip">带班领导电话：</view>
          <view class="u-fx-f1 u-fx-je">
            <input type="number" class="u-font-01 u-tx-r u-padd-r10" v-model="formData.leaderPhone"
          /></view>
        </view>
      </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac">
      <u-button type="primary" class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg" @click="submitForm">
        开始值班
      </u-button>
    </view>
    <teacher-tree
      isRadio
      :teacherTag="teacherTag"
      v-show="teacherTag"
      :schoolInfo="schoolInfo"
      @close="teacherTag = false"
      @confirm="teacherSelcet"
      :classChecked="[]"
    >
    </teacher-tree>
  </view>
</template>

<script>
import teacherTree from '@/components/teacher-tree/teacher-tree'
import validateForm from '@u/validate'
import { store, actions } from './store/index.js'
const yzForm = {
  watchName: '请选择值班员',
  leaderName: '请选择带班领导'
}
export default {
  components: {
    teacherTree
  },
  data() {
    return {
      detailInfo: {},
      formData: {
        watchName: '请选择值班员',
        leaderName: '请选择带班领导'
      },
      teacherTag: false,
      causeNameList: [],
      schoolInfo: {
        schoolYearId: 0,
        schoolCode: ''
      },
      type: '1'
    }
  },
  created() {
    this.schoolInfo.schoolCode = store.userInfo.schoolCode
    this.schoolInfo.schoolYearId = store.schoolYear.schoolYearId
  },
  methods: {
    teacherSelcet(value) {
      if (value.length === 0) {
        this.$tools.toast('请选择人员')
        return
      }
      console.log('1111', value)
      this.teacherTag = false
      if (this.type === '1') {
        this.formData.watch = value[0].name
        this.formData.watchAvatar = value[0].photoUrl
        this.formData.watchPhone = value[0].mobile
        this.formData.watchJob = '' //	值班人职务
      } else {
        this.formData.leader = value[0].name
        this.formData.leaderPhone = value[0].mobile
      }
    },
    add(type) {
      this.type = type
      this.teacherTag = true
    },
    submitForm() {
      validateForm(yzForm, this.formData, () => {
        //   let req = {
        //     ...this.formData,
        //     schoolCode: store.userInfo.schoolCode,
        //     reporterCode: store.userInfo.userCode,
        //     reporterName: store.userInfo.userName
        //   }
        //   req.photoUrl = this.formData.photoUrl.map((el) => {
        //     if (el.indexOf('http') === -1) {
        //       return el.split(',')[1]
        //     } else {
        //       return el
        //     }
        //   })
        //   actions.reportDanger(req).then((res) => {
        //     this.$tools.toast('上报成功')
        //     this.$tools.goNext(() => {
        //       this.$tools.goBack()
        //     })
        //   })
      })
    },

    confirm() {
      // const resultList = []
      // this.detailInfo.itemList.map((el) => {
      //   el.standardList.map((item) => {
      //     resultList.push({ id: item.id, result: item.checked ? '1' : '0' })
      //   })
      // })
      // const req = {
      //   resultList: resultList,
      //   submitType: this.state,
      //   taskId: this.taskId,
      //   userCode: store.userInfo.userCode,
      //   userName: store.userInfo.userName
      // }
      // this.$tools.confirm('确定提交检查结果吗？', () => {
      //   actions.checkSpecial(req).then((res) => {
      //     this.$tools.toast('提交成功')
      //     this.$tools.goNext(() => {
      //       eventBus.$emit('getList')
      //       this.$tools.navTo({
      //         url: './index'
      //       })
      //     })
      //   })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 120rpx);
  .content-title {
    height: 70rpx;
    background-color: #eee;
    align-items: center;
  }
  .add-item {
    align-items: center;
  }
}
.tip::before {
  position: absolute;
  z-index: 99;
  content: '*';
  top: 30rpx;
  color: red;
  font-weight: bold;
  left: 0;
}
.uni-input-placeholder {
  color: $u-light-color;
}
</style>
