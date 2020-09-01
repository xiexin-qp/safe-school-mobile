<template>
	<view class="u-fx-ver">
		<scroll-view scroll-y="true" class="scroll-h">
			<home v-if="tabIndex === 0"></home>
      <app v-else-if="tabIndex === 1"></app>
      <mine v-else-if="tabIndex === 2"></mine>
		</scroll-view>
		<footer-com></footer-com>
	</view>
</template>

<script>
import { store } from './store/index.js'
import FooterCom from './component/footer-com.vue'
import apiFun from './store/apiFun.js'
import home from './home.vue'
import app from './app.vue'
import mine from './mine.vue'
export default {
	data() {
		return {
		}
	},
  computed: {
    tabIndex: () => store.tabIndex,
		userInfo: () => store.userInfo
  },
	mounted () {
		if (this.userInfo.typeCode == 16) {
			apiFun.getChildList()
		}
		apiFun.getMenuList()
	},
  components: {
    FooterCom,
    home,
    app,
    mine
  },
	methods: {
  }
}
</script>

<style lang="scss" scoped>
  .scroll-h {
  	height: calc(100vh - 100rpx);
  }
</style>