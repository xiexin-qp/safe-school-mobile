<template>
  <view class="real-su u-page u-fx u-fx-ver">
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
    <view class="banner-img banner-sscq"></view>
    <check-status></check-status>
    <no-data v-if="dataList.length === 0"></no-data>
    <view class="u-fx u-fx-f1" v-else>
      <scroll-view scroll-y="true" class="floor-scroll">
        <view class="left-menu u-mar-l">
          <ul>
            <li @click="changeMenu(menu, index)" v-for="(menu, index) in floorList" :key="index" :class="['u-bd-b', {'act': currentIndex === index}]">
              {{ menu.value }}
            </li>
          </ul>
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" class="scroll-h">
        <toggle-list :data-list="roomList">
          <template v-slot:title="row">
            <view class="u-fx-jsb">
              <view>
                <i class="iconfont iconfangjianshu- ss-icon"></i>
                <view class="room-text">{{row.list.roomName}}</view>
              </view>
              <view class="person-list">
               {{row.list.personList.length}}/{{row.list.specifications}}
              </view>
            </view>
          </template>
          <template v-slot:list="row">
            <view class="person-info">
              <no-data v-if="row.list.personList.length === 0"></no-data>
              <view
                @click="showPerson(item, getStatus(item.personId))"
                v-for="(item, index) in row.list.personList"
                :key="index"
                :class = "['student-btn', {
                  'sl_sjx_icon': getStatus(item.personId) === '1',
                  'bk_sjx_icon': getStatus(item.personId) === '2',
                  'dk_sjx_icon': getStatus(item.personId) === '3',
                  'dksl_sjx_icon': getStatus(item.personId) === '4',
                  'bzq_sjx_icon': getStatus(item.personId) === '5'
                }]"
              >{{ item.personName }}</view>
            </view>
          </template>
        </toggle-list>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import NoData from '../../../components/no-data/no-data'
import ToggleList from './ToggleList'
import StudentInfo from '../component/StudentInfo'
import SignCard from '../component/SignCard'
import CheckStatus from '../component/CheckStatus'
import { store, actions } from '../store/index.js'
export default {
  name: 'RealCheckS',
  components: {
    NoData,
    ToggleList,
    StudentInfo,
    SignCard,
    CheckStatus
  },
  data () {
    return {
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
      info: {},
      dataList: []
    }
  },
  props: {
    deptCode: {
      type: String,
      default: ''
    }
  },
  async mounted () {
    const req = {
      schoolCode: store.userInfo.schoolCode,
      buildingCode: this.deptCode
    }
    const res = await actions.getDormFloorList(req)
    this.dataList = res.data
    if (res.data.length === 0) return
    this.floorList = res.data.map(item => {
      return {
        key: item.floorCode,
        value: item.floorName
      }
    })
    this.floorCode = this.floorList[0].key
    this.getRoomList(this.floorList[0].key)
  },
  methods: {
    signOk () {
      this.signTag = false
      this.$tools.goNext(() => {
        this.getRoomList(this.floorCode)
      })
    },
    showPerson (item, status) {
      this.dialogTag = true
      this.currentStudent = {
        userStatus: status === '5' ? '1' : '2',
        userCode: item.personId,
        userName: item.personName
      }
      setTimeout(() => {
        this.$refs.studentInfo.loadInfo(item.personId)
      })
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
    getStatus (id) {
      let status = this.statusList.find(item => {
        return item.userCode === id
      })
      return typeof status === 'object' ? status.stateValue : '5'
    },
    changeMenu (item, index) {
      this.currentIndex = index
      this.floorCode = item.key
      this.getRoomList(item.key)
    },
    getDateTime (time) {
      return this.$tools.getDateTime(time).substring(0, 16)
    }
  }
}
</script>

<style lang="scss" scoped>
.real-su {
  .banner-sscq {
    background: url('http://canpointtest.com/mobile-img/sg-sscq.png') no-repeat;
  }
  .banner-img {
    width: 100%;
    height: 240rpx;
    background-size: 100% 240rpx;
  }
  .left-menu {
    ul {
      width: 210rpx;
      box-shadow: 1rpx 0rpx 6rpx ￥u-border-color-dark;
      background-color:#fff;
      li {
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: $u-content-color;
        &.act {
          font-size: 32rpx;
          background-color:$u-bg-color;
          color:#fff;
        }
      }
    }
  }
  .floor-scroll {
    height: calc(100vh - 314rpx);
    width: 210rpx;
  }
  .scroll-h {
    height: calc(100vh - 314rpx);
    .room-text {
      font-size: 30rpx;
      color: $u-content-color;
      font-weight: bold
    }
    .person-list{
      font-size: 12rpx;
      font-weight: bold;
      color:$u-tips-color;
    }
    .person-info{
      margin-bottom: 10rpx;
      overflow: auto;
      .student-btn {
        height: 60rpx;
        line-height: 60rpx;
        background-color: $u-bg-color;
        text-align: center;
        border-radius: 8rpx;
        margin-top: 15rpx;
        float: left;
        width: 30%;
        margin-left: 2.5%;
        color: $u-content-color;
      }
    }
    .ss-icon {
      color:$u-type-primary !important;
      font-size: 32rpx;
    }
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
