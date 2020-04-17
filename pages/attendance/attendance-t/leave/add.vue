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
        <view>请假时长：</view>
        <view class="qui-fx-f1 qui-fx-je">{{ leaveInfo.duration }}小时</view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1"><textarea v-model="leaveInfo.remark" class="item-input" style="text-align: right;" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <radio-group @change="radioChange">
            <label><radio value="Y" :checked="leaveInfo.outSchool === 'Y'" />是</label>
            <label class="radio"><radio :checked="leaveInfo.outSchool === 'N'" value="N" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>审批人：</view>
			  <view class="qui-fx-f1  qui-fx-je">
          {{leaveInfo.approlUser}}
			  </view>
        <view @click="check(1)" >></view>
			</view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
			  <view class="qui-fx-f1  qui-fx-je">
					{{leaveInfo.copyUser}}
			  </view>
        <view @click="check(2)">></view>
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
    <uni-popup ref="popup" type="center">
      <scroll-view scroll-y="true" class="scroll">
        <view>
          <radio-group @change="radioUser">
            <label class="list qui-bd-b qui-fx-jsb" v-for="(item,index) in dataList" :key="index">
              <label :for="item.userName">
                  <text>{{item.userName}}</text>
              </label>
              <radio :id="item.userCode" :value='`${item.userCode}^${item.userName}=${item.photoUrl}`' :checked="item.checked"></radio>
            </label>
          </radio-group>
          <view class="submit-btn qui-fx">
             <button class="btn" @click="cancel(1)">取消</button>
             <button class="btn" @click="ok(1)">确定</button>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
    <uni-popup ref="checkPopup" type="center">
      <scroll-view scroll-y="true" class="scroll">
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
             <button class="btn" @click="cancel(2)">取消</button>
             <button class="btn" @click="ok(2)">确定</button>
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
        reasonList: [],
        dataList: [],
        leaveApprovalAddDto : {},
        leaveCopyList: [],
        currentRole: 0,
        leaveInfo: {
          startDate: this.$tools.getDateTime(new Date(), 'date'),
          startTime: this.$tools.getDateTime(new Date(), 'time'),
          endDate: this.$tools.getDateTime(new Date(), 'date'),
          endTime: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'time'),
          duration: '2',
          outSchool: '',
          remark: '',
          approlUser: '',
          copyUser: '',
          photoList:[],
          reasonId: '',
          reason: '',
        },
        oddNumbers: ''
			}
    },
    onLoad(options) {
      if (options.oddNumbers) {
        this.oddNumbers = options.oddNumbers
        this.detailGet(options.oddNumbers)
      }
	  },
    mounted () {
      // this.leaveReasonGet()
      this.orgUserGet()
    },
    methods: {
      async detailGet (id) {
        const res = await actions.getLeaveDetail(id)
        this.leaveInfo = res.data
        this.leaveInfo.startDate = this.$tools.getDateTime(new Date(this.leaveInfo.startTime), 'date')
        this.leaveInfo.startTime = this.$tools.getDateTime(new Date(this.leaveInfo.startTime), 'time')
        this.leaveInfo.endDate = this.$tools.getDateTime(new Date(this.leaveInfo.endTime), 'date')
        this.leaveInfo.endTime = this.$tools.getDateTime(new Date(this.leaveInfo.endTime), 'time')
        this.leaveInfo.approlUser = this.leaveInfo.leaveApprovalAddDto.userName
        this.leaveInfo.copyUser = this.leaveInfo.leaveCopyList.map(el=>el.userName).join(',')
        this.leaveApprovalAddDto = this.leaveInfo.leaveApprovalAddDto
        this.leaveCopyList = this.leaveInfo.leaveCopyList
        this.leaveReasonGet()
      },
      async leaveReasonGet () {
        const res = await actions.getLeaveReason()
        this.reasonList = res.data
        this.role = []
        res.data.forEach(el => {
          this.role.push(el.name)
        })
        this.currentRole = this.role.indexOf(this.leaveInfo.reason)
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
      async orgUserGet (){
        const req = {
          keyword: '',
          orgCode: '',
          page: 1,
          schoolCode: store.userInfo.schoolCode1,
          size: 100000
        }
        const res = await actions.getOrgUser(req)
        this.dataList = res.data.list
      },
      check (type) {
        if (type === 1) {
          this.$refs.popup.open()
        } else {
          this.$refs.checkPopup.open()
        }
      },
      cancel (type) {
         if (type === 1) {
          this.$refs.popup.close()
        } else {
          this.$refs.checkPopup.close()
        }
      },
      ok (type) {
         if (type === 1) {
          this.$refs.popup.close()
          this.leaveInfo.approlUser =  this.leaveApprovalAddDto.userName
        } else {
          this.$refs.checkPopup.close()
          this.leaveInfo.copyUser = this.leaveCopyList.map(el=>{
            return  el.userName
          }).join(',')
        }
      },
      radioUser (e) {
        const data = e.target.value
        this.leaveApprovalAddDto = {
          userCode: data.split('^')[0],
          userName: data.split('^')[1].split('=')[0],
          photoUrl : data.split('^')[1].split('=')[1]
        }
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
        if (this.outSchool === '') {
          this.$tools.toast('请选择是否出校')
          return false
        } else if (new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime() <= new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime()) {
          this.$tools.toast('请选择正确时间段')
          return false
        } else if (this.approlUser === '') {
          this.$tools.toast('请选择审批人')
          return false
        }
        const req = {
          duration: this.leaveInfo.duration,
          startTime: new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime(),
          endTime: new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime(),
          outSchool: this.leaveInfo.outSchool,
          leaveCopyList: this.leaveCopyList,
          leaveApprovalAddDto: this.leaveApprovalAddDto,
          photoList: this.leaveInfo.photoList,
          reason: this.leaveInfo.reason,
          reasonId: this.leaveInfo.reasonId,
          remark: this.leaveInfo.remark,
          userName: store.userInfo.userName,
          userCode: store.userInfo.userCode,
          schoolCode: store.userInfo.schoolCode,
          orgId: store.userInfo.orgId,
          orgName: store.userInfo.orgName
        }
        if (this.oddNumbers) {
          actions.updateTeacherLeave({
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
          actions.addTeacherLeave(req).then(res => {  
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
          color:#fff;
          border-radius: $radius;
          font-size: 28rpx;
        }
    }
  }
}
</style>
