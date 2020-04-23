<template>
  <view class="stundent-statistics qui-page">
    <view>
      <view class="title qui-fx-ac">
        <image :src="person" mode=""></image>
        <view>{{studentName}} {{month}} 考勤统计</view>
      </view>
      <view class="record-box">
        <view class="attandence-box">
          <view 
            class="attandence-info qui-fx-ac-jc" 
            v-for="item in attandenceInfo" 
            :key="item.id"
            @click="detail(item)"
          >
            <image :src="normal" mode=""></image>
            <view> {{item.title}}</view>
            <view class="attandence-num"> {{item.num}}</view>
          </view>
        </view>
      </view>
      <view class="title qui-fx-ac">
        <image :src="person" mode=""></image>
        <view>{{studentName}}  {{month}} 考勤记录</view>
      </view>
      <scroll-view scroll-y="true" class="scroll">
        <steps :studentCode="studentCode" :month="month"></steps>
      </scroll-view>
    </view>
    <uni-popup ref="popup" type="center">
     	<scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
        <view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
          <text>{{ list | gmtToDate('date') }}</text>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import steps from './steps.vue'
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
import { store, actions } from '../store/index.js'
export default {
  components: {
    steps
  },
  data () {
    return {
      person,
      normal,
      dataList: [],
      attandenceInfo:[],
      pageList: {
				page: 1,
				size: 15
      },
      morePage: false,
      num: '',
      studentCode: '',
      studentName: '',
      month: ''
    }
  },
   onLoad(options) {
    console.log('options',options)
    this.studentCode = options.userCode
    this.studentName = options.name
    this.month = options.month
  },
  mounted() {
    this.showList()
  },
  methods: {
  	async showList () {
      const req = {
				month: this.month,
				studentCode: this.studentCode
			}
      const res = await actions.studentMonthStatic(req)
			if (res.data) {
        this.attandenceInfo = [{
          title: '正常',
          state: '5',
          num: `${res.data.normalCount}天`
        },{
          title: '上学缺卡',
          state: '3',
          num: `${res.data.onNoRecordCount}次`
        },{
          title: '迟到',
          state: '1',
          num:  `${res.data.lateCount}次`
        },{
          title: '早退',
          state: '2',
          num:  `${res.data.earlyCount}次`
        },{
          title: '放学缺卡',
          state: '6',
          num:  `${res.data.offNoRecordCount}次`
        },{
          title: '缺勤',
          state: '7',
          num:  `${res.data.noRecord}天`
        }]
      } else {
        this.attandenceInfo = [{
          title: '正常',
          state: '5',
          num: '0天'
        },{
          title: '上学缺卡',
          state: '3',
          num: '0次'
        },{
          title: '迟到',
          state: '1',
          num:  '0次'
        },{
          title: '早退',
          state: '2',
          num:  '0次'
        },{
          title: '放学缺卡',
          state: '6',
          num:  '0次'
        },{
          title: '缺勤',
          state: '7',
          num:  '0天'
        }]
      }
		},
    async detail (item, tag = false) {
      this.num = item.num
      if (item.num !== '0次' && item.num !== '0天') {
        if (tag) {
          this.pageList.page += 1;
        } else {
          this.pageList.page = 1;
        }
        const req = {
          month: this.month,
          studentCode: this.studentCode,
          state: item.state,
          page: this.pageList.page,
				  size: this.pageList.size
        }
        const res = await actions.childStaticDetail(req)
        if (tag) {
          this.dataList = this.dataList.concat(res.data)
        } else {
          this.dataList = res.data
        }
			  this.morePage = res.data.hasNextPage
        this.$refs.popup.open()
      }
    },
    loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕')
				return
			}
			this.detail(this.num, true)
		}
  }
}
</script>

<style lang="less" scoped>
.stundent-statistics {
    background-color: #f1f8ff;
    .title {
      height: 80rpx;
      background-color: #fff;
      justify-content: center;
      image {
        width: 50rpx;
        height: 50rpx;
        margin-right: 10rpx;
        border-radius: 50%;
      }
    }
    .record-box {
      background-color:#f2f8fe;
      .attandence-box {
        height: 425rpx;
        .attandence-info {
          width: 29.8%;
          float: left;  
          background-color: #fff;
          margin: 15rpx 0 5rpx 20rpx;
          padding: 20rpx 0;
          border-radius: 15rpx;
          image {
            width: 60rpx;
            height: 60rpx;
            margin-bottom: 10rpx;
          }
          .attandence-num {
            color: #ccc;
            font-size: 28rpx;
          }
        }
        :nth-child(3n) {
          border-right: none;
        }
      }
    }
  .scroll-h {
    height: 70vh;
    .list {
      padding: 15rpx 25rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
  .scroll {
    height: calc(100vh - 620rpx);
    background-color: #fff;
    margin-top: 15rpx;
  }
}
</style>