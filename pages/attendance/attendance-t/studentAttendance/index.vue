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
     	<scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
        <view v-for="list in dataList" :key="list.id" class="list qui-bd-b qui-fx-jsb qui-fx-ac">
          <text> {{ list.userName }} </text>
          <image :src="list.photoUrl ? list.photoUrl : 'child-auto-icon.png'" mode=""></image>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import { store, actions } from '../store/index.js'
export default {
	data() {
		return {
			dataList: [],
      attandenceInfo: [],
      day: new Date(),
      pageList: {
				page: 1,
				size: 15
      },
      morePage: false,
      num: 0
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
        teacherCode: store.userInfo.userCode,
        day: this.day
			}
      const res = await actions.classDayStatic(req)
      if ( res.data ) {
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
      } else {
        this.attandenceInfo = [{
          title: '正常',
          state: '5',
          num: 0
        },{
          title: '上学缺卡',
          state: '3',
          num: 0
        },{
          title: '迟到',
          state: '1',
          num: 0
        },{
          title: '早退',
          state: '2',
          num: 0
        },{
          title: '放学缺卡',
          state: '6',
          num: 0
        },{
          title: '缺勤',
          state: '7',
          num: 0
        }]
      }
			
    },
    change (data) {
      this.day = data.fulldate
      this.showList()
    },
		async detail(item, tag = false) {
      this.num = item.num
      if (item.num !== 0) {
        if (tag) {
          this.pageList.page += 1
        } else {
          this.pageList.page = 1
        }
        const req = {
          day: this.day,
          teacherCode: store.userInfo.userCode,
          state: item.state,
          page: this.pageList.page,
				  size: this.pageList.size
        }
        const res = await actions.classDayStaticDetail(req)
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
};
</script>

<style lang="scss" scoped>
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
        background-color: $uni-bg-color;
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
/deep/ .uni-popup__wrapper-box {
  width: 70%;
}
</style>
