<template>
	<scroll-view scroll-y="true" class="scroll-h">
		<view class="content">
			<view class="title">{{ newsList.newsTitle }}</view>
			<text class="Pub">发布人：{{ newsList.Publisher }}</text>
			<text class="rel">发布时间：{{ newsList.releaseTime }}</text>
			<view class="newsImg"><image src="newsList.newsImg"></image></view>
			<view class="newsText">{{ newsList.newsText }}</view>
		</view>
	</scroll-view>
</template>

<script>
import eventBus from '@u/eventBus.js';
export default {
	components: {},
	data() {
		return {
			newsList: {
				newsTitle: '新闻标题',
				Publisher: '张三',
				releaseTime: '2020年10月3号 17:56',
				newsImg: '',
				newsText:
					'学工作做实做细做好，真正实现“停课不停教、停课不停学”、“教学工作做实做细做好，真正实现“停课不停教、停课不停学”、“教学质量有保障”的明确要求。全校干部和教师闻令而动，积极响应。学工作做实做细做好，真正实现“停课不停教、停课不停学”、“教学质量有保障”的明确要求。全校干部和教师闻令而动，积极响应。学工作做实做细做好，真正实现“停课不停教、停课不停学”、“教学质量有保障”的明确要求。全校干部和教师闻令而动，积极响应。学质量有保障”的明确要求。全校干部和教师闻令而动，积极响应。'
			}
		};
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
.scroll-h {
	height: 100vh;
}
.content {
	padding: 20rpx 20rpx;
	background: #fff;
	view {
		padding: 10px 20rpx;
	}
	text {
		padding: 20rpx;
	}
	.title {
		font-weight: 700;
		font-style: normal;
		font-size: 16px;
	}
	.Pub {
		color: #999999;
		font-size: 13px;
	}
	.rel {
		color: #999999;
		font-size: 13px;
	}
	.newsImg {
		width: 342px;
		height: 205px;
	}
	.newsText {
		color: #333333;
		font-size: 13px;
		font-weight: 400;
	}
}
</style>
