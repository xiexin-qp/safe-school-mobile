<template>
  <view>
		<u-picker @confirm="changeTime" v-model="birthdayTag" mode="time"></u-picker>
		<cp-select-item :items="roleList" @confirm="changeRole" v-model="roleTag"></cp-select-item>
    <scroll-view scroll-y="true"  class="scroll-h u-bg-fff">
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">姓名：</view>
        <view class="qui-fx-f1"><input class="item-input" v-model="formData.userName" style="text-align: right;" placeholder="请输入姓名" /></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">性别：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <u-radio-group v-model="formData.value" @change="changeSex">
						<u-radio 
							shape="circle"
							class="radio-mar"
							v-for="(item, index) in sexList" :key="index" 
							:name="item.key"
						>
							{{item.name}}
						</u-radio>
					</u-radio-group>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view>是否已婚：</view>
        <view class="qui-fx-f1 qui-fx-je">
          <u-switch v-model="formData.isMarry"></u-switch>
        </view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">出生日期：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color" @click="birthdayTag =  true">
					{{formData.birthday}}
        </view>
        <view class="rit-icon"></view>
      </view>
      <view class="qui-fx-ac qui-bd-b item-list">
        <view class="tip">角色：</view>
        <view class="qui-fx-f1 qui-fx-je u-content-color" @click="roleTag =  true">
					{{ formData.role }}
        </view>
        <view class="rit-icon"></view>
      </view>
			<view class="qui-fx-ac qui-bd-b item-list">
			  <view class="tip">类型：</view>
			  <view class="qui-fx-f1 qui-fx-je u-content-color" @click="changeAction">
					{{ formData.type }}
			  </view>
			  <view class="rit-icon"></view>
			</view>
      <view class="qui-bd-b item-list">
        <view class="tip">身体状况：</view>
        <view class="qui-fx-f1 u-padd-t">
          <u-checkbox-group @change="changeHealth">
						<u-checkbox 
							v-model="item.checked" 
							v-for="(item, index) in healthyList" :key="index" 
							:name="item.key"
						>{{item.name}}</u-checkbox>
					</u-checkbox-group>
        </view>
      </view>
			<view class="qui-bd-b item-list">
			  <view class="tip">上传图片：</view>
			  <view class="qui-fx-f1">
					<an-upload-img total="3" v-model="formData.imgList" style="margin: 20rpx"></an-upload-img>
			  </view>
			</view>
			<view class="qui-bd-b item-list">
			  <view>备注：</view>
			  <view class="qui-fx-f1"><textarea class="item-text-area" v-model="formData.mark" placeholder="请输入备注" /></textarea></view>
			</view>
    </scroll-view>
		<view class="submit-btn">
			<u-button type="primary" @click="submitForm">提交</u-button>
		</view>
  </view>
</template>

<script>
	import validateForm from '@u/validate'
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	const yzForm = {
		userName: '请输入用户名',
		sex: '请选择性别',
		birthday: '请选择出生日期',
		role: '请选择角色',
		type: '请选择类型',
		healthy: '请选择身体状况',
		imgList: '请上传图片'
	}
	export default {
		data() {
			return {
				roleTag: false,
				birthdayTag: false,
				healthyList: [
					{
						key: 1,
						name: '健康'
					},
					{
						key: 2,
						name: '咳嗽'
					},
					{
						key: 3,
						name: '感冒'
					}
				],
				sexList: [
					{
						name: '男',
						key: 1
					}, {
						name: '女',
						key: 2
					}
				],
				roleList: [
					{
						key: 1,
						label: '爸爸'
					},
					{
						key: 2,
						label: '妈妈'
					},
					{
						key: 3,
						label: '爷爷'
					}
				],
				typeList: [
					{
						key: 1,
						label: '超级管理员'
					},
					{
						key: 2,
						label: '管理员'
					}
				],
				formData: {
					userName: '',
					healthy: [],
					sex: '',
					birthday: '请选择',
					isMarry: true,
					role: '请选择',
					type: '请选择',
					imgList: []
				}
			}
		},
		components: {
			anUploadImg
		},
    methods: {
			changeHealth (item) {
				this.formData.healthy = item
			},
			changeSex (item) {
				this.formData.sex = item
			},
			changeRole(item) {
				this.formData.role = item.label
			},
      changeTime (item) {
				this.formData.birthday = `${item.year}-${item.month}-${item.day}`
      },
      changeAction () {
        this.$tools.actionsheet(this.typeList, (item) => {
					this.formData.type = item.label
        })
      },
			submitForm () {
				validateForm(yzForm, this.formData, () => {
					console.log(this.formData)
				})
			}
    }
	}
</script>

<style lang="scss">
  .scroll-h {
    height: calc(100vh - 120rpx);
  }
  .item-list {
    padding: 25rpx 15rpx 25rpx 25rpx;
		.tip::before {
			position: absolute;
			z-index: 99;
			content: "*";
			top: 30rpx;
			color: red;
			font-weight: bold;
			left: 8rpx;
		}
  }
  .item-input {
    width: 100%;
    font-size: 26rpx;
    color: $u-content-color;
  }
  .radio-mar {
    padding-left: 35rpx
  }
	.item-text-area {
		height: 120rpx;
		width: 100%;
		line-height: 40rpx;
		padding-top: 15rpx;
		color: $u-content-color;
		font-size: 24rpx;
	}
  .checkbox {
    padding: 30rpx 10px 10px 2px;
  }
  .submit-btn {
    height: 120rpx;
		padding: 20rpx
  }
</style>
