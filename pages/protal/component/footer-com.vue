<template>
	<view class="footer-com u-fx u-bd-t">
		<view @click="switchTab(foot.id)" class="u-fx-f1 u-fx-ac-jc u-content-color" :class="{ 'act': foot.id == tabIndex }" v-for="foot in footList" :key="foot.id">
			<image :src="foot.id === tabIndex ? foot.iconAct : foot.icon" class="foot-img"></image>
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
          icon: '/mobile-img/home-icon.png',
					iconAct: '/mobile-img/home-icon-act.png'
				},
				{
					id: 1,
					name: '应用',
					icon: '/mobile-img/shop-icon.png',
					iconAct: '/mobile-img/shop-icon-act.png'
				},
				// {
				// 	id: 2,
				// 	name: '消息',
				// 	icon: '/mobile-img/message-icon.png',
				// 	iconAct: '/mobile-img/message-icon-act.png'
				// },
				{
					id: 2,
					name: '我的',
					icon: '/mobile-img/mine-icon.png',
					iconAct: '/mobile-img/mine-icon-act.png'
				}
			]
		}
	},
  computed: {
    tabIndex: () => store.tabIndex
  },
	methods: {
		switchTab (index) {
			if (index !== 3 && store.userInfo.typeCode === '16' && store.childList.length === 0) {
				this.$tools.toast('请先绑定孩子')
				return
			}
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
	.foot-img {
		width: 40rpx;
		height: 40rpx;
		display: block;
	}
	.act {
		color: $u-type-primary !important;
	}
}
</style>
