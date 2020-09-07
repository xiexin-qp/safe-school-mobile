<template>
	<view class="u-page">
		<no-data v-if="false" msg="暂无数据"></no-data>
		<view v-else class="">
			<view class="wrap u-padd-20"><u-swiper height="400" :list="list" @click="previewImage"></u-swiper></view>
			<video v-if="false" class="uploade-video u-padd-20" src="" controls enable-play-gesture></video>
			<view class="u-mar-20 u-mar-t10">
				<u-icon class="u-font-3" name="calendar" color="#2979ff"></u-icon>
				<text class="mar-l20 u-font-1 u-bold">学校简介：</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-h">
				<view class="u-auto">
					<view class="u-padd-l20 u-padd-r20">
						<text class="content">
							十一火车票今日开抢 十一火车票开抢，又到了拼手速的时候！
							依照规定，火车票互联网和电话订票提前30天发售，车站售票窗口、代售点提前28天发售，因此，9月2日起可抢10月1日当天的车票，窗口、代售点的开售时间为9月4日。
							通常，假期最后2天为返程高峰，返程票方面， 9月8日、9日分别可抢10月7日、8日的车票。 不过，需要提醒的是，不同的火车站火车票起售时间并不相同。
							以北京为例：北京西站上午8点起售，北京站上午10点起售，北京南站中午12点30分起售。旅客需要提前了解相关信息，做好抢票准备。 十一火车票今日开抢
							十一火车票开抢，又到了拼手速的时候！
							依照规定，火车票互联网和电话订票提前30天发售，车站售票窗口、代售点提前28天发售，因此，9月2日起可抢10月1日当天的车票，窗口、代售点的开售时间为9月4日。
							通常，假期最后2天为返程高峰，返程票方面， 9月8日、9日分别可抢10月7日、8日的车票。 不过，需要提醒的是，不同的火车站火车票起售时间并不相同。
							以北京为例：北京西站上午8点起售，北京站上午10点起售，北京南站中午12点30分起售。旅客需要提前了解相关信息，做好抢票准备。 十一火车票今日开抢
							十一火车票开抢，又到了拼手速的时候！
							依照规定，火车票互联网和电话订票提前30天发售，车站售票窗口、代售点提前28天发售，因此，9月2日起可抢10月1日当天的车票，窗口、代售点的开售时间为9月4日。
							通常，假期最后2天为返程高峰，返程票方面， 9月8日、9日分别可抢10月7日、8日的车票。 不过，需要提醒的是，不同的火车站火车票起售时间并不相同。
							以北京为例：北京西站上午8点起售，北京站上午10点起售，北京南站中午12点30分起售。旅客需要提前了解相关信息，做好抢票准备。 十一火车票今日开抢
							十一火车票开抢，又到了拼手速的时候！
							依照规定，火车票互联网和电话订票提前30天发售，车站售票窗口、代售点提前28天发售，因此，9月2日起可抢10月1日当天的车票，窗口、代售点的开售时间为9月4日。
							通常，假期最后2天为返程高峰，返程票方面， 9月8日、9日分别可抢10月7日、8日的车票。 不过，需要提醒的是，不同的火车站火车票起售时间并不相同。
							以北京为例：北京西站上午8点起售，北京站上午10点起售，北京南站中午12点30分起售。旅客需要提前了解相关信息，做好抢票准备。
						</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from './store/index.js';
export default {
	name: 'school-intro',
	components: {
		noData
	},
	data() {
		return {
			dataInfo: {},
			list: [
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
				}
			]
		};
	},
	async created() {},
	methods: {
		previewImage(index) {
			uni.previewImage({
				current: index,
				urls: this.list.map(el => {
					return el.image;
				})
			});
		},
		async showList() {
			const req = {
				schoolCode: store.userInfo.schoolCode
			};
			console.log(req);
			const res = await actions.getMomentList(req);
			this.dataInfo = res.data;
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 540rpx);
}
.uploade-video {
	display: block;
	max-width: 100%;
	max-height: 400rpx;
}
</style>
