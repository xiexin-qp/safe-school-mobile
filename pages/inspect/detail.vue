<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-h ">
      <view class="u-type-white-bg">
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view class="tip">值班员：</view>
          <view class="u-fx-f1 u-fx-je" @click="add('1')">{{ formData.watch }}</view>
        </view>
        <view class="u-fx-jsb u-bd-b u-padd">
          <view class="tip">值班员电话：</view>
          <view class="u-fx-f1 u-fx-je">
            <input type="number" class="u-font-01 u-tx-r u-padd-r10" v-model="formData.watchPhone" />
          </view>
        </view>
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view class="tip">带班领导：</view>
          <view class="u-fx-f1 u-fx-je" @click="add('2')">{{ formData.leader }}</view>
        </view>
        <view class="u-fx-jsb u-bd-b u-padd">
          <view class="tip">带班领导电话：</view>
          <view class="u-fx-f1 u-fx-je">
            <input type="number" class="u-font-01 u-tx-r u-padd-r10" v-model="formData.leaderPhone" />
          </view>
        </view>
      </view>
			<view class="u-type-white-bg u-mar-t20">
			  <view class="u-fx-ver u-bd-b u-padd">
          <view class="tip">值班轨迹：</view>
          <view class="u-fx-f1 u-fx-je">
            <view class="u-fx-f1" id="container"> </view>
          </view>
        </view>
			</view>
      <view class="u-type-white-bg u-mar-t20">
        <view class="u-fx-ac u-bd-b u-padd-20">
          <view>巡查状态：</view>
          <view class="u-fx-f1 u-fx-je u-tx-r">
            <view>{{formData.patrolStatus === '1' ? '正常' : '异常'}}</view>
          </view>
        </view>
				<view class="u-fx-ver u-bd-b u-padd">
          <view class="u-mar-t10">内容上报：</view>
          <view>
             <textarea class="item-text-area u-font-01" v-model="formData.reportContent" />
          </view>
				</view>
      </view>
		</scroll-view>
  </view>
</template>

<script>
  import { store, actions } from './store/index.js'
  export default {
    data () {
      return {
        formData: {}
      }
    },
    mounted () {
      this.inspectId = this.$tools.getQuery().get('id') 
			this.inspectDetailGet()
    },
    methods: {
       async inspectDetailGet () {
        const res =await actions.getInspectDetail(this.inspectId)
        this.formData = res.data
        this.map = new qq.maps.Map(document.getElementById("container"), {
          center: new qq.maps.LatLng(),
          zoom: 16
        })
				const arr = res.data.track.map(item => {
					return new qq.maps.LatLng(item.latitude, item.longitude)
				})
				var polyline = new qq.maps.Polyline({
					path: arr,
					strokeColor: '#3385ff',
					strokeWeight: 4,
					map: this.map
				});
      }
    }
  }
</script>

<style lang="scss" scoped>
.scroll-h {
  height: calc(100vh - 10rpx)
}
</style>
