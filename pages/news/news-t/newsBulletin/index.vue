<template>
	<view class="home qui-page qui-fx qui-fx-ver">
		<view id="title" class="head"><uni-search-bar @confirm="search" @input="input"></uni-search-bar></view>
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="content">
				<view class="record-box">
					<view class="leave-box" v-for="list in 20" :key="list.id">
						<view class="work-box qui-fx-jsb">
							<text class="content_" @click="goDetail()">
								我学召开第三次会议会议会议会议
								<view class="time_">我 发布于2020年1月3日 16:23</view>
							</text>
							<text class="img_"><img :src="approveImg" /></text>
							<view class="operation_" @click="actionsheet">...</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="foot"><view class="add foot" @click="add">+</view></view>
	</view>
</template>
<script>
import eventBus from '@u/eventBus.js';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
	components: {},
	data() {
		return {
			newsList: [
			],
			approveImg: ''
		};
	},
	components: {
		uniSearchBar
	},
	filters: {},
	mounted() {
	},
	methods: {
		actionsheet() {
			const arr = ['编辑', '删除'];
			this.$tools.actionsheet(['编辑', '删除'], index => {
				console.log(arr[index]);
				if (index == 0) {
					uni.navigateTo({
						url: './addnews'
					});
				} else if  (index == 1) {
					this.$tools.confirm('确定删除吗', () => {});
				}
			});
		},
		goDetail() {
			this.$tools.navTo({
			  url: './detail',
			title: '查看列表'
			});
		},
		add() {
			this.$tools.navTo({
			url: './addnews',
		   title: '添加新闻'
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 250rpx);
}
.work-box {
	background-color: #fff;
	border-radius: 8rpx;
	margin: 20rpx;
	padding: 50rpx;
	border-bottom: 1rpx solid #cfd0d1;
	.work-line {
		border-left: 2rpx 7b92f5 dashed;
	}
	.img_ img {
		width: 60rpx;
		width: 60rpx;
		margin-right: 10px;
	}
	.content_ {
		font-size: 13px;
		color: #333333;
	}
	.time_ {
		margin-top: 10px;
		font-size: 11px;
		color: #999999;
	}
	.operation_ {
		font-weight: 400;
		font-style: normal;
		font-size: 25px;
		color: #555555;
	}
}
.head {
	height: 100rpx;
}
.foot {
	height: 150rpx;
	.add {
		position: absolute;
		bottom: 40rpx;
		left: calc(50% - 40rpx);
		z-index: 1;
		width: 100rpx;
		height: 100rpx;
		line-height: 80rpx;
		border-radius: 100%;
		background: #0079ff;
		color: #fff;
		font-size: 100rpx;
		text-align: center;
	}
}
</style>
