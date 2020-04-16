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
			  <view class="qui-fx-f1  qui-fx-je">
          {{approlUser}}
			  </view>
        <view @click="check(1)" >></view>
			</view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
			  <view class="qui-fx-f1  qui-fx-je">
					{{copyUser}}
			  </view>
        <view @click="check(2)">></view>
			</view>
      <view class="qui-bd-b item-list">
			  <view>上传附图：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="photoList" style="margin: 20rpx"></an-upload-img>
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
        startDate: '2020-04-17',
        endDate: '2020-04-17',
        startTime: '10:10',
        endTime: '11:10',
        role: [],
        currentRole: 1,
        photoList:[],
        duration: 0,
        reasonId: '',
        reason: '',
        reasonList: [],
        outSchool: '',
        remark: '',
        nbsp: '',
        dataList: [],
        leaveApprovalAddDto : {},
        leaveCopyList: [],
        approlUser: '',
        copyUser: ''
			}
    },
    mounted () {
      this.leaveReasonGet()
      this.orgUserGet()
    },
    methods: {
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
          schoolCode: store.schoolCode1,
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
          this.approlUser =  this.leaveApprovalAddDto.userName
        } else {
          this.$refs.checkPopup.close()
          this.copyUser = this.leaveCopyList.map(el=>{
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
        const req = {
          duration: this.duration,
          startTime: new Date(this.startDate + ' ' + this.startTime).getTime(),
          endTime: new Date(this.endDate + ' ' + this.endTime).getTime(),
          outSchool: this.outSchool,
          leaveCopyList: this.leaveCopyList,
          leaveApprovalAddDto: this.leaveApprovalAddDto,
          photoList: this.photoList,
          reason: this.reason,
          reasonId: this.reasonId,
          remark: this.remark,
          userName: store.userName,
          userCode: store.userCode,
          schoolCode: store.schoolCode,
          orgId: store.orgId,
          orgName: store.orgName
        }
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
