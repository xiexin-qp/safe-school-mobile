<template>
  <view class="add">
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
			  <view>请假学生：</view>
        <view @click="check(1)" class="qui-fx-f1 qui-fx rit-icon">
          <view class="qui-fx-f1" style="text-align:right" >
            {{leaveInfo.userName}}
          </view>
          <view class="rit-icon"></view>
        </view>
			</view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>请假类型：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="selector" :value="currentRole" :range="role" @change="chooseRole">
            {{role[currentRole]}}
          </picker>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>开始时间：</view>
        <view class="qui-fx-f1 qui-fx-je"  @click="startShow = true">
          <u-picker mode="time" v-model="startShow" :params="params" @confirm="startConfirm"></u-picker>
          <view class="uni-input">{{leaveInfo.startDate}}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je"  @click="endShow = true">
          <u-picker mode="time" v-model="endShow" :params="params" @confirm="endConfirm"></u-picker>
          <view class="uni-input">{{leaveInfo.endDate}}</view>
          <view class="rit-icon"></view>
        </view>
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
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
        <view @click="check(0)" class="qui-fx-f1 qui-fx rit-icon">
          <view class="qui-fx-f1" style="text-align:right" >
            {{copyUser}}
          </view>
          <view class="rit-icon"></view>
        </view>
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
    <uni-popup ref="popup" type="center" :maskClick="false">
      <scroll-view scroll-y="true" class="scroll"  @scrolltolower="loadMore(1)">
        <view>
          <radio-group @change="radioUser">
            <label class="list qui-bd-b qui-fx-jsb" v-for="(item,index) in studentList" :key="index">
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
    <uni-popup ref="checkPopup" type="center" :maskClick="false">
      <scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore(0)">
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
             <button class="btn" @click="cancel(0)">取消</button>
             <button class="btn" @click="ok(0)">确定</button>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
  import eventBus from '@u/eventBus'
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
        copyUser: '',
        studentList: [],
        currentRole: 0,
        leaveInfo: {
          startDate: this.$tools.getDateTime(new Date(), 'noSecond'),
          endDate: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'noSecond'),
          duration: '2',
          outSchool: '',
          remark: '',
          photoList:[],
          reasonId: '',
          reason: '',
          userCode: '',
          userName: '',
          leaveCopyList: []
        },
        oddNumbers: '',
        pageList: {
          page: 1,
          size: 11
        },
        orgPageList: {
          page: 1,
          size: 11
        },
        morePage: false,
        OrgMorePage: false,
        startShow: false,
        endShow: false,
        params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				}
			}
    },
    onLoad(options) {
      if (options.oddNumbers) {
        this.oddNumbers = options.oddNumbers
        this.detailGet(options.oddNumbers)
      } else {
        this.leaveReasonGet(0)
      }
	  },
    mounted () {
      this.studentGet()
      this.orgUserGet()
    },
    methods: {
      async detailGet (id) {
        const res = await actions.studentLeaveDetail(id)
        this.leaveInfo = res.data
        this.leaveInfo.startDate = this.$tools.getDateTime(new Date(this.leaveInfo.startTime), 'noSecond')
        this.leaveInfo.endDate = this.$tools.getDateTime(new Date(this.leaveInfo.endTime), 'noSecond')
        this.copyUser =  this.leaveInfo.leaveCopyList.map(el=>el.userName).join(',')
        this.leaveReasonGet(1)
      },
      async studentGet (tag = false) {
        if (tag) {
          this.pageList.page += 1
        } else {
          this.pageList.page = 1
        }
        const req = {
          page: this.pageList.page,
          size: this.pageList.size,
          schoolCode: store.userInfo.schoolCode,
          headerTeacherId: store.userInfo.userCode
        }
        const res = await actions.getClassStudent(req)
        if (tag) {
          this.studentList = this.studentList.concat(res.data.list)
        } else {
          this.studentList = res.data.list
        }
			  this.morePage = res.data.hasNextPage
      },
      loadMore (type) {
        if (type) {
          if (!this.morePage) {
            this.$tools.toast('数据已加载完毕')
            return
          }
            this.studentGet(true)
        } else {
          if (!this.OrgMorePage) {
            this.$tools.toast('数据已加载完毕')
            return
          }
            this.orgUserGet(true)
        }
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
      radioChange (e) {
        this.leaveInfo.outSchool = e.target.value
      },
      chooseRole (e) {
        this.currentRole = e.target.value
        this.leaveInfo.reasonId = this.reasonList[e.target.value].id
        this.leaveInfo.reason = this.reasonList[e.target.value].name
      },
      async orgUserGet ( tag = false){
        if (tag) {
          this.orgPageList.page += 1
        } else {
          this.orgPageList.page = 1
        }
        const req = {
          keyword: '',
          orgCode: '',
          page: this.orgPageList.page,
          size: this.orgPageList.size,
          schoolCode: store.userInfo.schoolCode
        }
        const res = await actions.getOrgUser(req)
        if (tag) {
          this.dataList = this.dataList.concat(res.data.list)
        } else {
          this.dataList = res.data.list
        }
			  this.OrgMorePage = res.data.hasNextPage
      },
      check (type) {
        if (type) {
          this.leaveInfo.userName = ''
          this.$refs.popup.open()
        } else {
          this.copyUser = ''
          this.leaveInfo.leaveCopyList = []
          this.$refs.checkPopup.open()
        }
      },
      cancel (type) {
        if (type) {
          this.leaveInfo.userName = ''
          this.$refs.popup.close()
        } else {
          this.copyUser = ''
          this.leaveInfo.leaveCopyList = []
          this.$refs.checkPopup.close()
        }
      },
      ok (type) {
        if (type) {
          this.$refs.popup.close()
        } else {
          this.$refs.checkPopup.close()
          this.copyUser = this.leaveInfo.leaveCopyList.map(el=>{
            return  el.userName
          }).join(',')
        }
      },
      checkUser (e){
        this.checkList = e
        const data = e.target.value
        this.leaveInfo.leaveCopyList = []
        data.map(el=>{
          this.leaveInfo.leaveCopyList.push({
            userCode: el.split('^')[0],
            userName: el.split('^')[1].split('=')[0],
            photoUrl : el.split('^')[1].split('=')[1]
          })
        })
      },
      radioUser (e) {
        const data = e.target.value
        this.leaveInfo.userName = data.split('^')[1].split('=')[0]
        this.leaveInfo.userCode = data.split('^')[0]
      },
      startConfirm (params) {
        this.leaveInfo.startDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`
        this.leaveInfo.duration = parseInt(Math.ceil(new Date(new Date(this.leaveInfo.endDate).getTime()).getTime() 
                        - new Date(new Date(this.leaveInfo.startDate).getTime()).getTime()) / 1000 / 60 / 60)
      },
      endConfirm (params) {
        this.leaveInfo.endDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`
        this.leaveInfo.duration = parseInt(Math.ceil(new Date(new Date(this.leaveInfo.endDate).getTime()).getTime() 
                        - new Date(new Date(this.leaveInfo.startDate).getTime()).getTime()) / 1000 / 60 / 60)

      },
      async submit () {
        if (this.leaveInfo.userName === '') {
          this.$tools.toast('请选择学生')
          return false
        } else if (this.leaveInfo.outSchool === '') {
          this.$tools.toast('请选择是否出校')
          return false
        } else if (new Date(this.leaveInfo.endDate + ' ' + this.leaveInfo.endTime).getTime() <= new Date(this.leaveInfo.startDate + ' ' + this.leaveInfo.startTime).getTime()) {
          this.$tools.toast('请选择正确时间段')
          return false
        }
        const photoList = this.leaveInfo.photoList.map(el => {
          return el.split(',')[1]
        })
        const req = {
          photoList: photoList,
          schoolCode: store.userInfo.schoolCode,
          applicantCode: store.userInfo.userCode,
          applicantName: store.userInfo.userName,
          startTime: new Date(this.leaveInfo.startDate).getTime(),
          endTime: new Date(this.leaveInfo.endDate).getTime(),
          leaveApprovalAddDto:{},
        }
        if (this.oddNumbers) {
          await actions.updateStudentLeave({
             ...this.leaveInfo,
            ...req
          })
            this.$tools.toast('操作成功')
            this.$tools.goNext(() => {
              eventBus.$emit('getList')
              this.$tools.goBack()
            })
        } else {
          await actions.addStudentLeave({
             ...this.leaveInfo,
            ...req
          })  
            this.$tools.toast('操作成功')
            this.$tools.goNext(() => {
              eventBus.$emit('getList')
              this.$tools.goBack()
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
