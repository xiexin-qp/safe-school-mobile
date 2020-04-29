<template>
  <view>
		<u-picker v-model="birthdayTag" mode="time"></u-picker>
    <scroll-view @refresherpulling="haha" scroll-y="true"  class="scroll-h u-bg-fff">
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
        <view>是否已婚：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <u-switch v-model="formData.isMarry"></u-switch>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>出生日期：</view>
        <view class="qui-fx-f1 qui-fx-je" @click="changeTag('birthdayTag')">
					{{formData.birthday}}
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>角色：</view>
        <view class="qui-fx-f1 qui-fx-je">
					{{ formData.role }}
        </view>
        <view class="rit-icon"></view>
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
    </scroll-view>
		<view class="submit-btn">
			<u-button type="primary">提交</u-button>
		</view>
  </view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	export default {
		data() {
			return {
				birthdayTag: false,
				imgList: [],
				formData: {
					userName: '',
					sex: '',
					birthday: '',
					isMarry: []
				}
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
			changeTag (tag) {
				alert(2)
				this[tag] = true
			},
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
    color: $u-content-color;
  }
  .radio {
    padding-left: 25rpx
  }
  .checkbox {
    padding: 30rpx 10px 10px 2px;
  }
  .submit-btn {
    height: 100rpx;
		padding: 10rpx 20rpx;
  }
</style>
