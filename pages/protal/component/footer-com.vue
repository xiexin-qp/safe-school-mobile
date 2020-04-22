<template>
	<view class="footer-com qui-fx qui-bd-t">
		<view @click="switchTab(foot.id)" class="qui-fx-f1 qui-fx-ac-jc" :class="{ 'act': foot.id == tabIndex }" v-for="foot in footList" :key="foot.id">
			<text v-if="foot.id == 0" class="iconfont" >&#xe64f;</text>
      <text v-else-if="foot.id == 1" class="iconfont" >&#xe60d;</text>
      <text v-else-if="foot.id == 2" class="iconfont" >&#xe600;</text>
      <text v-else-if="foot.id == 3" class="iconfont" >&#xe62e;</text>
			<text class="tip">{{ foot.name }}</text>
		</view>
	</view>
</template>

<script>
import { store, setStore } from '../store/index.js'
export default {
	data() {
		return {
			footList: [
				{
					id: 0,
					name: '首页',
          icon: ''
				},
				{
					id: 1,
					name: '应用'
				},
				{
					id: 2,
					name: '我的'
				}
			]
		}
	},
  computed: {
    tabIndex: () => store.tabIndex
  },
	methods: {
		switchTab (index) {
      setStore({
        key: 'tabIndex',
        data: index
      })
		}
	}
}
</script>

<style lang="scss">
.footer-com {
	width: 100%;
	height: 100rpx;
	background-color: #ffffff;
  .tip {
    padding-top: 4rpx;
    font-size: 24rpx;
  }
  i {
    font-size: 40rpx;
  }
	.act {
		color: #007AFF;
	}
}
</style>
