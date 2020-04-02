<template>
	<scroll-view @refresherpulling="haha" scroll-y="true" @scrolltolower="showList(true)" class="scroll-h">
		<view class="content">
			<view class="record-box">
				<no-data msg="暂无考勤记录~" v-if="infoList.length === 0"></no-data>
				<view class="title_">我创建的通行权限组</view>
				<view class="leave-box" v-for="item in infoList" :key="item.id">
			 <view class="work-box qui-fx-jsb">
				 <view>
					 <view class="work-til">{{item.remark}}</view>
					 <view class="div-btn" @click="goDetail()">...</view>
					 <view class="work-title normal-time" style="">{{item.outTime}}</view>
					 <view class="work-title normal-equ" style="">{{item.position}}</view>
				 </view>
			 </view>
				</view>
			</view>
		</view>
	 </scroll-view>
</template>
<script>
import eventBus from '@u/eventBus.js'
import { store, actions } from '../store/index.js'
export default {
  name: 'Home',
  components: {},
  onLoad(options) {
    console.log(options);
  },
  onPullDownRefresh() {
    this.showList();
  },
  data() {
    return {
      infoList:[{
        id: 1,
        outTime: '2020年3月21日 12:00',
        remark: '小学部教师组',
        position: '校大门设备组'
      },
      {
        id: 2,
    outTime: '2020年3月21日 12:00',
    remark: '小学部教师组',
    position: '校大门设备组'
      },
      {
        id: 3,
    outTime: '2020年3月21日 12:00',
    remark: '小学部教师组',
    position: '校大门设备组'
      },
      {
        id: 4,
    outTime: '2020年3月21日 12:00',
    remark: '小学部教师组',
    position: '校大门设备组'
      },
      {
        id: 5,
     outTime: '2020年3月21日 12:00',
     remark: '小学部教师组',
     position: '校大门设备组'
      }],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    goDetail() {
     	this.$tools.navTo({
        url: './detail',
		title: '查看列表'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-h {
	height: 100vh;
}
.work-title {
  margin-top: 30rpx;
}
.work-til {
  display: inline-block;
}
.div-btn {
  display: inline-block;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 10.6rem;
}
.normal-time {
  color: #555555;
}
.normal-equ {
  font-size: 13px;
  color: #c8c7cc;
}
.work-box {
  background-color: #fff;
  border-radius: 8rpx;
  margin: 20rpx;
  padding: 50rpx;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid #cfd0d1;
  .work-line {
    border-left: 2rpx 7b92f5 dashed;
  }
}
.title_ {
  margin: 1.5rem;
  font-size: 18px;
  text-align: center;
}
</style>
