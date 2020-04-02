<template>
	<view class="home qui-page qui-fx qui-fx-ver">
		<view id="title" class="head"><uni-search-bar @confirm="search" @input="input"></uni-search-bar></view>
		<scroll-view scroll-y="true" class="scroll-h">
			<view class="content">
				<view class="record-box">
					<no-data msg="暂无数据~" v-if="newsList.length === 0"></no-data>
					<view class="leave-box" v-for="list in newsList" :key="list.id">
						<view class="work-box qui-fx-jsb">
							<text class="content_" @click="goDetail()">
								{{ list.text }}
								<view class="time_">{{ list.time }}</view>
							</text>
							<text class="img_"><img :src="list.approveImg" /></text>
							<view class="operation_" @click="actionsheet">...</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="foot"><button type="primary" size="mini" @click="addNews()">+</button></view>
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
				{
					id: 0,
					text: '我学召开第三次会议会议会议会议',
					time: '我 发布于2020年1月3日 16:23',
					approveImg: ''
				},
				{
					id: 0,
					text: '我学召开第三次会议会议会议会议',
					time: '我 发布于2020年1月3日 16:23',
					approveImg: ''
				},
				{
					id: 0,
					text: '我学召开第三次会议会议会议会议',
					time: '我 发布于2020年1月3日 16:23',
					approveImg: ''
				},
				{
					id: 0,
					text: '我学召开第三次会议会议会议会议',
					time: '我 发布于2020年1月3日 16:23',
					approveImg: ''
				}
			],

			approveImg: ''
		};
	},
	components: {
		uniSearchBar
	},
	filters: {},
	onLoad(options) {
		console.log(options);
	},
	onPullDownRefresh() {
		this.showList();
	},
	mounted() {
		this.showList();
		eventBus.$on('change', () => {
			this.title = '新标题';
		});
	},
	methods: {
		actionsheet() {
			const arr = ['编辑', '删除'];
			this.$tools.actionsheet(['编辑', '删除'], index => {
				console.log(arr[index]);
				if (arr[index] == '编辑') {
					uni.navigateTo({
						url: './addnews'
					});
				} else if (arr[index] == '删除') {
					this.$tools.confirm('确定删除吗', () => {});
				}
			});
		},
		goDetail() {
			uni.navigateTo({
				url: './detail'
			});
		},
		addNews() {
			uni.navigateTo({
				url: './addnews'
			});
		},
		async showList(tag = false) {
			const res = await actions.getIndex();
			if (tag) {
				this.dataList = this.dataList.concat(res.data);
			} else {
				this.dataList = res.data;
				uni.stopPullDownRefresh();
			}
		},
		chooseRole(e) {
			this.currentRole = e.target.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-h {
	height: calc(100vh - 200rpx);
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
.head{
	height: 100rpx;
}
.foot {
	height: 100rpx;
	text-align: center;
	button {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 15px;
		font-weight: 700;
	}
}
</style>
