<template>
	<view class="no-data qui-fx-ac-jc">
		<img :src="noData" alt="" />
    <text class="msg">{{ msg }}</text>
	</view>
</template>

<script>
  import noData from '@s/img/no-data.png'
	export default {
    props: {
      msg: {
        type: String,
        default: '暂无数据~~'
      }
    },
		data() {
			return {
        noData
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
  .no-data {
    padding: 40rpx 0;
    background-color: #fff;
    img {
      width: 280rpx;
      height: 220rpx;
      display: block;
    }
    .msg {
      color: #999;
      font-size: 24rpx;
      padding-top: 10rpx;
    }
  }
</style>
