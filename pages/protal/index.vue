<template>
	<view class="qui-page">
		<scroll-view scroll-y="true" class="scroll-h">
			<home v-if="tabIndex === 0"></home>
      <app v-else-if="tabIndex === 1"></app>
      <message v-else-if="tabIndex === 2"></message>
      <mine v-else-if="tabIndex === 3"></mine>
		</scroll-view>
		<footer-com></footer-com>
	</view>
</template>

<script>
import { store } from './store/index.js'
import FooterCom from './component/footer-com.vue'
import home from './home.vue'
import app from './app.vue'
import message from './message.vue'
import mine from './mine.vue'
export default {
	data() {
		return {
		}
	},
  computed: {
    tabIndex: () => store.tabIndex
  },
  components: {
    FooterCom,
    home,
    app,
    message,
    mine
  },
	methods: {
  }
}
</script>

<style lang="scss">
  .scroll-h {
  	height: calc(100vh - 100rpx);
  }
</style>
