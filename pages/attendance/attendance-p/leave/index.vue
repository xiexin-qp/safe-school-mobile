<template>
  <view class="leave qui-page">
    <view class="dropDown qui-fx">
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value0" :list="casueList"></ms-dropdown-item>
      </ms-dropdown-menu>
      <ms-dropdown-menu>
        <ms-dropdown-item v-model="value1" :list="dateList"></ms-dropdown-item>
      </ms-dropdown-menu>
        <ms-dropdown-menu>
        <ms-dropdown-item v-model="value2" :list="dataList"></ms-dropdown-item>
      </ms-dropdown-menu>
    </view>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="content">
        <view class="record-box">
          <!-- <no-data msg="暂无考勤记录~" v-if="dayInfo.length === 0"></no-data> -->
          <view class="leave-box" v-for="(item,index) in leaveList" :key="index">
            <view class="leave-top qui-fx-jsb">
              <view class="leave-title"> {{ item.reason }} </view>
              <view v-if=" item.state === '0'  " class="leave-icon" @click="check(item.oddNumbers)"> ...</view>
            </view>
            <view class="leave-info"> 
              <view class="leave-pur">开始时间：{{ item.startTime | gmtToDate }}</view>
              <view class="leave-pur">结束时间：{{ item.endTime | gmtToDate }}</view>
              <view class="leave-pur">描述：{{ item.remark }}</view>
              <view class="leave-pur">状态：{{ item.state | getState }}</view>
            </view>
            <view class="leave-bottom qui-fx-jsb">
              <view class="leave-time"> {{ item.initiationTime | gmtToDate }}</view>
              <view class="leave-detail" @click="detail(item.oddNumbers)"> 查看详情 > </view>
            </view>
          </view>
        </view>
      </view>
     </scroll-view>
     <view class="float-add-btn" @click="addLeave"> </view>
  </view>
</template>

<script>
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
import person from '@s/img/person.png'
import add from '@s/img/add.png'
import { store, actions } from '../store/index.js'
export default {
  components: {
    msDropdownMenu,
    msDropdownItem
  },
  data () {
    return {
      add,
      person,
      dayInfo: [],
      leaveList: [],
      dataList: [],
      casueList: [{text:'请假类型',value:'0'}],
      dateList: [
        {
          text: '审批状态',
          value: '0'
        },
        {
          text: '待审批',
          value: '4'
        },
        {
          text: '审批通过',
          value: '1'
        },
        {
          text: '审批未通过',
          value: '2'
        },
        {
          text: '撤回',
          value: '3'
        }
      ],
      dataList: [
        {
            text: '全部时间',
            value: '0'
        },
        {
            text: '一周内',
            value: '7'
        },
        {
            text: '一个月内',
            value: '30'
        },
        {
            text: '六个月内',
            value: '180'
        }
      ],
      value0: '0',
      value1: '0',
      value2: '0'
    }
  },
  watch: {
		value0 (val, oldval) {
			if (val !== oldval) {
        this.teacherLeaveGet()
			}
		},
		value1 (val, oldval) {
			if (val !== oldval) {
        this.teacherLeaveGet()
			}
    },
		value2 (val, oldval) {
			if (val !== oldval) {
        this.teacherLeaveGet()
			}
		}
	},
  mounted () {
    this.leaveReasonGet()
    this.teacherLeaveGet()
  },
  methods: {
    async leaveReasonGet () {
      const res = await actions.getLeaveReason()
      const data = res.data.map(el => {
        el.text = el.name
        el.value = el.id
        return el
      })
      this.casueList =this.casueList.concat(data)
    },
    async teacherLeaveGet () {
      let value1 = ''
      if (this.value1 === '0') {
        value1 =  ''
      } else if ( this.value1 === '4' ) {
        value1 =  '0'
      }else {
        value1 =  this.value1 
      }
      const req = {
        applicantCode: store.userInfo.userCode,
        userCode: store.userInfo.studentCode,
        time: '',
        state: value1,
        page: 1,
        size: 20,
        userName: '',
        reasonId: this.value0 ===  '0' ? '' : this.value0,
        day: this.value2 === '0' ? '' : this.value2
      }
      const res = await actions.getStudentLeave(req)
      this.leaveList = res.data.list
    },
    addLeave () {
			this.$tools.navTo({
				url: './add',
				title: '新增请假单'
			})
		},
    check (oddNumbers) {
      const arr1 = ['修改', '撤回']
        this.$tools.actionsheet(arr1, (index) => {
          if (index === 0) {
            this.$tools.navTo({
              url: `./add?oddNumbers=${oddNumbers}`,
              title: '编辑请假单'
            })
          } else {
            this.$tools.confirm(`确定${arr1[index]}吗?`, () => {
              actions.recallStudentLeave(oddNumbers).then(res => {
                this.$tools.toast('操作成功')
                this.teacherLeaveGet()
              })
            })
          }
        })
      },
      detail (id) {
        this.$tools.navTo({
          url: `./detail?id=${id}`,
          title: '查看详情'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.leave {
  background-color: #f0f8ff;
  position: relative;
  .select-box {
    background-color: #f1f8ff;
    padding: 20rpx 0;
    .select {
      width: 30%;
      float: left;
      border: none;
      margin-left: 20rpx;
    }
  }
  .scroll-h {
    height: calc(100vh - 110rpx);
    // height: 85vh;
    .record-box {
      background-color: #f2f8fe;
      padding: 5rpx 5rpx 0 5rpx; 
      .leave-box {
        margin: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 25rpx 20rpx;
        &:first-of-type {
          margin-top: 0;
        }
        .leave-top {
          margin-bottom: 10rpx;
          .leave-icon {
            font-size: 40rpx;
            font-weight: bolder;
          }
          .leave-title {
            font-size: 32rpx;
            font-weight: bold;
          }
        }
        .leave-info {
          color: #acafaf;
          .leave-pur{
            padding: 6rpx 0;
            font-size: 28rpx;
          }
        }
        .leave-bottom {
          margin-top: 10rpx;
          padding-top: 10rpx;
          font-size: 28rpx;
          border-top: 1rpx solid #f9fbfb;
          .leave-time {
            color:#cbcdcd;
          }
          .leave-detail {
            font-weight: bold;
          }
        }
      }
    }
  }
}
.dropdown {
    padding: 4rpx 18rpx 18rpx 18rpx;
    background: #fff;
    font-size: 12px;
  }
  .dropdown-menu {
    width: 50%;
    padding: 2rpx 0;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    margin-bottom: 10rpx;
  }
  .dropdown-menu:first-child { 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
  .dropdown-menu:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .dropdown-item__selected {
    padding: 10rpx;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 1564327 */
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
    src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
  }
</style>
