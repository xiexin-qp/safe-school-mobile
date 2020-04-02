<template>
  <view>
    <scroll-view @refresherpulling="haha" scroll-y="true"  class="scroll-h">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>姓名：</view>
        <view class="qui-fx-f1"><input class="item-input" v-model="formData.userName" style="text-align: right;" placeholder="请输入姓名" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>性别：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <radio-group @change="changeRadio">
            <label><radio value="1" checked="true" />男</label>
            <label class="radio"><radio value="2" />女</label>
          </radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>学号：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <input class="item-input" v-model="formData.code" style="text-align: right;" placeholder="请输入学号" />
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>是否已婚：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <switch @change="switch1Change" />
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>出生日期：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="date" :value="formData.birthday" @change="bindTimeChange">
              <view class="uni-input">{{formData.birthday}}</view>
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>角色：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <picker mode="selector" :value="formData.role" :range="role" @change="chooseRole">
              {{role[formData.role] || '请选择'}}
          </picker>
        </view>
        <view>></view>
      </view>
      <view class="qui-bd-b item-list">
        <view>身体状况：</view>
        <view class="qui-fx-f1">
          <checkbox-group @change="checkboxChange">
            <view class="checkbox">
              <checkbox value="1" />健康
            </view>
            <view class="checkbox">
              <checkbox value="2" />发烧
            </view>
            <view class="checkbox">
              <checkbox value="3" />咳嗽
            </view>
          </checkbox-group>
        </view>
      </view>
			<view class="qui-bd-b item-list">
			  <view>上传图片：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="imgList" style="margin: 20rpx"></an-upload-img>
			  </view>
			</view>
      <view>
        {{JSON.stringify(formData)}}
      </view>
    </scroll-view>
    <view class="submit-box qui-fx">
      <view class="btn" @click="confirm">确认框</view>
      <view class="btn" @click="actionsheet">actionsheet</view>
    </view>
  </view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	export default {
		data() {
			return {
        role: ['家长', '班主任', '教职工'],
        formInfo: {},
        formData: {
          userName: '张立',
          sex: '1',
          code: '1234',
          isMarry: false,
          birthday: '请选择',
          role: 0,
          healthy: ''
        },
				imgList: []
			}
		},
		components: {
			anUploadImg
		},
    computed: {
    },
    async mounted() {
    },
    methods: {
      confirm () {
        this.$tools.confirm('确定删除吗', () => {
					console.log(this.imgList)
        })
      },
      actionsheet () {
        const arr = ['苹果', '梨子', '香蕉']
        this.$tools.actionsheet(['苹果', '梨子', '香蕉'], (index) => {
          console.log(arr[index])
        })
      },
      changeRadio (e) {
        this.formData.sex = e.target.value
      },
      switch1Change (e) {
        this.formData.isMarry = e.target.value
      },
      bindTimeChange (e) {
        this.formData.birthday = e.target.value
      },
      chooseRole (e) {
        this.formData.role = e.target.value
      },
      checkboxChange (e) {
        this.formData.healthy = e.target.value
      }
    }
	}
</script>

<style lang="scss">
  .scroll-h {
    height: calc(100vh - 100rpx);
  }
  .item-list {
    padding: 25rpx 15rpx;
  }
  .item-input {
    width: 100%;
    font-size: 26rpx;
    color: #999;
  }
  .radio {
    padding-left: 25rpx
  }
  .checkbox {
    padding: 30rpx 10px 10px 2px;
  }
  .submit-box {
    height: 100rpx;
    .btn {
      padding:0 20rpx;
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
</style>
