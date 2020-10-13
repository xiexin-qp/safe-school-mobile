<template>
  <view class="add">
    <u-select v-model="siteTag" :list="siteList" @confirm="confirm"></u-select>
    <scroll-view scroll-y="true" class="scroll-h">
      <view class="u-type-white-bg">
        <view class="detail u-fx-ver u-padd">
          <view class="u-fx-f1">
             <view>项目名称：{{ formData.name }} </view>
            <view class="u-mar-t20">检查对象：{{ formData.checkObject }} </view>
            <view class="u-mar-t20">潜在风险：{{ formData.riskContent }} </view>
            <view class="u-mar-t20">事故类型：{{ formData.accidentType }} </view>
          </view>
        </view>
      </view>
      <view class="u-fx-ac u-padd-l20 u-padd-t10 u-padd-b10 u-font-1">
        <view class="left-tip u-mar-r20"></view>
        <view> 风险评价（{{formData.checkObject}}）</view>
      </view>
      <view class="u-type-white-bg">
        <view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">L(可能性):</view>
            <view @click="choose('lsList', 'lValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.lsList">请选择</text>
              <view>{{formData.lsList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">S(严重性):</view>
            <view @click="choose('sList','sValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.sList">请选择</text>
              <view>{{formData.sList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
        </view>
        <view class="u-type-white-bg">
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">L(可能性):</view>
            <view @click="choose('lList','lValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.lList">请选择</text>
              <view>{{formData.lList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">E(频繁程度):</view>
            <view @click="choose('eList','eValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.eList">请选择</text>
              <view>{{formData.eList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">C(严重性):</view>
            <view @click="choose('cList','cValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.cList">请选择</text>
              <view>{{formData.cList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
        </view>
        <view class="u-fx-jsb u-padd">
          <view class="u-fx-f1 u-tx-c u-bd-r"> 
            <text class="u-padd-20"> 风险值：</text>
          </view>
          <view class="u-fx-f1 u-bd-r u-tx-c"> 
            <text class="u-padd-20"> 风险等级：</text>
          </view>
          <view class="u-fx-f1 u-tx-c"> 
            <text class="u-padd-20"> 安全色：</text>
          </view>
        </view>
      </view>
      <view class="u-type-white-bg">
      <view class="u-mar-t20 u-fx-ac u-bd-b u-padd u-padd-l40">
        <view class="tip">管控层级:</view>
        <view @click="choose('controlList','controlLevel')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
          <text class="u-light-color" v-if="!formData.controlList">请选择</text>
          <view>{{formData.controlList}}</view>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
        <view class="tip">责任岗位:</view>
        <view @click="choose('postList','responsibilityPost')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
          <text class="u-light-color" v-if="!formData.postList">请选择</text>
          <view>{{formData.postList}}</view>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
        <view class="tip">责任部门:</view>
        <view @click="choose('section','responsibilityDept')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
          <text class="u-light-color" v-if="!formData.section">请选择</text>
          <view>{{formData.section}}</view>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
        <view class="tip">责任人:</view>
        <view @click="choose('responsibilityUserName','responsibilityUserCode')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
          <text class="u-light-color" v-if="!formData.responsibilityUserName">请选择</text>
          <view>{{formData.responsibilityUserName}}</view>
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="u-fx-ac u-bd-b u-padd">
        <view>电话: {{formData.telephone}}</view>
      </view>
      </view>
      <view class="u-fx-ac u-padd-l20 u-padd-t10 u-padd-b10 u-font-1">
        <view class="left-tip u-mar-r20"></view>
        <view>建议措施</view>
      </view>
      <view class="u-type-white-bg">
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>工程技术：</view>
          <view class="u-fx-f1 u-fx-je u-light-color u-tx-r">
            <input class="u-font-01 u-main-color" v-model="formData.scientificMeasures" placeholder="请输入"/>
          </view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>管理措施：</view>
          <view class="u-fx-f1 u-fx-je u-light-color u-tx-r">
            <input class="u-font-01 u-main-color" v-model="formData.manageMeasures" placeholder="请输入"/>
          </view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>培训教育：</view>
          <view class="u-fx-f1 u-fx-je u-light-color u-tx-r">
            <input class="u-font-01 u-main-color" v-model="formData.trainingMeasures" placeholder="请输入"/>
          </view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>个体防护：</view>
          <view class="u-fx-f1 u-fx-je u-light-color u-tx-r">
            <input class="u-font-01 u-main-color" v-model="formData.protectiveMeasures" placeholder="请输入"/>
          </view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>应急处置：</view>
          <view class="u-fx-f1 u-fx-je u-light-color u-tx-r">
            <input class="u-font-01 u-main-color" v-model="formData.emergencyMeasure" placeholder="请输入"/>
          </view>
        </view>
      </view>
      <view class="u-fx-ac u-padd-l20 u-padd-t10 u-padd-b10 u-font-1">
        <view class="left-tip u-mar-r20"></view>
        <view>警示标识</view>
      </view>
      <view class="u-fx u-type-white-bg u-padd-l40 u-padd-t20 u-padd-b20 u-padd-r20">
        <view class="u-fx-ac-jc an-img-add u-padd-b20">
          <view class="add-font" @click="_riskAssessAsign">+</view>
          <view class="u-font-01">添加标识</view>
        </view>
        <image class="sign u-mar-r10 u-mar-t10" v-for="(list,index) in warnings" :key="index" :src="list.url" alt="">
      </view>
      <view class="u-fx-ac u-padd-l20 u-padd-t10 u-padd-b10 u-font-1">
        <view class="left-tip u-mar-r20"></view>
        <view>剩余风险评价（）</view>
      </view>
      <view class="u-type-white-bg">
        <view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">L(可能性):</view>
            <view @click="choose('lsList','remainingLValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.lsList">请选择</text>
              <view>{{formData.lsList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">S(严重性):</view>
            <view @click="choose('sList','remainingSValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.sList">请选择</text>
              <view>{{formData.sList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
        </view>
        <view class="u-type-white-bg">
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">L(可能性):</view>
            <view @click="choose('lList','remainingLValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.lList">请选择</text>
              <view>{{formData.lList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">E(频繁程度):</view>
            <view @click="choose('eList','remainingEValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.eList">请选择</text>
              <view>{{formData.eList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
          <view class="u-fx-ac u-bd-b u-padd u-padd-l40">
            <view class="tip">C(严重性):</view>
            <view @click="choose('cList','remainingCValue')" class="u-fx-f1 u-fx-je u-content-color u-mar-l20">
              <text class="u-light-color" v-if="!formData.cList">请选择</text>
              <view>{{formData.cList}}</view>
            </view>
            <view class="rit-icon"></view>
          </view>
        </view>
        <view class="u-fx-jsb u-padd">
          <view class="u-fx-f1 u-tx-c u-bd-r"> 
            <text class="u-padd-20"> 风险值：</text>
          </view>
          <view class="u-fx-f1 u-bd-r u-tx-c"> 
            <text class="u-padd-20"> 风险等级：</text>
          </view>
          <view class="u-fx-f1 u-tx-c"> 
            <text class="u-padd-20"> 安全色：</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="footer-btn u-fx-ac">
      <u-button
        type="primary"
        class="u-fx-f1 u-mar-l u-mar-r u-type-primary-dark-bg"
        @click="submit"
        >提交</u-button
      >
    </view>
    <view>
		  <u-popup mode="bottom" v-model="show">
        <view class="content">
          <view class="u-fx-jsb">
            <view class="u-light-color">取消</view>
            <view class="u-type-primary" @click="ok">确定</view>
          </view>
          <scroll-view scroll-y="true" class="scroll-w">
            <view>
              <u-tabs :list="list" :is-scroll="false" :current="current" @change="tabChange"></u-tabs>
              <view class="u-fx-wp" v-if="allSignList[current]">
                <view class="img-box u-mar-r10 u-mar-b10" v-for="(list,index) in allSignList[current].signList" :key="index" @click="chooseSign(list)">
                  <image :src="list.url" alt="">
                  <view :class="['check-box', {'check' : list.check }]"></view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </u-popup>
    </view>
  </view>
</template>
<script>
import { actions, store, setStore } from "./store/index"
import eventBus from "@u/eventBus"
import addData from "./assets/add.js"
import noData from "@/components/no-data/no-data.vue"
export default {
  components: {
    noData
  },
  data() {
    return {
      addData,
      classList: [],
      siteTag: false,
      siteList: [],
      formData: {
        name: ''
      },
      currentValue: '',
      currentLabel: '',
      categoryList: [],
      dataList: [],
      chooseAllList: [],
      detailId: '',
      sectionList: [],
      userList: [],
      show: false,
      list: [{
					name: '警告类'
				}, {
					name: '禁止类'
				}, {
					name: '指令类'
				}, {
					name: '提示类'
				}],
      current: 0,
      allSignList: [],
      warnings: []
    };
  },
  mounted() {
    this.detailId = this.$tools.getQuery().get("id")
    // this.chooseAllList = uni.getStorageSync('chooseList')
    // eventBus.$on("getList", () => {
    //   this.chooseAllList = uni.getStorageSync('chooseList')
    //   this.riskModelList_()
    // });
    // this.riskCategory_()
    // this.riskAssessDetail_()
    this._getOrgBySchool()
  },
  methods: {
    // 获取学校信息
    async _getOrgBySchool () {
      const res = await actions.getOrgBySchool(store.userInfo.schoolCode)
      this.sectionList = res.data.orgChilds.map(el=>{
        return {
          ...el,
          label: el.name,
          value: el.code
        }
      })
    },
    // 获取所有老师
    async _getTeacherList () {
      const req = {
        page: 1,
        size: 9999,
        schoolCode: store.userInfo.schoolCode,
        orgCode: this.formData.responsibilityDept
      }
      const res = await actions.getTeacherList(req)
      this.userList = res.data.list.map(el=>{
        return {
          ...el,
          label: el.userName,
          value: el.userCode
        }
      })
    },
    async riskAssessDetail_() {
      const res = await actions.riskAssessDetail(this.detailId)
      // this.categoryList = res.data
    },
    async _riskAssessAsign () {
      const res = await actions.riskAssessAsign()
      this.allSignList = res.data.map(el => {
        return {
          signList: el.signList.map(el => {
            return {
              url: el,
              check: false
            }
          })
        }
      })
      console.log('this.allSignList',this.allSignList)
      this.show = true
    },
    chooseSign(list) {
      list.check = !list.check
    },
    ok() {
      const arr = []
      this.allSignList.forEach(el => {
        el.signList.forEach(item => {
          if (item.check) {
            arr.push(item)
          }
        })
      })
      this.show = false
      this.warnings = arr
      console.log('arr', arr)
    },
    async riskCategory_() {
      const res = await actions.riskCategory()
      this.categoryList = res.data
      this.formData.categoryName = this.categoryList[0].categoryName
      this.formData.categoryCode = this.categoryList[0].categoryCode
      this.formData.typeName = '设施设备及区域'
      this.formData.typeCode = '1'
      this.formData.methodName = '教学条件危险性分析评价法（LES）'
      this.formData.methodCode = '1'
      this.riskModelList_()
    },
    choose(type,title){
      this.currentValue = title
      this.currentLabel = type
      if(type === 'section'){
        this.siteList = this.sectionList
      } else if(type === 'responsibilityUserName'){
        this.siteList = this.userList
      } else {
        this.siteList = this.addData[type]
      }
      this.siteTag = true
    },
    async riskModelList_() {
      const req = {
        categoryCode: this.formData.categoryCode,
        page: 1,
        size: 9999
      }
      const res = await actions.riskModelList(req)    
      this.dataList = res.data.records.map(el => {
        if(this.chooseAllList.length > 0) {
          this.chooseAllList.forEach(item => {
          if(el.id === item.id) {
            this.$set(el, 'checked', true)
          }
        })
        }
        return el
      })
    },
    confirm(e) {
      if (!e) {
        return;
      }
      this.formData[this.currentValue] = e[0].value
      this.formData[this.currentLabel] = e[0].label
      if(this.currentLabel === 'section') {
        this._getTeacherList()
      }
    },
    check(){
      this.$tools.navTo({
        url: './choose',
        title: "已选择检查对象"
      });
    },
    chooseImage(){

    },
    tabChange(key){
      this.current = key
    },
    submit() {
      if (this.chooseAllList.length === 0) {
        return this.$tools.toast('请选择检查对象')
      }
      this.$tools.confirm("确定提交风险辨识吗？", () => {
          let req = {
          ...this.formData,
          schoolCode: store.userInfo.schoolCode,
          ids: this.chooseAllList.map(el => el.id)
        }
        actions.addRiskIdentify(req).then(res => {
          this.$tools.toast('上报成功')
          uni.setStorageSync('chooseList', [])
          this.$tools.goNext(() => {
            eventBus.$emit('getList')
            this.$tools.navTo({
              url: "./index",
              title: "风险辨识",
            });
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  .scroll-h {
    height: calc(100vh - 100rpx);
    .tip::before {
      position: absolute;
      content: '*';
      color: #ff0000;
      left: 10px;
      top: 12px;
      z-index: 99;
    }
  }
  .item-text-area {
    height: 120rpx;
    width: 100%;
    line-height: 40rpx;
    color: $u-content-color;
  }
  .detail {
    width: 100vw;
  }
}
.left-tip {
  width: 6rpx;
  height: 32rpx;
  background-color: #0084FF;
}
.an-img-add {
	margin-right: 10rpx;
	height: 140rpx;
	width: 140rpx;
	color:#ccc;
  background-color: #f7f7f7;
  .add-font {
    font-size: 80rpx;
  }
}
/deep/ .uni-picker-view-indicator {
  height: 200rpx!important;
}
.content {
  padding: 24rpx;
  text-align: center;
}
.scroll-w {
  height: 600rpx;
}
.img-box {
  position: relative;
  image {
    width: 107rpx;
    height: 130rpx;
  }
  .check-box {
    position: absolute;
    top: 1rpx;
    right: 3rpx;
    height: 18rpx;
    width: 18rpx;
  }
  .check{
    background: url(/mobile-img/check.png) center center;
    background-size: 100% 100%;
  }
}
 .sign {
    width: 140rpx;
    height: 140rpx;
    color: #ccc;
  }
</style>
