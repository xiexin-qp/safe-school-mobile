<template>
  <view class="add">
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>学生姓名：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color">{{ leaveInfo.userName }}</view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>请假类型：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color">
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
          <view class="uni-input u-content-color">{{leaveInfo.startDate}}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je"  @click="endShow = true">
          <u-picker mode="time" v-model="endShow" :params="params" @confirm="endConfirm"></u-picker>
          <view class="uni-input u-content-color">{{leaveInfo.endDate}}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>请假时长：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color">{{ leaveInfo.duration }}小时</view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1"><textarea v-model="leaveInfo.remark" class="item-input u-content-color" style="text-align: right;" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="must">*</view>
        <view>是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je col-666">
          <radio-group @change="radioChange">
            <label><radio value="Y" :checked="leaveInfo.outSchool === 'Y'" />是</label>
            <label class="radio"><radio :checked="leaveInfo.outSchool === 'N'" value="N" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
        <view @click="check" class="qui-fx-f1 qui-fx rit-icon">
          <view class="qui-fx-f1 u-content-color" style="text-align:right" >
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
    <u-popup ref="checkPopup" mode="center" :mask-close-able="false" length="65%">
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
    </u-popup>
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
        child: [],
        reasonList: [],
        dataList: [],
        currentRole: 0,
        currentChild: 0,
        copyUser: '',
        leaveInfo: {
          startDate: this.$tools.getDateTime(new Date(), 'noSecond'),
          endDate: this.$tools.getDateTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 'noSecond'),
          duration: '2',
          outSchool: '',
          remark: '',
          photoList:[],
          reasonId: '',
          reason: '',
          userName: '',
          userCode: '',
          leaveCopyList: []
        },
        oddNumbers: '',
        pageList: {
          page: 1,
          size: 11
        },
        morePage: false,
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
        this.leaveInfo.userName = options.userName
        this.leaveInfo.userCode = options.userCode
	  },
    mounted () {
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
        this.copyUser = ''
        this.leaveInfo.leaveCopyList = []
        this.$refs.checkPopup.open()
      },
      cancel () {
        this.copyUser = ''
        this.leaveInfo.leaveCopyList = []
        this.$refs.checkPopup.close()
      },
      ok () {
        this.$refs.checkPopup.close()
        this.copyUser = this.leaveInfo.leaveCopyList.map(el=>{
          return  el.userName
        }).join(',')
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
      startConfirm (params) {
        this.leaveInfo.startDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`
        const time = (new Date(new Date(this.leaveInfo.endDate).getTime()).getTime() 
                        - new Date(new Date(this.leaveInfo.startDate).getTime()).getTime()) / 1000 / 60 / 60
        if (time > 0) {
         this.leaveInfo.duration =  Math.ceil(time)
        } else {
          this.leaveInfo.duration =  Math.floor(time)
        }
      },
      endConfirm (params) {
        this.leaveInfo.endDate = `${params.year}-${params.month}-${params.day} ${params.hour}:${params.minute}`
        const time = (new Date(new Date(this.leaveInfo.endDate).getTime()).getTime() 
                        - new Date(new Date(this.leaveInfo.startDate).getTime()).getTime() )/ 1000 / 60 / 60
        if (time > 0) {
         this.leaveInfo.duration =  Math.ceil(time)
        } else {
          this.leaveInfo.duration =  Math.floor(time)
        }
      },
      async submit () {
        if (this.leaveInfo.outSchool === '') {
          this.$tools.toast('请选择是否出校')
          return false
        } else if (new Date(this.leaveInfo.endDate).getTime() <= new Date(this.leaveInfo.startDate).getTime()) {
          this.$tools.toast('请选择正确时间段')
          return false
        }
        const photoList = this.leaveInfo.photoList.map(el => {
          if (el.indexOf('http') === -1) {
            return el.split(',')[1]
          } else {
            return el
          }
        })
        const req = {
          photoList: photoList,
          schoolCode: store.userInfo.schoolCode,
          leaveApprovalAddDto:{ },
          applicantCode: store.userInfo.userCode,
          applicantName: store.userInfo.userName,
          startTime: new Date(this.leaveInfo.startDate).getTime(),
          endTime: new Date(this.leaveInfo.endDate).getTime(),
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
</style>
