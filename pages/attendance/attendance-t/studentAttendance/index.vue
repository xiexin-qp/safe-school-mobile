<template>
  <view class="student-attendance qui-page">
    <view>
      <view>
        <uni-calendar @change="change"></uni-calendar>
      </view>
      <view class="record-box">
        <view class="attandence-title qui-fx-ac-jc">上下学考勤统计</view>
        <view class="attandence-box">
          <view 
            class="attandence-info qui-fx-ac-jc" 
            v-for="item in attandenceInfo" 
            :key="item.id"
            @click="detail(item)"
          >
            <view> {{item.title}}</view>
            <view class="attandence-num"> {{item.num}}人</view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="center">
     	<scroll-view scroll-y="true" class="scroll-h">
        <view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
          <text>{{ list.name }}</text>
          <image :src="person" mode=""></image>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import person from '@s/img/person.png';
import { store, actions } from '../store/index.js'
export default {
	data() {
		return {
			person,
			dataList: [],
      attandenceInfo: [],
      day: new Date()
		}
	},
	mounted() {
    const date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    this.day = y + '-' + m + '-' + d
		this.showList();
	},
	methods: {
		async showList () {
      const req = {
        teacherCode: store.userCode,
        day: this.day
			}
      const res = await actions.classDayStatic(req)
			this.attandenceInfo = [{
        title: '正常',
        state: '5',
        num: res.data.normalCount
      },{
        title: '上学缺卡',
        state: '3',
        num: res.data.onNoRecordCount
      },{
        title: '迟到',
        state: '1',
        num: res.data.lateCount
      },{
        title: '早退',
        state: '2',
        num: res.data.earlyCount
      },{
        title: '放学缺卡',
        state: '6',
        num: res.data.offNoRecordCount
      },{
        title: '缺勤',
        state: '7',
        num: res.data.noRecord
      }]
    },
    change (data) {
      console.log('data',data.fulldate)
      this.day = data.fulldate
      this.showList()
    },
		async detail(item) {
      console.log('item', item)
      const req = {
				day: this.day,
        teacherCode: store.userCode,
        state: item.state
			}
      const res = await actions.classDayStaticDetail(req)
			this.$refs.popup.open()
		}
	}
};
</script>

<style lang="less" scoped>
.student-attendance {
  .record-box {
    padding-top: 20rpx;
    background-color: #f2f8fe;
    .attandence-title {
      height: 60rpx;
      line-height: 60rpx;
      font-size: 36rpx;
    }
    .attandence-box {
      height: 320rpx;
      .attandence-info {
        width: 31%;
        float: left;  
        margin-bottom: 30rpx;
        background-color: #fff;
        margin: 15rpx 0 5rpx 15rpx;
        padding: 20rpx 0;
        border-radius: 15rpx;
        image {
          width: 60rpx;
          margin-bottom: 10rpx;
        }
      }
      :nth-child(3n) {
        border-right: none;
      }
      .attandence-num {
        color: #ccc;
        font-size: 28rpx;
      }
    }
  }
  .scroll-h {
    height: 70vh;
    .list {
      padding: 15rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
}
</style>
