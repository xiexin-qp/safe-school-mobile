<template>
  <view class="app">
    <view v-if="!isEdit" class="qui-fx-ac enjoy-app">
      <text class="text">常用模块</text>
      <view class="qui-fx-f1 qui-fx">
        <view v-for="enjoy in enjoyApp" :key="enjoy.id" class="app">
          <img :src="enjoy.icon || '/mobile-img/app-auto-icon.png'" alt="">
        </view>
      </view>
      <view class="btn edit" @click="isEdit = true">编辑</view>
    </view>
    <view v-if="isEdit" class="enjoy-app qui-fx-jsb qui-fx-ac">
      <text class="text">常用模块</text>
      <view class="btn save" @click="isEdit = false">完成</view>
    </view>
    <view v-if="isEdit" class="system-list edit-app qui-bd-t">
      <div v-if="enjoyApp.length === 0" class="no-app">暂未添加常用模块...</div>
      <view @click="delEnjoy(enjoy.code)" v-for="enjoy in enjoyApp" :key="enjoy.id" class="app qui-fx-ac-jc" :class="{'act': isEdit}">
        <i style="color: #999" class="iconfont">&#xe62b;</i>
        <view>
          <img :src="enjoy.icon || '/mobile-img/app-auto-icon.png'" alt="">
        </view>
        <text class="text">{{ enjoy.name.split('-')[0] }}</text>
      </view>
    </view>
    <view class="app-module">
			<view class="system-box">
				<view class="system-list" v-for="app in appList" :key="app.id">
					<view class="system">{{ app.name }}</view>
					<view @click="chooseEnjoy(module, isShow(module.id))" class="app qui-fx-ac-jc" :class="{'act': isEdit}" v-for="module in app.children" :key="module.id">
						<i v-if="isShow(module.id) && isEdit" style="color: #999" class="iconfont">&#xe62b;</i>
						<i v-if="!isShow(module.id) && isEdit" style="color: #7b92f5" class="iconfont">&#xe636;</i>
						<view>
							<img :src="module.icon || '/mobile-img/app-auto-icon.png'" alt="">
						</view>
						<view class="text">{{ module.name.split('-')[0] }}</view>
						<view class="text">({{ module.name.split('-')[1] }})</view>
					</view>
				</view> 
			</view>
    </view>
  </view>
</template>

<script>
  import { store, setStore, actions } from './store/index.js'
  export default {
    data () {
      return {
        isEdit: false,
        appList: []
      }
    },
    computed: {
			userInfo: () => store.userInfo,
			enjoyApp: () => store.enjoyApp
    },
    async mounted () {
			this.getMenuList()
    },
    methods: {
			// 获取菜单列表
			async getMenuList () {
				const res = await actions.getMenuList({
					plateformType: 1,
					schoolCode: this.userInfo.schoolCode,
					userId: this.userInfo.userId,
					userType: this.userInfo.typeCode
				})
				this.appList = res.data
			},
      delEnjoy (id) {
        if (this.enjoyApp.length === 4) {
          uni.showToast({
              title: '至少保留4个模块',
              duration: 1200
          })
          return
        }
        const index = this.enjoyApp.findIndex(item => {
          return item.id === id
        })
        this.enjoyApp.splice(index, 1)
        this.setEnjoy(this.enjoyApp)
      },
      chooseEnjoy (item, tag) {
        if (!this.isEdit) {
					this.$tools.navTo({
						title: item.name,
						url: item.url
					})
					return
				}
        if (tag) {
          this.delEnjoy(item.id)
        } else {
          if (this.enjoyApp.length === 7) {
            uni.showToast({
                title: '最多只能添加7个模块',
                duration: 1200
            })
            return
          }
          this.enjoyApp.push({
            id: item.id,
            icon: item.icon,
            name: item.name,
						url: item.url
          })
          this.setEnjoy(this.enjoyApp)
        }
      },
      setEnjoy (data) {
        setStore({
          key: 'enjoyApp',
          data
        })
				// 分别存教职工和家长的首页收藏app
				if (this.userInfo.typeCode == 4) {
					setStore({
						key: 'enjoyTeacherApp',
						data
					})
				} else {
					setStore({
						key: 'enjoyParentApp',
						data
					})
				}
      },
      isShow (id) {
        return this.enjoyApp.some(item => {
          return item.id === id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .enjoy-app {
    height: 80rpx;
    line-height: 80rpx;
    background-color: #fff;
    padding: 0 20rpx;
    .text {
      color: #666;
      padding-right: 10rpx;
    }
    .app {
      margin-left: 20rpx;
      img {
        border-radius: 100%;
        width: 40rpx;
        height: 40rpx;
        display: block;
      }
    }
    .btn {
      border-radius: $radius;
      width: 100rpx;
      height: 50rpx;
      line-height: 48rpx;
      text-align: center;
      color: #666;
      font-size: 24rpx;
    }
    .edit {
      border: 1px #ccc dashed;
    }
    .save {
      color: #fff;
      background-color: $main-color;
    }
  }
  .app-module {
    .module {
      height: 75rpx;
      line-height: 75rpx;  
      padding: 0 15rpx;
      font-weight: 600;
      font-size: $font-middle;
    }
    .system-box {
      padding-top: 30rpx;
      background-color: #fff;
    }
  }
  .edit-app {
    overflow: auto;
    background-color: #fff;
    padding-top: 10rpx;
   }
   .no-app {
     padding: 30rpx;
     text-align: center;
     font-size: 24rpx;
     color: $dark-color;
   }
  .system-list {
    overflow: auto;
    .system {
      margin-left: 30rpx;
      margin-bottom: 10rpx;
      height: 34rpx;
      line-height: 34rpx;
      padding-left: 16rpx;
      border-radius: $radius;
      font-size: $font-title;
      border-left: 8rpx solid $main-color;
    }
    .app {
      float: left;
      width: 22.5%;
      margin-left: 2%;
      margin-bottom: 10rpx;
      padding: 20rpx 0;
      position: relative;
      i {
        position: absolute;
        top: 10rpx;
        right: 10rpx;
        z-index: 88;
      }
      &.act {
        border-radius: $radius;
        background-color: #e8e8e8;
      }
      img {
        width: 52rpx;
        height: 52rpx;
        display: block;
      }
      .text {
        color: $des-color;
        transform: scale(.9);
        -webkit-transform: scale(.9);
        font-size: $font-second;
        padding-top: 10rpx
      }
    }
  }
</style>