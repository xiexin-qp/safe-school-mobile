<template>
  <view class="add">
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>学生姓名：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="selector" :value="currentChild" :range="child" @change="chooseChild">
            {{child[currentChild]}}
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>请假类型：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="selector" :value="currentRole" :range="role" @change="chooseRole">
            {{role[currentRole]}}
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>开始时间：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="leaveInfo.startDate" @change="dateChange($event, 1)">
            <view class="uni-input">{{leaveInfo.startDate | form}}</view>
          </picker>
        </view>
        <view class="qui-fx-je" style="margin-left:10rpx">
          <picker mode="time" :value="leaveInfo.startTime" @change="dateChange($event, 2)">
            <view class="uni-input"> {{leaveInfo.startTime}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="leaveInfo.endDate" @change="dateChange($event, 3)">
            <view class="uni-input">{{leaveInfo.endDate}}</view>
          </picker>
        </view>
        <view class="qui-fx-je" style="margin-left:10rpx">
          <picker mode="time" :value="leaveInfo.endTime" @change="dateChange($event, 4)">
            <view class="uni-input"> {{leaveInfo.endTime}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>请假时长：</view>
        <view class="qui-fx-f1 qui-fx-je">{{ leaveInfo.duration }}小时</view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1"><textarea v-model="leaveInfo.remark" class="item-input" style="text-align: right;" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <radio-group @change="radioChange">
            <label><radio value="Y" :checked="leaveInfo.outSchool === 'Y'" />是</label>
            <label class="radio"><radio :checked="leaveInfo.outSchool === 'N'" value="N" />否</label>
          </radio-group>
        </view>
      </view>
      <!-- <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
			  <view>审批人：</view>
			  <view class="qui-fx-f1  qui-fx-je">
          {{teacherName}}
			  </view>
        <view ></view>
			</view> -->
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
			  <view class="qui-fx-f1  qui-fx-je">
					{{leaveInfo.copyUser}}
			  </view>
        <view @click="check">></view>
			</view>
      <view class="qui-bd-b item-list">
			  <view>上传附图：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="leaveInfo.photoList" style="margin: 20rpx"></an-upload-img>
			  </view>
			</view>
    </scroll-view>
    <view class="submit-box">
      <view class="btn" @click="submit">提交</view>
    </view>
    <uni-popup ref="checkPopup" type="center">
      <scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore">
        <view>
          <checkbox-group @change="checkUser">
            <label  class="list qui-bd-b qui-fx-jsb" v-for="(item,index) in dataList" :key="index">
                <label :for="item.userName">
                  <text>{{item.userName}}</text>
                </label>
                <checkbox :value='`${item.userCode}^${item.userName}=${item.photoUrl}`'></checkbox>
            </label>
          </checkbox-group>
          <view class="submit-btn qui-fx">
             <button class="btn" @click="cancel">取消</button>
             <button class="btn" @click="ok">确定</button>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
  import { actions, store } from '../store/index'
	export default {
    components: {
			anUploadImg
		},
		data() {
			return {
        role: [],
        child: [],
        reasonList: [],
        dataList: [],
        leaveCopyList: [],
        currentRole: 0,
        currentChild: 0,
        leaveInfo: {
          startDate: this.$tools.getDateTime(new Date(), 'date'),
          startTime: this.$tools.getDateTime(new Date(), 'time'),
          endDate: this.$tools.getDateTime(new Date(), 'date'),
          endTime: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'time'),
          duration: '2',
          outSchool: '',
          remark: '',
          copyUser: '',
          photoList:[],
          reasonId: '',
          reason: ''
        },
        oddNumbers: '',
        // teacherName: '',
        pageList: {
          page: 1,
          size: 11
        },
        morePage: false
			}
    },
    onLoad(options) {
      if (options.oddNumbers) {
        this.oddNumbers = options.oddNumbers
        this.detailGet(options.oddNumbers)
      } else {
        this.leaveReasonGet(0)
        this.childGet(0)
      }
	  },
    mounted () {
      // this.teacherName = store.userInfo.teacherName
      this.orgUserGet()
    },
    methods: {
      async detailGet (id) {
        const res = await actions.studentLeaveDetail(id)
        this.leaveInfo = res.data
        this.leaveInfo.startDate = this.$tools.getDateTime(new Date(this.leaveInfo.startTime), 'date')
        this.leaveInfo.startTime = this.$tools.getDateTime(new Date(this.leaveInfo.startTime), 'time')
        this.leaveInfo.endDate = this.$tools.getDateTime(new Date(this.leaveInfo.endTime), 'date')
        this.leaveInfo.endTime = this.$tools.getDateTime(new Date(this.leaveInfo.endTime), 'time')
        this.leaveInfo.copyUser = this.leaveInfo.leaveCopyList.map(el=>el.userName).join(',')
        // this.teacherName = this.leaveInfo.leaveApprovalAddDto.userName
        this.leaveCopyList = this.leaveInfo.leaveCopyList
        this.leaveReasonGet(1)
        this.childGet(1)
      },
      async leaveReasonGet (type) {
        const res = await actions.getLeaveReason()
        this.reasonList = res.data
        this.role = []
        res.data.forEach(el => {
          this.role.push(el.name)
        })
        if (type) {
          this.currentRole = this.role.indexOf(this.leaveInfo.reason)
        } else {
          this.leaveInfo.reasonId = this.reasonList[0].id
          this.leaveInfo.reason = this.reasonList[0].name
        }
      },
      async childGet (type) {
        this.child = []
        store.childList.forEach(el => {
          this.child.push(el.userName)
        })
        if (type) {
          this.currentChild = this.child.indexOf(this.leaveInfo.userName)
        } else {
          this.leaveInfo.studentCode = store.childList[0].userCode
          this.leaveInfo.studentName = store.childList[0].userName
        }
      },
      radioChange (e) {
        this.leaveInfo.outSchool = e.target.value
      },
      dateChange (e, type) {
        if (type === 1) {
          this.leaveInfo.startDate = e.target.value;
        } else if (type === 2) {
          this.leaveInfo.startTime = e.target.value;
        } else if (type === 3) {
          this.leaveInfo.endDate = e.target.value;
        } else if (type === 4) {
          this.leaveInfo.endTime = e.target.value;
        }
        this.leaveInfo.duration = parseInt(Math.ceil(new Date(new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime()).getTime() 
                        - new Date(new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime()).getTime()) / 1000 / 60 / 60)
      },
      chooseRole (e) {
        this.currentRole = e.target.value
        this.leaveInfo.reasonId = this.reasonList[e.target.value].id
        this.leaveInfo.reason = this.reasonList[e.target.value].name
      },
      chooseChild (e) {
        this.currentChild = e.target.value
        this.leaveInfo.studentCode = store.childList[e.target.value].userCode
        this.leaveInfo.studentName = store.childList[e.target.value].userName
      },
      async orgUserGet ( tag = false ){
        if (tag) {
          this.pageList.page += 1;
        } else {
          this.pageList.page = 1;
        }
        const req = {
          keyword: '',
          orgCode: '',
          schoolCode: store.userInfo.schoolCode,
          page: this.pageList.page,
				  size: this.pageList.size
        }
        const res = await actions.getOrgUser(req)
        if (tag) {
          this.dataList = this.dataList.concat(res.data.list)
        } else {
          this.dataList = res.data.list
        }
			  this.morePage = res.data.hasNextPage
      },
      loadMore() {
        if (!this.morePage) {
          this.$tools.toast('数据已加载完毕')
          return
        }
        this.orgUserGet(true)
      },
      check () {
        this.$refs.checkPopup.open()
      },
      cancel () {
        this.$refs.checkPopup.close()
      },
      ok () {
        this.$refs.checkPopup.close()
        this.leaveInfo.copyUser = this.leaveCopyList.map(el=>{
          return  el.userName
        }).join(',')
      },
      checkUser (e){
        this.checkList = e
        const data = e.target.value
        this.leaveCopyList = []
        data.map(el=>{
          this.leaveCopyList.push({
            userCode: el.split('^')[0],
            userName: el.split('^')[1].split('=')[0],
            photoUrl : el.split('^')[1].split('=')[1]
          })
        })
      },
      submit () {
        if (this.leaveInfo.outSchool === '') {
          this.$tools.toast('请选择是否出校')
          return false
        } else if (new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime() <= new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime()) {
          this.$tools.toast('请选择正确时间段')
          return false
        }
        const req = {
          applicantCode: store.userInfo.userCode,
          applicantName: store.userInfo.userName,
          duration: this.leaveInfo.duration,
          startTime: new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime(),
          endTime: new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime(),
          outSchool: this.leaveInfo.outSchool,
          leaveCopyList: this.leaveCopyList,
          leaveApprovalAddDto:{ },
          photoList: this.leaveInfo.photoList,
          reason: this.leaveInfo.reason,
          reasonId: this.leaveInfo.reasonId,
          remark: this.leaveInfo.remark,
          userName: this.leaveInfo.studentName,
          userCode: this.leaveInfo.studentCode,
          schoolCode: store.userInfo.schoolCode
        }
        if (this.oddNumbers) {
          actions.updateStudentLeave({
             ...this.leaveInfo,
            ...req
          }).then(res => {
            this.$tools.toast('操作成功')
            this.$tools.navTo({
              url: './index',
              title: ''
            })
          })
        } else {
          actions.addStudentLeave(req).then(res => {  
            this.$tools.toast('操作成功')
            this.$tools.navTo({
              url: './index',
              title: ''
            })
          })
        }
      }
    }
	}
</script>

<style lang="scss">
.add {
  position: relative;
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .must {
    color: red;
    margin-right: 5rpx;
  }
  .item-list {
    padding: 25rpx 15rpx;
    background-color: $uni-bg-color;
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
      color:$uni-bg-color;
      border-radius: $radius;
    }
  }
  .scroll {
    height: 70vh;
    padding-bottom: 10vh;
    .list {
      padding: 15rpx 25rpx;
      
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    .submit-btn {
       height: 80rpx;
       position: fixed;
       bottom: 15vh;
       left: 27%;
        .btn {
          height: 50rpx;
          line-height: 50rpx;
          text-align: center;
          letter-spacing: 8rpx;
          margin: 0 20rpx;
          background-color: $main-color;
          color:$uni-bg-color;
          border-radius: $radius;
          font-size: 28rpx;
        }
    }
  }
}
/deep/ .uni-popup__wrapper-box {
  width: 70%;
}
</style>
