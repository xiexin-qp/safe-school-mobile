<template>
  <view class="statistics qui-page">
    <view>
      <view class="year-list">
        <view class="title">{{yearTitle.split('-')[0]}}年</view>
        <view class="last-month qui-fx qui-fx-jsa" >
					<view @click="searchMonth(month)" :class="{'act': yearTitle === month}" v-for="month in lastMonth" :key="month">
						{{ month.split('-')[1] }}月
					</view>
				</view>
      </view>
      <view class="record-box">
        <view class="attandence-title qui-fx-ac-jc">上下班考勤统计</view>
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
    </view>
    <uni-popup ref="popup" type="center">
      <scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
        <view v-for="list in dataList" :key="list" class="list qui-bd-b">
          <text>{{ list | gmtToDate('date') }}</text>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import person from '@s/img/person.png'
import normal from '@s/img/normal.png'
import { store, actions } from '../store/index.js'
export default {
  data () {
    return {
      person,
      normal,
      dataList: [],
      attandenceInfo:[],
			lastMonth: this.lastFiveMonth(),
      yearTitle: this.lastFiveMonth().pop(),
      pageList: {
				page: 1,
				size: 15
      },
      morePage: false,
      num: ''
    }
  },
  mounted () {
    this.searchMonth(this.yearTitle)
  },
  methods: {
		lastFiveMonth (num = 6) {
			var monthArr = []
			var date = new Date()
			var year = date.getFullYear()
			var month = date.getMonth() + 2
			if (month > num) {
				for (var i = month - 1; i >= month - num; i--) {
					monthArr.push(year + '-' + (i > 9 ? i : '0' + i))
				}
			} else {
				var lastY = year - 1
				var cMonth = month - 1
				var lastM = num - (month - 1)
				for (let i = cMonth; i > 0; i--) {
					monthArr.push(year + '-' + (i > 9 ? i : '0' + i))
				}
				for (let i = 12; i > 12 - lastM; i--) {
					monthArr.push(lastY + '-' + (i > 9 ? i : '0' + i))
				}
			}
			return monthArr.reverse()
		},
		async searchMonth (month) {
      this.yearTitle = month
      const req = {
				month: month,
				userCode: store.userInfo.userCode
			}
      const res = await actions.getTeacherStatic(req)
      if( res.data ) {
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
    async detail(item, tag = false){
      this.num = item.num
      if ( item.num !== '0次' && item.num !== '0天' ) {
        if (tag) {
          this.pageList.page += 1
        } else {
          this.pageList.page = 1
        }
        const req = {
          month: this.yearTitle,
          userCode: store.userInfo.userCode,
          state: item.state,
          pageNum: this.pageList.page,
				  pageSize: this.pageList.size,
        }
        const res = await actions.teacherStaticDetail(req)
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
		},
  }
}
</script>

<style lang="less" scoped>
.statistics {
	.year-list {
	    background-color:#0079ff;
	    .title {
	      color:#fff;
	      font-size: 34rpx;
	      font-weight: bold;
	      text-align: center;
	      padding: 30rpx 0 0rpx 0;
	    }
	    .last-month {
	      padding: 20rpx 0 40rpx 0;
	      & > view {
	        color:#fff;
	        text-align: center;
	        height: 80rpx;
	        width: 80rpx;
	        line-height: 80rpx;
	        border-radius: 100%;
	      }
	      .act {
	        background-color:#fff;
	        color: #0079ff;
	        font-weight: bold
	      }
	    }
	  }
  .record-box {
    padding-top:20rpx;
    background-color:#f2f8fe;
    .attandence-title {
      height: 60rpx;
      line-height: 60rpx;
      font-size: 36rpx;
    }
    .attandence-box {
      height: 450rpx;
      :nth-child(3n) {
        border-right: none;
      }
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
          height: 60rpx;
          margin-bottom: 10rpx;
        }
         .attandence-num {
          color: #ccc;
          font-size: 28rpx;
        }
      }
    }
  };
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
}

</style>