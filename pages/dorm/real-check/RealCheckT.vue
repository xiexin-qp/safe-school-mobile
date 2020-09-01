<template>
  <div class="real-su u-page u-fx u-fx-ver">
     <u-popup v-model="dialogTag" mode="center" length="70%">
      <student-info ref="studentInfo" :current-student="currentStudent">
        <view class="u-fx">
          <u-button @click="dialogTag = false; signTag = true">补卡</u-button>
          <!-- <u-button @click="dialogTag = false; leaveTag = true">请假</u-button> -->
        </view>
      </student-info>
    </u-popup>
    <u-popup v-model="signTag" mode="bottom">
      <sign-card @sign-ok="signOk" :current-student="currentStudent"></sign-card>
    </u-popup>
    <div class="banner-img banner-sscq"></div>
    <top-menu :menu-list="sexList" @change-menu="changeMenu"></top-menu>
    <check-status></check-status>
    <scroll-view scroll-y="true" class="scroll-h">
      <div>
        <no-data v-if="!studentList || studentList.length === 0"></no-data>
      <div
        v-else
        @click="showPerson(item, getStatus(item.personId))"
        v-for="(item, index) in studentList"
        :key="index"
        :class = "['student-btn student-list', {
        'sl_sjx_icon': getStatus(item.userCode) === '1',
        'bk_sjx_icon': getStatus(item.userCode) === '2',
        'dk_sjx_icon': getStatus(item.userCode) === '3',
        'dksl_sjx_icon': getStatus(item.userCode) === '4',
        'bzq_sjx_icon': getStatus(item.userCode) === '5',
      }]"
      >{{ item.userName }}</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import NoData from '../../../components/no-data/no-data'
import TopMenu from '../component/TopMenu'
import StudentInfo from '../component/StudentInfo'
import CheckStatus from '../component/CheckStatus'
import SignCard from '../component/SignCard'
import { setTimeout } from 'timers'
import { store, actions } from '../store/index.js'
export default {
  name: 'RealCheckS',
  components: {
    TopMenu,
    StudentInfo,
    CheckStatus,
    SignCard,
    NoData
  },
  data () {
    return {
      dialogTag: false,
      signTag: false,
      statusList: [],
      sexList: [{
        key: 1,
        value: '男生'
      }, {
        key: 2,
        value: '女生'
      }],
      sex: 1,
      studentList: [],
      currentStudent: {},
      currentIndex: 0,
      qjValue: '1',
      studentResult: [],
      timeType: 0,
      qjTime: new Date(),
      qjForm: {
        startTime: this.getDateTime(new Date()),
        endTime: '结束日期'
      },
      signType: '1',
      dialogTag: false,
      signTag: false,
      statusList: [],
      floorList: [],
      roomList:[],
      floorCode: '',
      currentStudent: {},
      info: {}
    }
  },
  props: {
    deptCode: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {
    signOk () {
      this.signTag = false
      this.$tools.goNext(() => {
        this.getStudentList(this.sex)
      })
    },
    showPerson (item, status) {
      this.dialogTag = true
      this.currentStudent = {
        userStatus: status === '5' ? '1' : '2',
        userCode: item.userCode,
        userName: item.userName
      }
      setTimeout(() => {
        this.$refs.studentInfo.loadInfo(item.userCode)
      })
    },
    getStudentList (gender = 1) {
      actions.getStatusByClass({
        gender,
        schoolCode: store.userInfo.schoolCode,
        classCode: this.deptCode
      }).then(res => {
        this.statusList = res.data
        actions.getStudentByClass({
          gender,
          schoolCode: store.userInfo.schoolCode,
          classCode: this.deptCode
        }).then(res => {
          this.studentList = res.data
        })
      })
    },
    getStatus (id) {
      if (this.statusList === null) {
        this.statusList = []
      }
      let status = this.statusList.find(item => {
        return item.userCode === id
      })
      return typeof status === 'object' ? status.stateValue : '5'
    },
    changeMenu (item) {
      this.sex = item.key
      this.getStudentList(item.key)
    },
    getRoomList (code) {
      actions.getStatusByBuild({
        schoolCode: store.userInfo.schoolCode,
        floorCode: code
      }).then(res => {
        this.statusList = res.data
        actions.getStudentByBuild({
          floorCode: code,
          schoolCode: store.userInfo.schoolCode
        }).then(res => {
          this.roomList = res.data.map(item => {
            return {
              ...item,
              toggle: false
            }
          })
        })
      })
    },
    getDateTime (time) {
      return this.$tools.getDateTime(time).substring(0, 16)
    }
  }
}
</script>

<style lang="scss" scoped>
.student-list {
  margin-top: 30rpx;
  float: left;
  width: 30%;
  margin-left: 2.5%;
  color: #666;
  height: 60rpx;
  line-height: 60rpx;
  background-color: $u-border-color;
  text-align: center;
  border-radius: 8px;
}
.real-su {
  .banner-sscq {
    background: url('http://canpointtest.com/mobile-img/sg-sscq.png') no-repeat;
  }
  .banner-img {
    width: 100%;
    height: 240rpx;
    background-size: 100% 240rpx;
  }
  .scroll-h {
    height: calc(100vh - 416rpx);
    background-color: #fff;
  }
}
/deep/ .u-mode-center-box{
  border-radius: 12rpx;
}
/deep/ .u-section-title:after{
  height: 40rpx;
}
/deep/ .u-size-default{
  height: 74rpx;
  margin-top: 16rpx;
}

</style>
