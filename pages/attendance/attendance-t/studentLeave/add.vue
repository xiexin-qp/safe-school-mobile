<template>
  <view class="add">
    <scroll-view scroll-y="true" class="scroll-h u-bg-fff">
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view class="tip">请假学生：</view>
        <view @click="check(1)" class="qui-fx-f1 qui-fx qui-tx-r">
          <view class="qui-fx-f1 u-content-color" >
            {{leaveInfo.userName}}
          </view>
          <view class="rit-icon"></view>
        </view>
			</view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">请假类型：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color">
          <picker mode="selector" :value="currentRole" :range="role" @change="chooseRole">
            {{role[currentRole]}}
          </picker>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">开始时间：</view>
        <view class="qui-fx-f1 qui-fx-je"  @click="startShow = true">
          <u-picker mode="time" v-model="startShow" :params="params" @confirm="startConfirm"></u-picker>
          <view class="uni-input u-content-color">{{leaveInfo.startDate}}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">结束时间：</view>
        <view class="qui-fx-f1 qui-fx-je"  @click="endShow = true">
          <u-picker mode="time" v-model="endShow" :params="params" @confirm="endConfirm"></u-picker>
          <view class="uni-input u-content-color">{{leaveInfo.endDate}}</view>
          <view class="rit-icon"></view>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">请假时长：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color">{{ leaveInfo.duration }}小时</view>
      </view>
      <view class="qui-fx qui-bd-b item-list">
        <view>描述：</view>
        <view class="qui-fx-f1 qui-tx-r"><textarea v-model="leaveInfo.remark" class="item-input u-content-color" placeholder="请输入描述" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">是否出校：</view>
        <view class="qui-fx-f1 qui-fx-je col-666">
          <radio-group @change="radioChange">
            <label><radio value="Y" :checked="leaveInfo.outSchool === 'Y'" />是</label>
            <label class="radio"><radio :checked="leaveInfo.outSchool === 'N'" value="N" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
			  <view>抄送人：</view>
        <view @click="check(0)" class="qui-fx-f1 qui-fx">
          <view class="copyer qui-fx-f1 u-content-color qui-tx-r">
            <u-tag 
              @close="tagClick(item)"
              v-for="(item,index) in leaveInfo.leaveCopyList"
              :key="index"
              :text="item.userName"
              mode="light" 
              type="info" 
              closeable
              class="mar-l10"
              />
          </view>
          <view class="rit-icon"></view>
        </view>
			</view>
      <view class="qui-bd-b item-list">
			  <view>上传附图：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="leaveInfo.photoList" class="img-margin"></an-upload-img>
			  </view>
			</view>
    </scroll-view>
    <view class="submit-box">
      <view class="btn" @click="submit">提交</view>
    </view>
    <u-popup ref="popup" mode="center" :mask-close-able="false" length="75%">
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
          <view class="submit-btn student-btn qui-fx">
            <u-button class="btn u-font-01" @click="cancel(1)">取消</u-button>
            <u-button type="primary" class="btn u-font-01" @click="ok(1)">确定</u-button>
          </view>
        </view>
      </scroll-view>
    </u-popup>
    <u-popup ref="checkPopup" mode="center" :mask-close-able="false" length="75%">
      <view class="search"> 
        <u-search placeholder="请输入姓名" v-model="keyword" shape="square" height="55" :show-action="false" :clearabled="false"></u-search>
      </view>
      <scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMore(0)">
        <view>
          <u-checkbox-group>
            <label class="list qui-bd-b qui-fx-jsb" v-for="item in dataList" :key="item.userCode">
              <label :for="item.userName">
                <text>{{item.userName}}</text>
              </label>
              <u-checkbox @change="checkBox" v-model="item.checked" :name="`${item.userCode}^${item.userName}=${item.photoUrl}`"></u-checkbox>
            </label>
          </u-checkbox-group>
          <view class="submit-btn qui-fx">
            <u-button class="btn u-font-01" @click="cancel(0)">取消</u-button>
            <u-button type="primary" class="btn u-font-01" @click="ok(0)">确定</u-button>
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
        reasonList: [],
        dataList: [],
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
          size: 15
        },
        orgPageList: {
          page: 1,
          size: 15
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
        },
        keyword: '',
        checkList: []
			}
    },
    watch: {
      keyword (val, oldval) {
        this.keyword = val 
        this.orgUserGet()
      },
      checkList (val, oldval){
        this.leaveInfo.leaveCopyList = []
        val.map( el => {
          this.leaveInfo.leaveCopyList.push({
            userCode: el.split('^')[0],
            userName: el.split('^')[1].split('=')[0],
            photoUrl : el.split('^')[1].split('=')[1]
          })
        })
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
        const data = this.leaveInfo.leaveCopyList
        this.checkList = data.map( el => {
          return `${el.userCode}^${el.userName}=${el.photoUrl}`
        })
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
          keyword: this.keyword,
          orgCode: '',
          page: this.orgPageList.page,
          size: this.orgPageList.size,
          schoolCode: store.userInfo.schoolCode
        }
        const res = await actions.getOrgUser(req)
        const data = res.data.list
        data.forEach(el => {
          this.leaveInfo.leaveCopyList.forEach(element => {
            if(element.userCode === el.userCode) {
              el.checked = true
            }
          })
        })
        if (tag) {
          this.dataList = this.dataList.concat(data)
        } else {
          this.dataList = data
        }
			  this.OrgMorePage = res.data.hasNextPage
      },
      check (type) {
        if (type) {
          this.leaveInfo.userName = ''
          this.$refs.popup.open()
        } else {
          this.keyword = ''
          this.orgUserGet()
          this.$refs.checkPopup.open()
        }
      },
      cancel (type) {
        if (type) {
          this.leaveInfo.userName = ''
          this.$refs.popup.close()
        } else {
          this.$refs.checkPopup.close()
        }
      },
      ok (type) {
        if (type) {
          this.$refs.popup.close()
        } else {
          this.$refs.checkPopup.close()
        }
      },
      checkBox(e){
        if (e.value) {
          this.checkList.push(e.name)
        } else {
          this.checkList.splice(this.checkList.indexOf(e.name),1)
        }
      },
      tagClick(item) {
        const data = `${item.userCode}^${item.userName}=${item.photoUrl}`
        this.checkList.splice(this.checkList.indexOf(data),1)
			},
      radioUser (e) {
        const data = e.target.value
        this.leaveInfo.userName = data.split('^')[1].split('=')[0]
        this.leaveInfo.userCode = data.split('^')[0]
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
        if (this.leaveInfo.userName === '') {
          this.$tools.toast('请选择学生')
          return false
        } else if (this.leaveInfo.outSchool === '') {
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
  .item-list {
    padding: 25rpx 15rpx 25rpx 25rpx;
    .tip::before {
			position: absolute;
			z-index: 99;
			content: "*";
			top: 30rpx;
			color: $u-type-error;
			font-weight: bold;
			left: 8rpx;
		}
    .item-input {
      width: 100%;
      font-size: 26rpx;
      color: $u-tips-color;
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
  .search {
    padding: 20rpx;
  }
  .scroll {
    height: 78vh;
    padding-bottom: 10vh;
    .list {
      padding: 15rpx 25rpx;
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    .u-checkbox-group {
      display: flex;
      flex-direction: column;
    }
    .submit-btn {
      height: 80rpx;
      position: fixed;
      bottom: 8vh;
      left: 27%;
      .btn {
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        letter-spacing: 8rpx;
        margin: 0 20rpx;
      }
    }
    .student-btn {
      bottom: 12vh;
    }
  }
}
.copyer {
  .u-size-default {
    padding: 10rpx 5rpx;
  }
}
.img-margin {
  margin: 20rpx;
}
.mar-l10 {
  margin-left: 10rpx;
}
</style>
