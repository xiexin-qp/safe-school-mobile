<template>
	<scroll-view scroll-y="true"  class="scroll-h">
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>学校：</view>
				<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="schoolList[0]" :range="schoolList" @change="chooseItem">
						{{ schoolList[0] }}
				</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>年级：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="gradeList[0]" :range="gradeList" @change="chooseItem">
					{{ schoolList[0] }}
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>班级：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="classList[0]" :range="classList" @change="chooseItem">
					{{ schoolList[0] }}
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子姓名：</view>
			<view class="qui-fx-f1"><input class="item-input" v-model="formData.childName" placeholder="请输入姓名" /></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子性别：</view>
			<view class="qui-fx-f1 qui-fx-je col-666">
				<radio-group @change="changeRadio">
					<label><radio value="1" checked="true" />男</label>
					<label class="radio"><radio value="2" />女</label>
				</radio-group>
			</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>孩子学号：</view>
			<view class="qui-fx-f1 qui-fx-je">
				<input class="item-input" v-model="formData.code" placeholder="请输入学号" />
			</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>亲属关系：</view>
			<picker class="qui-fx-f1 qui-tx-r col-666" mode="selector" :value="formData.relation" :range="role" @change="chooseItem">
					{{role[formData.role] || '请选择'}}
			</picker>
			<view class="rit-icon"></view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>家长姓名：</view>
			<view class="qui-fx-f1 qui-fx-je">
				<input class="item-input" v-model="formData.parentName" placeholder="请输入姓名" />
			</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>手机号：</view>
			<view class="qui-fx-f1 qui-fx-je">
				<input class="item-input" v-model="formData.parentTel" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="qui-fx-ac qui-bd-b item-list">
			<view>验证码：</view>
			<view class="qui-fx-f1 qui-fx-je">
				<input class="item-input" v-model="formData.code" placeholder="请输入验证码" />
			</view>
			<view class="yzm-btn">获取验证码</view>
		</view>
		<view class="submit-box">
			注册
		</view>
		<view class="go-login" @click="goLogin">
			已有账号,<span class="act">直接登录></span>
		</view>
	</scroll-view>
</template>

<script>
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'
	export default {
		data() {
			return {
				schoolList: ['请选择', '武汉全品', '宜昌外国语'],
				gradeList: ['一年级', '二年级'],
				classList: ['一班', '二班'],
        role: ['家长', '班主任', '教职工'],
        formInfo: {},
        formData: {
          childName: '',
					childSex: '1',
					childNo: '',
					parentName: '',
					parentTel: '',
					school: '',
					grade: '',
					class: '',
					relation: '',
					code: ''
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
			// 登录
			goLogin () {
				this.$tools.navTo({
					url: './index',
					title: '平安校园'
				})
			},
			// 选择学校班级和年级
			chooseItem (type) {
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
    height: 100vh;
  }
  .item-list {
    padding: 28rpx 15rpx;
  }
  .item-input {
    width: 100%;
    font-size: 26rpx;
    color: #666;
		text-align: right;
  }
	.col-666 {
		color:#999
	}
  .radio {
    padding-left: 25rpx
  }
  .checkbox {
    padding: 30rpx 10px 10px 2px;
  }
	.yzm-btn {
		background-color: $main-color;
		height: 60rpx;
		line-height: 60rpx;
		width: 180rpx;
		color:#fff;
		margin-left: 30rpx;
		text-align: center;
		border-radius: 4rpx;
	}
  .submit-box {
		margin: 50rpx 20rpx;
		text-align: center;
		padding:0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		letter-spacing: 8rpx;
		background-color: $main-color;
		color:#fff;
		border-radius: $radius;
  }
	.go-login {
		text-align: center;
		color: #666;
		padding-bottom: 40rpx;
		letter-spacing: 2rpx;
		.act {
			padding-left: 6rpx;
			color: $main-color
		}
	}
</style>
