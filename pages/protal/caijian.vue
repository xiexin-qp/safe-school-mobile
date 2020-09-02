<template>
	<view class="map u-page u-fx-ver">
		<view class="header u-font-1 u-fx-ac-jc u-type-primary-bg u-type-white u-tx-c">地图</view>
		<view class="u-padd-30">当前经纬度：纬度{{currentLocation.latitude}}, 经度：{{currentLocation.longitude}}</view>
		<view id="container" class="u-fx-f1"></view>
	</view>
</template>

<script>
	import wx from 'weixin-js-sdk';
	export default {
		data () {
			return {
				currentLocation: {},
				locationList: []
			}
		},
		mounted () {
			this.getLocation(true, (data) => {
				this.map = new qq.maps.Map(document.getElementById("container"), {
						center: new qq.maps.LatLng(data.latitude, data.longitude),      // 地图的中心地理坐标。
						zoom: 16
				});
				this.timer = setInterval(() => {
					this.getLocation()
				}, 5000)
			})
		},
		methods: {
			showMap () {
				const arr = this.locationList.map(item => {
					return new qq.maps.LatLng(item.latitude, item.longitude)
				})
				var polyline = new qq.maps.Polyline({
				    path: arr,
				    strokeColor: '#3385ff',
				    strokeWeight: 4,
				    map: this.map
				});
			},
			getLocation (tag, callback) {
				wx.getLocation({
				  type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				  success: (res) => {
						if (res) {
							const location = {
								latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
								longitude: res.longitude
							}
							if (tag) {
								this.currentLocation = location
								callback(location)
							} else {
								this.locationList.push(location)
								this.showMap()
							}
						}
				  }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map {
		.header {
			height: 80rpx;
		}
		.scroll-h {
			height: calc(100vh - 80rpx);
		}
	}
</style>
