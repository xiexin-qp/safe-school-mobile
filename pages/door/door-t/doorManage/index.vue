<template>
  <view class="qui-page">
    <view class="head">我创建的通行权限组</view>
    <scroll-view @refresherpulling="haha" scroll-y="true" class="scroll-h">
      <view class="content">
        <view class="record-box">
          <view class="leave-box" v-for="list in dataList" :key="list.id">
            <view class="work-box qui-fx-jsb">
              <view>
                <view class="work-til">{{ list.ruleGroupName }}</view>
                <view class="div-btn" @click="goDetail(list.ruleGroupCode)">...</view>
                <view class="work-title normal-time" style>2020年3月21日 12:00</view>
                <view class="work-title normal-equ" style>校大门设备组</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import eventBus from '@u/eventBus.js';
import { store, actions } from '../store/index.js';
export default {
	name: 'index',
	components: {},
	data() {
		return {
			pageList: {
				pageNum: 1,
				pageSize: 20
			},
			dataList:[],
			datauserList:[],
			userGroupCode :''
		};
	},
	computed: {},
	mounted() {
		this.showList();
	},
	methods: {
		async showList() {
			 const res = await actions.getgroupList({
			      	schoolCode: 'QPZX',
			      	ruleGroupType:1,
			      	...this.pageList
			      })
			this.dataList = res.data.list;
		},
		async	goDetail(id) {
			 const res = await actions.getgroupuserList({
			      	schoolCode: 'QPZX',
					  userGroupCode :this.userGroupCode,
					  ruleGroupCode : id,
			      	...this.pageList
			      })
			this.datauserList = res.data.list;
			this.$tools.navTo({
				url: './detail?id=' + id,
				title: '查看人员列表'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.scroll-h {
  height: calc(100vh - 100rpx);
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
.head {
  font-size: 18px;
  text-align: center;
  height: 100rpx;
  padding-top: 30rpx;
}
</style>
