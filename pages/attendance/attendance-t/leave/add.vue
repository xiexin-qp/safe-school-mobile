<template>
  <view class="add">
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>请假类型：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="selector" :value="currentRole" :range="role" @change="chooseRole">
            {{role[currentRole]}}
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>开始时间：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="date" @change="bindTimeChange">
            <view class="uni-input">{{date}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="date" @change="bindTimeChange">
            <view class="uni-input">{{date}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>请假时长：</view>
        <view class="qui-fx-f1"><input class="item-input" v-model="duration" style="text-align: right;" placeholder="请输入姓名" /></view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1"><textarea class="item-input" style="text-align: right;" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <radio-group @change="radioChange">
            <label><radio value="1" />是</label>
            <label class="radio"><radio value="2" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-bd-b item-list">
			  <view>上传附图：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="imgList" style="margin: 20rpx"></an-upload-img>
			  </view>
			</view>
    </scroll-view>
    <view class="submit-box">
      <view class="btn">提交</view>
    </view>
  </view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
import { actions } from '../store'
	export default {
    components: {
			anUploadImg
		},
		data() {
			return {
        date: '2020-03-17',
        role: ['事假', '病假', '产假'],
        currentRole: 1,
        imgList:[],
        duration: 0
			}
    },
    mounted () {
      this.leaveReasonGet()
    },
    methods: {
      async leaveReasonGet () {
        const res = await actions.getLeaveReason()
        this.role = res.data
      },
      radioChange (e) {
        console.log('e',e.target.value)
      },
      bindTimeChange (e) {
        this.date = e.target.value
      },
      chooseRole (e) {
        this.currentRole = e.target.value
      }
    }
	}
</script>

<style lang="scss">
.add {
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .item-list {
    padding: 25rpx 15rpx;
    background-color: #fff;
    .item-input {
      width: 100%;
      font-size: 26rpx;
      color: #999;
    }
    .radio {
      padding-left: 25rpx
    }
  }
  .submit-box {
    height: 100rpx;
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      letter-spacing: 8rpx;
      margin: 0 20rpx;
      background-color: $main-color;
      color:#fff;
      border-radius: $radius;
    }
  }
}
</style>
