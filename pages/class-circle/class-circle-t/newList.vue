<template>
	<view class="u-page">
		<scroll-view scroll-y="true" class="scroll-h" @scrolltolower="loadMore">
			<no-data v-if="false" msg="暂无数据"></no-data>
			<view class="list u-padd-20 u-mar-20 u-bg-fff u-border-radius" v-for="(item, i) in 10" :key="item" @tap="goDetail(i)">
				<view class="u-fx-jsb u-fx-ac">
					<view class="u-mar-r20 u-fx">
						<view class="headimg u-mar-r20">
							<image class="img u-border-radius" src="http://canpointtest.com/mobile-img/person-auto.png"></image>
						</view>
						<view class="content u-line1">
							<view class="u-type-primary-dark u-font-1">林田田</view>
							<view class="u-font-01 u-te">今天我去帮助爷爷奶奶家吃饭了，吃完饭后我帮奶奶洗碗今天我去帮助爷爷奶奶家吃饭了~~</view>
							<view class="u-tips-color u-font-02">
								收到3条消息
								<text class="u-bg-color u-font-03 u-mar-10 u-padd-l10 u-padd-r10 u-border-radius">
									1条消息已删除
								</text>
							</view>
							<view class="u-tips-color u-font-02">7月21日 15：00</view>
						</view>
					</view>
					<view>
						<image
							mode="widthFix"
							class="tumb-img"
							src="http://canpointtest.com/mobile-img/person-auto.png"
						></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import eventBus from '@u/eventBus';
import noData from '@/components/no-data/no-data.vue';
import { store, actions } from './store/index.js';
export default {
	name: 'newList',
	components: {
		noData
	},
	data() {
		return {
			pageList: {
				page: 1,
				size: 20
			},
			morePage: false
		};
	},
	watch: {},
	async created() {
	},
	mounted() {},
	methods: {
		async showList(tag = false) {
			if (tag) {
				this.pageList.page += 1;
			} else {
				this.pageList.page = 1;
			}
			const req = {
				...this.pageList,
				dateTime: this.dateTime,
				schoolCode: store.userInfo.schoolCode,
				classCode: this.classCode,
				schoolYearId: this.schoolYearId
			};
			console.log(req);
			const res = await actions.getClassMotto(req);
			if (!res.data) {
				return;
			}
			if (tag) {
				this.dataList = this.dataList.concat(res.data.list);
			} else {
				this.dataList = res.data.list;
			}
			this.morePage = res.data.hasNextPage;
		},
		loadMore() {
			if (!this.morePage) {
				this.$tools.toast('数据已加载完毕');
				return;
			}
			this.showList(true);
		},
		goDetail(id) {
			this.$tools.navTo({
				url: `./detail?id=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh);
}
.headimg {
				width: 80rpx;
				height: 80rpx;
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.content{
				width: calc(100% - 100rpx);
			}
.tumb-img{
	width: 160rpx;
	height: 160rpx;
}
</style>
