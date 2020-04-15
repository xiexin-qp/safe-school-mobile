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
          <picker mode="date" :value="startDate" @change="bindStartDate">
            <view class="uni-input">{{startDate}}</view>
          </picker>
        </view>
        <view class="qui-fx-je" style="margin-left:10rpx">
          <picker mode="time" :value="startTime" @change="bindStartTime">
            <view class="uni-input"> {{startTime}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="endDate" @change="bindEndDate">
            <view class="uni-input">{{endDate}}</view>
          </picker>
        </view>
        <view class="qui-fx-je" style="margin-left:10rpx">
          <picker mode="time" :value="endTime" @change="bindEndTime">
            <view class="uni-input"> {{endTime}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>请假时长：</view>
        <view class="qui-fx-f1"><input class="item-input" v-model="duration" style="text-align: right;" placeholder="请输入请假时长" /></view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1"><textarea v-model="remark" class="item-input" style="text-align: right;" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <radio-group @change="radioChange">
            <label><radio value="Y" />是</label>
            <label class="radio"><radio value="N" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>审批人：</view>
			  <view class="qui-fx-f1">
					
			  </view>
        <view @click="check" >></view>
			</view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
			  <view class="qui-fx-f1">
					
			  </view>
        <view @click="check">></view>
			</view>
      <view class="qui-bd-b item-list">
			  <view>上传附图：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="imgList" style="margin: 20rpx"></an-upload-img>
			  </view>
			</view>
    </scroll-view>
    <view class="submit-box">
      <view class="btn" @click="submit">提交</view>
    </view>
    <uni-popup ref="popup" type="center">
      <scroll-view scroll-y="true" class="scroll">
        <view v-for="list in dataList" :key="list" class="list qui-bd-b">
          <text>{{ list }}</text>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
  import { actions, store } from '../store'
	export default {
    components: {
			anUploadImg
		},
		data() {
			return {
        startDate: '2020-03-17',
        endDate: '2020-03-17',
        startTime: '10:10',
        endTime: '10:10',
        role: [],
        currentRole: 1,
        imgList:[],
        duration: 0,
        reasonId: '',
        reason: '',
        reasonList: [],
        outSchool: '',
        remark: '',
        nbsp: '',
        dataList: []
			}
    },
    mounted () {
      this.leaveReasonGet()
      this.orgUserGet()
    },
    methods: {

      // {
      //   duration (number, optional): 时长 ,  =====================
      //   endTime (string, optional): 结束时间 ,=====================
      //   orgId (integer, optional): 机构id ,=====================
      //   orgName (string, optional): 更新时间 ,=====================
      //   outSchool (string, optional): 是否出校(Y/N) , =============
      //   photoList (Array[string], optional): 请假图片地址集合 ,=============
      //   reason (string, optional): 事由 , ==========================
      //   reasonId (string, optional): 事由_id , =====================
      //   remark (string, optional): 备注 , ====================
      //   schoolCode (string, optional): 学校编码 ,=====================
      //   startTime (string, optional): 开始时间 ,=====================
      //   userCode (string, optional): 教职工编码 ,=====================
      //   userName (string, optional): 教职工姓名=====================
      //   }
      //   新增审批人实体 { leaveApprovalAddDto
      //   photoUrl (string, optional): 审批人照片 ,
      //   userCode (string, optional): 审批人code ,
      //   userName (string, optional): 审批人姓名
      //   }
      //   新增抄送人实体 { leaveCopyList []
      //   photoUrl (string, optional): 抄送人头像 ,
      //   readTime (string, optional): 已读时间 ,
      //   state (string, optional): 0 未读, 1 已读 ,
      //   userCode (string, optional): 抄送人code ,
      //   userName (string, optional): 抄送人姓名
      // }
      async leaveReasonGet () {
        const res = await actions.getLeaveReason()
        this.reasonList = res.data
        this.role = []
        res.data.forEach(el => {
          this.role.push(el.name)
        })
      },
      radioChange (e) {
        this.outSchool = e.target.value
        console.log('imgList',this.imgList)
      },
      bindStartDate (e) {
        this.startDate = e.target.value
      },
      bindStartTime (e) {
        this.startTime = e.target.value
      },
      bindEndDate (e) {
        this.endDate = e.target.value
      },
      bindEndTime (e) {
        this.endTime = e.target.value
      },
      chooseRole (e) {
        this.currentRole = e.target.value
        this.reasonId = this.reasonList[e.target.value].id
        this.reason = this.reasonList[e.target.value].name
      },
      async orgUserGet (){
        const req = {
          keyword: '',
          orgCode: '',
          page: 1,
          schoolCode: store.schoolCode,
          size: 100000
        }
        const res = await actions.getOrgUser(req)
        this.dataList = res.data.list
      },
       check () {
        
        this.$refs.popup.open()
      },
      submit () {

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
.scroll {
    height: 70vh;
    .list {
      padding: 15rpx 25rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
</style>
